# Elicitation Techniques

Elicitation is the activity of discovering what stakeholders want and need —
not just asking questions, but also observing, prototyping, and analyzing
artifacts. No single technique is sufficient for a real system. Use a
combination, and document which technique produced each requirement so the
basis is traceable.

## Technique catalog

### Interviews

**When to use:** When you need to explore the problem space with individual
stakeholders, probe reasoning behind stated needs, or confirm ambiguous
requirements. Semi-structured interviews work best when you have a known
topic area but need flexibility to follow unexpected threads.

**Stakeholder fit:** Decision-makers, domain experts, primary users. Works
poorly with large groups — split into individual sessions or follow with a
workshop to surface conflicts.

**What it produces:** Qualitative descriptions of needs, goals, pain points,
constraints, and domain vocabulary. Raw material for requirements, not
requirements themselves.

**Limitations:** Stakeholders often cannot articulate latent needs ("I'll know
it when I see it"). Expressed needs may differ from real needs. Interviewer
bias can shape responses. Results are hard to aggregate across many
stakeholders.

---

### Surveys and questionnaires

**When to use:** When stakeholders are geographically distributed, when you
need to quantify priorities across a large population, or when you want to
validate patterns observed in interviews at scale.

**Stakeholder fit:** Large user populations, distributed teams, situations
where 1:1 time with each stakeholder is not feasible.

**What it produces:** Quantitative priority rankings, frequency distributions
of feature importance, and baseline data for quality targets (e.g., acceptable
response times).

**Limitations:** Cannot probe for reasoning behind answers. Question wording
strongly influences results. Low response rates may bias findings toward
engaged or vocal subgroups. Not suitable for exploratory elicitation where
the question space is unknown.

---

### Workshops / JAD (Joint Application Development)

**When to use:** When conflicting stakeholder interests need to be negotiated
in one session, when requirements are poorly scoped and need rapid definition,
or when sign-off from multiple parties must happen at once.

**Stakeholder fit:** Representatives from all major stakeholder groups. Works
best when decision-makers are present and empowered to commit.

**What it produces:** Agreed-upon scope, negotiated priorities, resolved
conflicts, and shared vocabulary. Decisions made in a workshop carry
cross-stakeholder buy-in that individual interviews cannot provide.

**Limitations:** Dominant voices can suppress minority concerns — a skilled
facilitator is essential. Scheduling across stakeholder groups is difficult.
Asynchronous preparation (pre-read materials, questionnaire results) is
required for effective use of synchronous time.

---

### Observation / ethnography

**When to use:** When domain knowledge is tacit (stakeholders know how to do
the work but cannot articulate it), when current work practices differ from
what stakeholders describe in interviews, or when you are automating or
replacing a manual process.

**Stakeholder fit:** Operational users performing their actual daily work.
Not useful for executives or decision-makers whose concerns are strategic.

**What it produces:** Documentation of actual workflows (as opposed to
idealized descriptions), identification of workarounds and informal practices,
and discovery of needs that users didn't think to mention because they seemed
obvious.

**Limitations:** Time-intensive. The observer effect — people change behavior
when watched — can distort findings. Works only when the problem domain
involves observable human activity.

---

### Prototyping

**When to use:** When requirements are poorly understood or highly uncertain,
when stakeholders cannot articulate needs in the abstract but can react to
something concrete, or when significant UI/UX requirements are involved.

**Stakeholder fit:** End users and customers. Particularly effective for UI
requirements. Less useful for back-end, infrastructure, or regulatory
requirements.

**What it produces:** Validated or rejected design hypotheses, surfaced
misunderstandings before they become committed requirements, and revised
understanding of scope and priority.

**Limitations:** Stakeholders may mistake the prototype for the final product
and resist throwing it away. Visual fidelity can distract from behavioral
requirements. Requires time to build even throwaway artifacts.

---

### Document analysis

**When to use:** When transitioning from a legacy system, when regulatory or
standards requirements must be incorporated, or when business rules are
embedded in existing manuals, contracts, or policy documents.

**Stakeholder fit:** Not stakeholder-facing — this is analyst work. Bring
findings back to stakeholders for validation.

**What it produces:** Identified regulatory and contractual constraints,
existing business rules and policies, legacy system behaviors that must be
preserved, and data models from existing systems.

**Limitations:** Documents may be outdated, incomplete, or describe the system
as it was intended rather than as it actually works. Missing the implicit
knowledge that doesn't appear in any document.

---

### Brainstorming

**When to use:** When the problem space is novel or poorly understood and the
goal is to generate a wide range of candidate requirements before filtering.
Best used early in the elicitation process, before stakeholder positions
harden.

**Stakeholder fit:** Small, diverse groups mixing domain experts, developers,
and user representatives. Works poorly with purely hierarchical groups where
junior members defer to senior ones.

**What it produces:** Broad lists of candidate requirements, identified
concerns that no one had thought to raise formally, and initial scope
boundaries.

**Limitations:** Quantity over quality — results require heavy triage.
Groupthink and anchoring bias can constrain the idea space. Not a substitute
for systematic elicitation of operational needs.

---

### Quality Function Deployment (QFD)

**When to use:** When you need to translate customer needs ("voice of the
customer") systematically into technical characteristics, and when you need
to prioritize competing requirements against each other using a structured
weighting scheme.

**Stakeholder fit:** Product management, engineering leads, customer
representatives. Requires stakeholders who can assign relative weights to
needs.

**What it produces:** The "House of Quality" matrix: customer needs mapped to
technical characteristics with correlation weights, competitive benchmarks,
and prioritized design targets. Quality requirements with quantified targets.

**Limitations:** Significant facilitation and time investment. The matrix can
become unwieldy for large requirement sets. Results are only as valid as the
weights stakeholders assign.

---

### Use case / user story workshops

**When to use:** When requirements should be captured as interactions between
users and the system, when the team uses agile methods and needs a backlog
format, or when you need to align developers and non-technical stakeholders on
system behavior.

**Stakeholder fit:** Product owners, end users, and development team members.
Works well in cross-functional settings.

**What it produces:** Use cases (actor + goal + scenario), user stories
(As a [role], I want [goal], so that [benefit]), and associated acceptance
criteria (Given/When/Then). Scenarios naturally expose exception flows and
edge cases.

**Limitations:** User stories and use cases describe _user interactions_ —
they do not naturally capture quality requirements, constraints, or
system-level (non-user-triggered) behaviors. These must be handled separately.
Acceptance criteria can be narrow; they do not substitute for a complete
analysis of non-functional requirements.

---

### Focus groups

**When to use:** When you need to understand the attitudes, opinions, and
priorities of a user segment, or when customer-facing product decisions
benefit from group discussion rather than individual survey responses.

**Stakeholder fit:** Representative end users or customers. Not suitable for
technical requirements or for stakeholders with conflicting interests — focus
groups require participants who share a role perspective.

**What it produces:** Qualitative insight into user priorities, language, and
mental models. Useful for validating candidate requirements against a user
segment before committing to them.

**Limitations:** Group dynamics can suppress minority views. Not a substitute
for observation of actual work. Findings are qualitative and require
interpretation; do not treat group consensus as validated requirements.

---

## Technique selection guide

Use this to pick a starting set for a given situation. Combine as needed.

| Situation                                              | Recommended technique(s)                            |
| ------------------------------------------------------ | --------------------------------------------------- |
| Stakeholders are geographically distributed            | Survey, then follow-up interviews                   |
| Domain knowledge is tacit / not easily articulated     | Observation / ethnography                           |
| Requirements are poorly understood or highly uncertain | Prototyping, then workshops to validate             |
| Conflicting stakeholder interests need negotiation     | Workshop / JAD with a skilled facilitator           |
| Transitioning from or replacing a legacy system        | Document analysis + interviews to validate accuracy |
| Novel domain with no prior system                      | Brainstorming, QFD, use case workshops              |
| Large user population, need quantified priorities      | Survey + QFD                                        |
| Regulatory or contractual requirements exist           | Document analysis (always), then workshop           |
| Agile team, need a backlog format                      | User story workshops + interviews for NFRs          |
| Need to validate draft requirements with real users    | Focus groups, prototyping                           |

The most common mistake is running only interviews and treating the output as
a complete specification. Interviews surface expressed needs; they miss tacit
knowledge, latent needs, and conflicts between stakeholder groups. Always
combine with at least one other technique.
