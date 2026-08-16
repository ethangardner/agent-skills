/**
 * Robust date parsing utility with strict calendar validation,
 * leap year checking, and support for standard formats (ISO 8601, YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY).
 */

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function getDaysInMonth(year, month) {
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month - 1];
}

/**
 * Parses a date input into a JavaScript Date object.
 * Validates strict calendar ranges and formats.
 * 
 * Supported formats:
 * - ISO 8601 / YYYY-MM-DD (e.g., "2026-08-15", "2026-08-15T19:54:00Z")
 * - US format (MM/DD/YYYY or MM-DD-YYYY)
 * - EU format (DD/MM/YYYY or DD-MM-YYYY) - when specified or disambiguated
 * 
 * @param {string | Date | number} input 
 * @param {object} options 
 * @returns {Date}
 */
export function parseDate(input, options = { format: 'auto' }) {
  if (input instanceof Date) {
    if (isNaN(input.getTime())) {
      throw new RangeError('Invalid Date object');
    }
    return new Date(input.getTime());
  }

  if (typeof input === 'number') {
    const d = new Date(input);
    if (isNaN(d.getTime())) {
      throw new RangeError('Invalid timestamp');
    }
    return d;
  }

  if (typeof input !== 'string') {
    throw new TypeError(`Expected string, Date, or number input, received ${typeof input}`);
  }

  const trimmed = input.trim();
  if (!trimmed) {
    throw new RangeError('Empty date string');
  }

  // 1. Check ISO / YYYY-MM-DD format: YYYY-MM-DD[ T...]
  const isoRegex = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|[+-]\d{2}:?\d{2})?)?$/;
  const isoMatch = trimmed.match(isoRegex);

  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10);
    const day = parseInt(isoMatch[3], 10);
    const hour = isoMatch[4] ? parseInt(isoMatch[4], 10) : 0;
    const minute = isoMatch[5] ? parseInt(isoMatch[5], 10) : 0;
    const second = isoMatch[6] ? parseInt(isoMatch[6], 10) : 0;
    const ms = isoMatch[7] ? parseInt(isoMatch[7].substring(0, 3).padEnd(3, '0'), 10) : 0;

    validateCalendarDate(year, month, day, hour, minute, second);

    // Construct Date object
    let dateStr = `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
    if (isoMatch[4]) {
      dateStr += `T${isoMatch[4]}:${isoMatch[5]}:${isoMatch[6]}`;
      if (isoMatch[7]) dateStr += `.${isoMatch[7]}`;
      if (isoMatch[8]) dateStr += isoMatch[8];
      else dateStr += 'Z'; // default to UTC if time provided without offset
    } else {
      dateStr += 'T00:00:00Z';
    }

    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      throw new RangeError(`Invalid date: ${input}`);
    }
    return d;
  }

  // 2. Check slash or dash delimited formats: MM/DD/YYYY, DD/MM/YYYY, MM-DD-YYYY, DD-MM-YYYY
  const delimitedRegex = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/;
  const delimMatch = trimmed.match(delimitedRegex);

  if (delimMatch) {
    let p1 = parseInt(delimMatch[1], 10);
    let p2 = parseInt(delimMatch[2], 10);
    let year = parseInt(delimMatch[3], 10);

    if (year < 100) {
      year += year >= 50 ? 1900 : 2000;
    }

    let month, day;
    const formatPreference = options.format || 'auto';

    if (formatPreference === 'EU') {
      day = p1;
      month = p2;
    } else if (formatPreference === 'US') {
      month = p1;
      day = p2;
    } else {
      // Auto: if p1 > 12, it must be day (EU style). If p2 > 12, it must be day (US style).
      // If both <= 12, default to US (MM/DD/YYYY) or EU based on convention, let's default to US or require clarification.
      if (p1 > 12 && p2 <= 12) {
        day = p1;
        month = p2;
      } else if (p2 > 12 && p1 <= 12) {
        month = p1;
        day = p2;
      } else {
        // Ambiguous (e.g. 03/04/2026). Default to US MM/DD/YYYY unless specified.
        month = p1;
        day = p2;
      }
    }

    validateCalendarDate(year, month, day, 0, 0, 0);

    const d = new Date(Date.UTC(year, month - 1, day));
    if (isNaN(d.getTime())) {
      throw new RangeError(`Invalid date: ${input}`);
    }
    return d;
  }

  // Fallback to native Date.parse with strict check
  const timestamp = Date.parse(trimmed);
  if (isNaN(timestamp)) {
    throw new RangeError(`Unable to parse date string: "${input}"`);
  }
  return new Date(timestamp);
}

function validateCalendarDate(year, month, day, hour, minute, second) {
  if (year < 1 || year > 9999) {
    throw new RangeError(`Year out of range: ${year}`);
  }
  if (month < 1 || month > 12) {
    throw new RangeError(`Month out of range: ${month}`);
  }
  const maxDays = getDaysInMonth(year, month);
  if (day < 1 || day > maxDays) {
    throw new RangeError(`Day ${day} out of range for year ${year} and month ${month} (max ${maxDays})`);
  }
  if (hour < 0 || hour > 23) {
    throw new RangeError(`Hour out of range: ${hour}`);
  }
  if (minute < 0 || minute > 59) {
    throw new RangeError(`Minute out of range: ${minute}`);
  }
  if (second < 0 || second > 59) {
    throw new RangeError(`Second out of range: ${second}`);
  }
}
