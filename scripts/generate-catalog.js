#!/usr/bin/env node
// Generates CATALOG.md from the SKILL.md frontmatter of every skill in
// skills/*/SKILL.md. Run with `npm run catalog` after adding, removing, or
// renaming a skill. Do not edit CATALOG.md by hand — it will be overwritten.

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(REPO_ROOT, "skills");
const OUT_FILE = join(REPO_ROOT, "CATALOG.md");

// Category for a skill, keyed by its directory name. Prefix-based, matching
// the naming convention already used in skills/: eg-* are Ethan's own
// original workflow skills, swebok-* map 1:1 to SWEBOK V4 knowledge areas,
// liberating-structure-* map 1:1 to Liberating Structures techniques.
// Anything that doesn't match a prefix needs an explicit entry below.
const PREFIX_CATEGORIES = [
  ["eg-", "Workflow & Practice"],
  ["swebok-", "SWEBOK (Software Engineering Body of Knowledge)"],
  ["liberating-structure-", "Liberating Structures"],
];

const CATEGORY_OVERRIDES = {
  "kanban-method": "Project Management",
  "go-pointer-value-semantics": "Language-Specific",
  "dbt-dearman-give-fast": "Communication & Interpersonal",
};

// Order sections should appear in the output, regardless of discovery order.
const CATEGORY_ORDER = [
  "SWEBOK (Software Engineering Body of Knowledge)",
  "Liberating Structures",
  "Workflow & Practice",
  "Project Management",
  "Communication & Interpersonal",
  "Language-Specific",
];

function categorize(dirName) {
  if (CATEGORY_OVERRIDES[dirName]) return CATEGORY_OVERRIDES[dirName];
  for (const [prefix, category] of PREFIX_CATEGORIES) {
    if (dirName.startsWith(prefix)) return category;
  }
  throw new Error(
    `No category rule for skill "${dirName}" — add it to CATEGORY_OVERRIDES in scripts/generate-catalog.js`
  );
}

// Pulls `name:` and `description:` out of a SKILL.md's YAML frontmatter.
// Handles both plain inline values (`description: text`) and folded block
// scalars (`description: >-` followed by indented lines) — the only two
// styles used anywhere in this repo. Not a general YAML parser.
function parseFrontmatter(content, skillPath) {
  const lines = content.split("\n").map((line) => line.replace(/\r$/, ""));
  if (lines[0].trim() !== "---") {
    throw new Error(`${skillPath}: expected frontmatter starting with "---"`);
  }
  const end = lines.indexOf("---", 1);
  if (end === -1) {
    throw new Error(`${skillPath}: unterminated frontmatter`);
  }

  const fm = { name: null, description: null };
  const body = lines.slice(1, end);

  for (let i = 0; i < body.length; i++) {
    const line = body[i];
    const nameMatch = line.match(/^name:\s*(.*)$/);
    if (nameMatch) {
      fm.name = stripQuotes(nameMatch[1].trim());
      continue;
    }
    const descMatch = line.match(/^description:\s*(.*)$/);
    if (descMatch) {
      const rest = descMatch[1].trim();
      if (rest === "" || /^[>|][-+]?$/.test(rest)) {
        // Block scalar: consume subsequent indented (or blank) lines.
        const blockLines = [];
        let j = i + 1;
        while (j < body.length && (body[j].trim() === "" || /^\s/.test(body[j]))) {
          blockLines.push(body[j].trim());
          j++;
        }
        fm.description = blockLines.filter(Boolean).join(" ");
        i = j - 1;
      } else {
        fm.description = stripQuotes(rest);
      }
    }
  }

  if (!fm.name || !fm.description) {
    throw new Error(`${skillPath}: missing name or description in frontmatter`);
  }
  return fm;
}

function stripQuotes(s) {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

// First sentence of a description, used as the catalog's one-line summary.
// Splits on ". " followed by a capital letter (to dodge abbreviations like
// "e.g." — real sentence breaks in these descriptions are reliably followed
// by a capitalized word, per the "purpose sentence, then trigger sentence"
// convention used across this repo's SKILL.md files).
function firstSentence(description) {
  const match = description.match(/^(.*?\.)\s+[A-Z]/);
  let sentence = match ? match[1] : description;
  const MAX_LEN = 450;
  if (sentence.length > MAX_LEN) {
    sentence = sentence.slice(0, MAX_LEN).trimEnd() + "…";
  }
  return sentence;
}

// Escapes characters that would otherwise break a Markdown table cell.
function escapeCell(s) {
  return s.replace(/\|/g, "\\|");
}

function main() {
  const dirNames = readdirSync(SKILLS_DIR).filter((name) =>
    statSync(join(SKILLS_DIR, name)).isDirectory()
  );

  const categorized = new Map();
  for (const dirName of dirNames) {
    const skillMdPath = join(SKILLS_DIR, dirName, "SKILL.md");
    const content = readFileSync(skillMdPath, "utf8");
    const fm = parseFrontmatter(content, skillMdPath);
    const category = categorize(dirName);
    if (!categorized.has(category)) categorized.set(category, []);
    categorized.get(category).push({ dirName, summary: firstSentence(fm.description) });
  }

  const sections = [...categorized.keys()].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
  });

  const totalCount = dirNames.length;
  let out = "";
  out += "# Skill catalog\n\n";
  out += `Generated by \`npm run catalog\` from each skill's \`SKILL.md\` frontmatter — do not edit by hand.\n\n`;
  out += `${totalCount} skills across ${sections.length} categories.\n\n`;

  for (const category of sections) {
    const skills = categorized.get(category).sort((a, b) => a.dirName.localeCompare(b.dirName));
    out += `## ${category} (${skills.length})\n\n`;
    out += "| Skill | Description |\n";
    out += "| --- | --- |\n";
    for (const { dirName, summary } of skills) {
      out += `| [${escapeCell(dirName)}](skills/${dirName}/SKILL.md) | ${escapeCell(summary)} |\n`;
    }
    out += "\n";
  }

  writeFileSync(OUT_FILE, out);
  console.log(`Wrote ${OUT_FILE} (${totalCount} skills, ${sections.length} categories)`);
}

main();
