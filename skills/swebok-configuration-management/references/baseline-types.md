# Baseline Types Reference

A baseline is a formally reviewed and agreed specification of a configuration
item or set of configuration items, established at a specific point in time,
that can only be changed through formal change control. This reference is used
during SCM planning (workflow step 3) to select the appropriate baseline types,
define their triggering events and contents, and assign corresponding audit
obligations.

Use this table as a starting point. Adapt the types, triggering events, and
contents to the project's development model and contractual context — and
document any adaptation in the SCM plan.

---

## Quick-reference table

| Baseline      | Established at                                    | Core contents                                                                         | Audit type                  | Approved by                              |
| ------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- |
| Functional    | System requirements review complete               | System requirements spec, interface requirements spec                                 | FCA                         | Customer / systems engineering authority |
| Allocated     | Preliminary design / architecture review complete | Software requirements spec, interface design docs, architecture description           | FCA                         | Software engineering authority           |
| Developmental | Each significant development milestone            | Current CI versions, build scripts, test suites, interim documentation                | CM audit or informal review | Project SCM authority                    |
| Product       | System acceptance testing passed / delivery       | All source CIs, build procedures, test procedures, all documentation, interface specs | PCA                         | Customer / release authority             |

---

## Functional Baseline

**When it is established** — At the completion of a system-level requirements
review (sometimes called the System Requirements Review or SRR). This is the
first formal baseline; it captures what the system is required to do before
any design work begins.

**Typical contents**

- Approved system requirements specification (SRS at the system level)
- Interface requirements specification (IRS) — what external interfaces the
  system must satisfy
- Applicable standards and regulatory constraints that shape requirements

**Corresponding audit type** — Functional Configuration Audit (FCA). The FCA
verifies that the software as built meets the functional requirements captured
in this baseline. The FCA is often conducted at system test entry and again
at delivery.

**Approved by** — The customer or systems engineering authority: the party
responsible for system-level requirements. In contractual development, this is
typically the customer; in product development, it is the product owner or
systems engineering lead.

**Notes** — This baseline is rarely established in small-scale or agile
projects without external contractual obligations. Its equivalent in a product
context is a frozen product requirements document that gates the start of
architecture work.

---

## Allocated Baseline

**When it is established** — At the completion of preliminary design or a
software architecture review (sometimes called the Preliminary Design Review
or PDR). This baseline captures the allocation of system requirements to
software components and the agreed software architecture.

**Typical contents**

- Approved software requirements specification (SRS) — system requirements
  allocated to software
- Interface design documentation — how this system's interfaces will be
  realized
- Architecture description — the fundamental structural decisions
- Any applicable interface control documents (ICDs) with external systems

**Corresponding audit type** — Functional Configuration Audit (FCA), applied
at the software level: does the design meet the allocated requirements?

**Approved by** — The software engineering authority: the technical lead or
architect responsible for the software design. In contractual development,
the customer may also approve.

**Notes** — The allocated baseline is the reference against which design and
implementation changes are evaluated. A change that affects the allocated
baseline — for example, a requirement reallocation or an interface redesign —
requires formal change control against this baseline, not just an internal
design decision.

---

## Developmental Baseline(s)

**When it is established** — At each significant development milestone. There
is not a single developmental baseline; there are multiple, established as
development progresses. Typical triggering milestones include:

- Detailed design complete (Critical Design Review or equivalent)
- Unit integration entry
- System integration test entry
- System test entry (regression baseline)
- Release candidate

The project SCM plan defines which milestones trigger a developmental baseline
and what each one contains.

**Typical contents**

- Current versions of all relevant CIs at the milestone (source code, build
  scripts, configuration files, database schema, test suites)
- Build procedures sufficient to reproduce the build from the CI versions
- Test suites and test results for work completed to date
- Interim design and interface documentation current at the milestone

**Corresponding audit type** — Configuration management audit or informal
technical review. The CM audit verifies that CIs are correctly identified and
versioned; it does not need to be as formal as an FCA or PCA, but it must be
planned and recorded. A retrospective tag with no review is not a baseline.

**Approved by** — The project SCM authority: typically the SCM manager or
technical lead, without requiring customer approval.

**Notes** — Developmental baselines are the most commonly established baseline
type in practice. They provide the regression reference for the next phase of
work: if system test reveals a defect, the developmental baseline at test entry
is the controlled reference for the known-good build.

---

## Product Baseline

**When it is established** — Upon successful completion of system acceptance
testing and authorization to deliver. The product baseline is the definitive
controlled record of what was delivered.

**Typical contents**

- All source code CIs at the delivered versions
- All build scripts and build procedures required to reproduce the delivered
  build from source
- Test procedures and acceptance test results
- User documentation (installation guide, user manual, operations guide)
- Maintenance documentation (design documentation, interface specifications,
  known issues)
- Interface specifications for all external interfaces
- Third-party dependency manifest with version pins

**Corresponding audit type** — Physical Configuration Audit (PCA). The PCA
verifies that all expected CIs are present in the baseline, correctly
identified, and consistent with each other. It is a completeness check: does
the baseline contain everything needed to reproduce, maintain, and support the
delivered product? The FCA (functional check) should have already been passed
before the PCA is conducted.

**Approved by** — The customer, product owner, or release authority — the
party responsible for accepting the delivered product. In some contexts, a
configuration control board formally certifies the product baseline.

**Notes** — The product baseline is the master reference for all subsequent
maintenance and enhancement work. Changes to a delivered product are change
requests against the product baseline, tracked through the full change control
process. Without a certified product baseline, maintenance teams cannot
reliably identify what they are changing or whether a change introduces
regression.

---

## Modern adaptations (agile and CI/CD contexts)

In agile or continuous delivery contexts, the formal review events that trigger
baselines occur more frequently and are often automated in the pipeline. The
key principle — that baselines are intentional commitments with corresponding
audit obligations, not merely tagged commits — still applies. The adaptation
is in how the commitment is expressed, not whether it exists.

**Functional and allocated baselines** — In an agile program, these correspond
to the outcome of a product vision/roadmap freeze and an architecture runway
decision, respectively. They may be less formal, but the decision should be
recorded.

**Developmental baselines** — Map directly to tagged sprint releases or
pipeline-promoted artifacts (e.g., a container image promoted from staging to
production). In a CI/CD pipeline, the developmental baseline is the artifact
that passed the quality gate at a given stage. The pipeline must record which
source CI versions produced the artifact; this is the automated equivalent of
the developmental baseline contents.

**Product baseline** — Maps to a release artifact: a versioned container image,
an installable package, a signed binary. The PCA equivalent is the release
verification gate — does the release artifact contain all required components,
at the correct versions, with complete documentation? In automated pipelines
this is a release checklist or a manifest verification step.

The question to ask in any model: "If I need to reproduce this exact build six
months from now, what do I need, and do I have it under control today?"
