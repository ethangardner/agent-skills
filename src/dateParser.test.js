import test from 'node:test';
import assert from 'node:assert';
import { parseDate, isLeapYear, getDaysInMonth } from './dateParser.js';

test('isLeapYear helper', () => {
  assert.strictEqual(isLeapYear(2024), true, '2024 is a leap year');
  assert.strictEqual(isLeapYear(2026), false, '2026 is not a leap year');
  assert.strictEqual(isLeapYear(1900), false, '1900 is not a leap year (century not div by 400)');
  assert.strictEqual(isLeapYear(2000), true, '2000 is a leap year (century div by 400)');
});

test('getDaysInMonth helper', () => {
  assert.strictEqual(getDaysInMonth(2026, 1), 31, 'January 2026 has 31 days');
  assert.strictEqual(getDaysInMonth(2026, 2), 28, 'February 2026 (non-leap) has 28 days');
  assert.strictEqual(getDaysInMonth(2024, 2), 29, 'February 2024 (leap) has 29 days');
  assert.strictEqual(getDaysInMonth(2026, 4), 30, 'April 2026 has 30 days');
});

test('Equivalence Partitioning: Valid ISO 8601 & YYYY-MM-DD formats', () => {
  const d1 = parseDate('2026-08-15');
  assert.strictEqual(d1.getUTCFullYear(), 2026);
  assert.strictEqual(d1.getUTCMonth(), 7); // August is 7
  assert.strictEqual(d1.getUTCDate(), 15);

  const d2 = parseDate('2026-08-15T19:54:00Z');
  assert.strictEqual(d2.getUTCFullYear(), 2026);
  assert.strictEqual(d2.getUTCHours(), 19);
  assert.strictEqual(d2.getUTCMinutes(), 54);
});

test('Equivalence Partitioning: Valid Delimited formats (US and EU)', () => {
  // US format default for ambiguous dates
  const usDate = parseDate('08/15/2026');
  assert.strictEqual(usDate.getUTCFullYear(), 2026);
  assert.strictEqual(usDate.getUTCMonth(), 7);
  assert.strictEqual(usDate.getUTCDate(), 15);

  // EU format with explicit option
  const euDate = parseDate('15/08/2026', { format: 'EU' });
  assert.strictEqual(euDate.getUTCFullYear(), 2026);
  assert.strictEqual(euDate.getUTCMonth(), 7);
  assert.strictEqual(euDate.getUTCDate(), 15);

  // Auto-disambiguation when first part > 12 (must be EU)
  const autoEu = parseDate('25/05/2026');
  assert.strictEqual(autoEu.getUTCMonth(), 4); // May
  assert.strictEqual(autoEu.getUTCDate(), 25);
});

test('Boundary Value Analysis: Leap Year and Month Ends', () => {
  // Valid leap day in 2024
  const leapDay = parseDate('2024-02-29');
  assert.strictEqual(leapDay.getUTCFullYear(), 2024);
  assert.strictEqual(leapDay.getUTCMonth(), 1);
  assert.strictEqual(leapDay.getUTCDate(), 29);

  // Invalid leap day in 2026 (non-leap year)
  assert.throws(() => {
    parseDate('2026-02-29');
  }, RangeError, 'Should throw RangeError for Feb 29 in non-leap year');

  // Month end boundary: April 30 vs April 31
  const april30 = parseDate('2026-04-30');
  assert.strictEqual(april30.getUTCDate(), 30);

  assert.throws(() => {
    parseDate('2026-04-31');
  }, RangeError, 'Should throw RangeError for April 31');
});

test('Boundary Value Analysis: Time ranges (hours, minutes, seconds)', () => {
  const startOfDay = parseDate('2026-01-01T00:00:00Z');
  assert.strictEqual(startOfDay.getUTCHours(), 0);

  const endOfDay = parseDate('2026-01-01T23:59:59Z');
  assert.strictEqual(endOfDay.getUTCHours(), 23);
  assert.strictEqual(endOfDay.getUTCMinutes(), 59);
  assert.strictEqual(endOfDay.getUTCSeconds(), 59);

  assert.throws(() => {
    parseDate('2026-01-01T24:00:00Z');
  }, RangeError, 'Hour 24 is out of range');

  assert.throws(() => {
    parseDate('2026-01-01T12:60:00Z');
  }, RangeError, 'Minute 60 is out of range');
});

test('Error Guessing: Invalid months, days, years, and malformed strings', () => {
  assert.throws(() => parseDate('2026-00-15'), RangeError, 'Month 0 is invalid');
  assert.throws(() => parseDate('2026-13-15'), RangeError, 'Month 13 is invalid');
  assert.throws(() => parseDate('2026-08-00'), RangeError, 'Day 0 is invalid');
  assert.throws(() => parseDate('2026-08-32'), RangeError, 'Day 32 is invalid');
  assert.throws(() => parseDate('0000-01-01'), RangeError, 'Year 0 is invalid');
  assert.throws(() => parseDate('not-a-date'), RangeError, 'Garbage string throws error');
  assert.throws(() => parseDate('   '), RangeError, 'Whitespace string throws error');
});

test('Input Type handling: Date objects, timestamps, invalid types', () => {
  const now = new Date();
  const parsedDate = parseDate(now);
  assert.strictEqual(parsedDate.getTime(), now.getTime());

  const timestamp = Date.now();
  const parsedTimestamp = parseDate(timestamp);
  assert.strictEqual(parsedTimestamp.getTime(), timestamp);

  assert.throws(() => parseDate(new Date(NaN)), RangeError, 'Invalid Date object throws error');
  assert.throws(() => parseDate(1234567890e12 + 1e18), RangeError, 'Invalid timestamp throws error');
  assert.throws(() => parseDate(null), TypeError, 'Null input throws TypeError');
  assert.throws(() => parseDate({}), TypeError, 'Object input throws TypeError');
  assert.throws(() => parseDate([]), TypeError, 'Array input throws TypeError');
  assert.throws(() => parseDate(true), TypeError, 'Boolean input throws TypeError');
});
