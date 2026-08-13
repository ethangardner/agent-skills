---
name: swebok-professional-practice
description: >-
  Apply the professional practice discipline from SWEBOK V4 Chapter 14 to
  ethical decisions, team dynamics, and technical communication. Use this
  whenever the work involves professional obligations, team or group psychology,
  or communication planning — e.g. "professional ethics", "software engineer
  ethics", "code of ethics", "team dynamics", "conflict resolution", "technical
  communication", "write a technical report", "stakeholder communication",
  "presentation skills", "team psychology", "cognitive bias in engineering",
  "intellectual property", "professional responsibility", "dealing with
  management", "handling disagreement", "communicating to non-technical
  stakeholders", "diversity in teams", "inclusive practices", "professional
  conduct", "peer feedback", "whistleblowing", "ACM code of ethics", "IEEE
  code of ethics", "leadership styles", "psychological safety", "cognitive
  diversity", "EDI in engineering". Trigger even when the user asks "how do I
  communicate this to stakeholders" or "how do I handle this team conflict" —
  the discipline of professional obligation, communication effectiveness, and
  group dynamics applies, not just interpersonal advice.
---

# Professional Practice

Software engineering professional practice spans three domains that are
inseparable in real projects: the ethical obligations engineers carry as
professionals, the group dynamics and psychology that determine what a team
actually delivers, and the communication skills that transfer technical
knowledge across people, roles, and organizations. Weakness in any one domain
undermines the other two regardless of technical skill.

Three ideas drive everything below:

1. **Professionalism is the obligation to serve the public interest over
   self-interest.** Software engineers make decisions that affect lives,
   livelihoods, and safety; the professional obligation is to the public and
   profession, not just the employer or client. Ethical conflicts are not edge
   cases — they are routine. The question is not whether an engineer will face
   them but whether they have a framework for recognizing and resolving them
   before making a decision that cannot be undone.

2. **Communication is the dominant activity in software engineering.** Engineers
   spend more time communicating than coding; defects in communication
   (ambiguous requirements, misunderstood interfaces, unshared assumptions) cause
   more project failures than defects in code. Technical skill without
   communication skill is a career ceiling and a project risk. Every technical
   artifact — a specification, a design document, a code review comment — is a
   communication act and should be evaluated as one.

3. **Group psychology determines what a team can deliver.** Individual
   capability sets the upper bound; group dynamics set the actual outcome.
   Psychological safety, cognitive diversity, and constructive conflict resolution
   are engineering infrastructure, not soft extras. A team where engineers cannot
   raise concerns without fear of reprisal will suppress the early signals that
   prevent failures.

## When NOT to over-apply this

For a straightforward technical task with no ethical tension, a single known
audience, and a stable team, the full professional practice assessment is
overhead. Apply the full discipline when ethical obligations are ambiguous,
when stakeholders have conflicting interests, or when team dynamics are visibly
affecting delivery.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Identify the professional context

Before acting, establish what obligations apply:

- Which ethics code governs? (ACM Code of Ethics, IEEE Code of Ethics, both,
  or a company or regulatory code?) Identify the specific principles that
  apply to this situation.
- What contractual, regulatory, or employment obligations exist, and where
  do they conflict with the ethics code or with each other?
- Who are the stakeholders — employer, client, users, the public, the
  profession — and what does each legitimately expect?
- Are there intellectual property considerations (ownership of code, use of
  third-party components, open-source license obligations)?

Ethical tensions are the norm in engineering projects. Surface them at the
start, not after a decision has been made and implemented.

### 2. Assess team and communication dynamics

- **Team composition** — what are the roles, skills, and gaps? Is cognitive
  diversity present (different backgrounds, mental models, disciplines), or is
  the team homogeneous in ways that create blind spots?
- **Communication patterns** — where does information flow freely and where
  does it stall? Are there communication gaps between roles (dev/ops, tech/
  business, team/management)?
- **Conflict risks** — what disagreements are latent or active? Distinguish
  productive task conflict (disagreement about approach, constructive) from
  relationship conflict (personal, destructive). Manage them differently.
- **Psychological safety** — can team members raise concerns, point out
  mistakes, or disagree with leads without fear of reprisal? If not, treat
  this as a project risk, not a personality problem.
- **Inclusion gaps** — are there team members who are structurally excluded
  from decisions, whose contributions go unacknowledged, or who face
  systemic barriers to participation? Inclusion is an engineering concern
  because excluded perspectives produce blind spots in requirements and design.

### 3. Plan communication artifacts

For each audience, determine what must be communicated, in what format, at
what frequency, and who owns it. Use a communication matrix:

| Artifact / Communication | Audience | Format | Frequency | Owner |

Communication planning covers:

- **Technical documentation** — specifications, design documents, API
  references: written for future developers and maintainers; precision and
  completeness are primary.
- **Stakeholder reports** — status updates, risk reports, change requests:
  written for non-technical or partially technical readers; clarity and
  actionability are primary.
