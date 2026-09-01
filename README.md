# agent-skills

A collection of agent skills for software engineering, based on SWEBOK V4 and other engineering disciplines.

## Skills

50 skills across six categories — see [CATALOG.md](CATALOG.md) for the full,
generated list: SWEBOK knowledge areas, Liberating Structures facilitation
techniques, Ethan's own workflow/practice skills (`eg-*`), and a handful of
standalone language/process/communication skills. Run `npm run catalog` to
regenerate it after adding, removing, or renaming a skill.

## Installation

### Using npx skills (recommended)

Installs to `~/.agents/skills` as the canonical location and wires up symlinks for each agent you select (e.g. `~/.claude/skills/<skill>` → `~/.agents/skills/<skill>`).

```bash
npx skills add ethangardner/agent-skills --global
```

You'll be prompted to choose which skills and which agents to install for.

To install all skills for Claude Code without prompts:

```bash
npx skills add ethangardner/agent-skills --global --skill '*' --agent claude-code --yes
```

### Using npm run link

Cloning the repo and running the link script symlinks all skills directly into `~/.claude/skills`:

```bash
git clone https://github.com/ethangardner/agent-skills.git
cd agent-skills
npm run link
```

### Using the Claude Code plugin marketplace

```
/plugin marketplace add ethangardner/agent-skills
/plugin install ethangardner-agent-skills@ethangardner-agent-skills
```