- **Oral / presentation** — design reviews, demos, incident reports: audience
  adaptation and preparation determine effectiveness more than slide aesthetics.
- **Peer feedback** — code reviews, design critiques: be specific, address the
  work not the person, and distinguish blocking concerns from preferences.

Match format and depth to the audience's technical literacy and decision-making
needs. Oversimplifying insults; over-detailing buries.

### 4. Execute with professional conduct

- Apply the relevant ethics code when making decisions under uncertainty or
  competing obligations. When in doubt, favor the public interest and
  document the reasoning.
- Manage conflicts constructively: separate people from problems, focus on
  interests not positions, and keep task disagreements from becoming
  relationship conflicts.
- Document decisions and rationale at the time they are made, not
  retrospectively. Decisions made without recorded rationale will be
  re-litigated, second-guessed, or silently reversed by whoever encounters
  them later.
- Ensure all voices are heard in decisions that affect the team. Structural
  silence (some roles never questioned, some members never heard from) is a
  process defect.

### 5. Review and improve

After a significant communication event, decision, or project phase:

- Was the communication effective — did the audience understand and act
  correctly on what was communicated?
- Were team dynamics constructive — was conflict resolved rather than
  suppressed, were all relevant perspectives heard?
- Were professional obligations met — were ethical tensions identified and
  resolved with appropriate reasoning?
- What should change in the next cycle?

Record findings as process improvements, not individual blame. Retrospectives
are engineering activities; they should produce actionable changes to process,
not just sentiment.

## Output format

Unless the user asks for something else, use this structure.

```
# Professional Practice Assessment: <context>

## 1. Professional obligations
- Applicable ethics code / standards
- Stakeholder obligations (employer, client, public, profession)
- Identified ethical tensions and how they will be resolved
- Intellectual property considerations

## 2. Team dynamics assessment
- Team composition and roles
- Communication patterns and gaps
- Identified conflict risks (task vs. relationship)
- Psychological safety status
- Inclusion considerations

## 3. Communication plan
| Artifact / Communication | Audience | Format | Frequency | Owner |

## 4. Decisions and rationale log
| Decision | Stakeholders affected | Rationale | Ethical considerations |
```

## Reviewing professional practice (checklist mode)

When the task is to evaluate rather than author, run the workflow as a checklist:

1. Are professional obligations identified — which ethics code applies, which
   principles are at stake, and are any in tension with employer or client
   interests?
2. Are intellectual property obligations addressed — ownership of work, license
   compliance, use of third-party components?
3. Does a communication plan exist for all stakeholder groups — not just
   technical peers but management, users, and affected public?
4. Are communication artifacts matched to audience literacy — is technical
   content accessible to non-technical audiences without being inaccurate?
5. Are team dynamics risks surfaced — conflict risks, homogeneity blind spots,
   psychological safety gaps?
6. Are equity, diversity, and inclusion considered — are there structural
   barriers to participation or contribution that will produce blind spots?
7. Are decisions documented with rationale and ethical considerations at the
   time of making, not retrospectively?
8. Is there a retrospective or improvement cycle planned for communication
   and professional practice, not just technical deliverables?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Professional obligation** — a duty arising from membership in a profession
  and acceptance of its code of ethics, distinct from contractual or employment
  obligations. When they conflict, the professional obligation to the public
  generally takes precedence.
- **Code of ethics** — a formal statement of the values and duties that govern
  a profession's conduct. Key codes for software engineers: ACM Code of Ethics
  and Professional Conduct; IEEE Code of Ethics.
- **Intellectual property (IP)** — legal rights over creations of the mind,
  including software copyright, patents, and trade secrets. Engineers must
  understand what IP they create, who owns it, and what obligations attach to
  third-party IP they use.
- **Psychological safety** — a team climate in which members believe they will
  not be punished or humiliated for raising concerns, admitting mistakes, or
  challenging decisions. Its absence suppresses early warning signals.
- **Cognitive diversity** — variety in the mental models, problem-solving
  approaches, and knowledge bases present in a team. Increases the range of
  solutions considered and the completeness of risk identification.
- **Task conflict** — disagreement about work content, approach, or priorities.
  Managed constructively, it improves decisions. Left unmanaged, it degrades
  into relationship conflict.
- **Relationship conflict** — interpersonal friction and hostility. Always
  destructive to team performance; requires active intervention, not just
  tolerance.
- **Equity, diversity, and inclusion (EDI)** — equity: fair treatment accounting
  for different starting positions; diversity: presence of different
  backgrounds, identities, and perspectives; inclusion: active participation
  and belonging. All three are required; diversity without inclusion is
  performative.
- **Stakeholder** — any individual or group with a legitimate interest in the
  system or the engineering decisions that affect it, including employer,
  client, end users, affected public, and the profession.
- **Communication artifact** — any document, presentation, or report produced
  to transfer information to an audience. Quality is measured by whether the
  audience understood correctly and acted appropriately, not by effort invested.
