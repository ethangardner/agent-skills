---
name: swebok-configuration-management
description: >-
  Plan, audit, or review software configuration management using the SCM
  discipline from SWEBOK Chapter 8. Use this whenever the work involves
  identifying configuration items, planning baselines, designing a change
  control process, or evaluating an existing SCM setup — e.g. "write an SCM
  plan", "define our branching strategy", "establish a baseline", "set up a
  change control board", "design our release management process", "audit our
  configuration management", "traceability of changes", "build management",
  "configuration library", "artifact versioning", "Git branching strategy",
  "monorepo strategy", "release train", or "software baseline". Trigger even
  when the user says "version control strategy" or "CCB" — the discipline of
  conscious CI identification, baseline management, and auditable change
  control applies, not just tool configuration.
---

# Software Configuration Management

Software configuration management (SCM) is the discipline of identifying,
recording, and controlling changes to the items that make up a software product
across its lifecycle. It is not version control: version control is one tool
used for one SCM activity. SCM spans planning, identification, change control,
status accounting, auditing, and release management.

The dominant failure mode in SCM is not tool misuse — it is the absence of a
conscious identification decision about what is under control, and why. Without
explicit CI identification, changes are tracked inconsistently, baselines are
unreliable, and audits find gaps that cost far more to recover from than
prevention would have.

## Philosophy

1. **What you do not identify, you cannot control** — Every SCM activity
   depends on a prior decision about which items are configuration items (CIs).
   Skipping this step means changes are tracked inconsistently, baselines are
   unreliable, and audits find gaps. CI identification is the foundation of all
   other SCM; it is an engineering decision, not a default.

2. **SCM is about controlling change, not preventing it** — The goal is that
   every change is _traceable_ (who requested, who approved, what changed,
   when, and why), _reproducible_ (any baseline can be reconstructed from
   controlled items), and _recoverable_ (any baseline can be restored).
   Traceability, reproducibility, and recoverability are the three tests of
   effective SCM.

3. **Baselines are commitments, not snapshots** — A baseline is a formal
   agreement that changes from this point forward will be tracked, controlled,
   and auditable against it. Choosing when to baseline is an engineering
   decision with contractual and operational consequences — it is not just
   "tagging a commit."

## When NOT to over-apply this

A solo project on a personal machine does not need a change control board. The
discipline earns its keep when: multiple people contribute to the same
artifacts; the software has external dependencies or interfaces; there are
contractual, safety, or regulatory obligations; or the system must be
reproducible across environments. Scale the ceremony to the team, the
obligations, and the lifetime of the system — but make the scaling decision
explicitly rather than by accident.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Plan SCM

Define the organizational context before any tool or branching decision. The
SCM plan must cover:

- **Scope** — which software product(s) and artifact types are under SCM
  control, and which are intentionally excluded.
- **Roles and responsibilities** — who is the SCM manager, who constitutes the
  change control authority, who are the CI custodians for each artifact type.
- **Tools** — version control system, build system, artifact registry, CI/CD
  pipeline, issue tracker. Tool selection follows from process requirements, not
  the reverse.
- **Schedule of SCM activities** — when identification, baselining, auditing,
  and status reporting occur relative to project milestones.
- **Monitoring** — how SCM activity compliance will be tracked and by whom.

The output is an SCM plan document (see output format below). Resist the
impulse to start with branching strategy — branching strategy is one
implementation choice within change control, not the foundation of SCM.

### 2. Identify configuration items

Determine which items require individual versioning and change control. This is
the most consequential SCM decision and is frequently skipped.

- **Typical CI types**: source code files, build scripts, configuration files,
  environment specifications, database schemas, test suites, interface
  specifications, third-party dependency manifests, architecture and design
  documents, user and operations documentation.
- **Identification decision**: each CI type requires an explicit answer to: is
  this item tracked independently? Can a change to this item be requested,
  approved, and audited separately from other items?
- **Assign attributes**: each CI receives a unique identifier, naming
  convention, version scheme, status field, and owner.
- **Establish the CI library**: define where each CI type is stored and how it
  is accessed under controlled conditions.

Document the CI identification decisions. "Everything in Git" is not a CI
identification decision — it is a tool decision. The identification decision is
which things in Git constitute separately controllable units.

### 3. Establish baselines

Define which engineering milestones trigger a new baseline and what each
baseline contains. A baseline is not a tag; it is a formal agreement with
corresponding audit obligations.

- Map each baseline type to its triggering event, its contents (specific CI
  versions), and the audit type that certifies it.
- Define who has the authority to approve each baseline type.
- Define the change control process that governs changes against each baseline
  once established.

Consult `references/baseline-types.md` for the standard baseline taxonomy
(functional, allocated, developmental, product), triggering events, contents,
and corresponding audit types. Use that taxonomy as the starting point; adapt
to the project context and document the adaptation.

### 4. Implement change control

Define the end-to-end process for every change to a controlled CI after a
baseline is established. Effective change control is not bureaucracy for its
own sake — it is the mechanism that makes baselines meaningful.

- **Change request (CR) intake** — any party may submit; the CR form captures:
  ID, requester, affected CIs, description of change, justification, priority,
  and impact scope.
- **Impact assessment** — a designated engineer evaluates technical impact
  (what else changes? what interfaces are affected? what is the regression
  risk?).
- **Approval** — the change control board (CCB) or a lightweight equivalent
  (tech lead, product owner — name it and define its scope) approves, defers,
  or rejects the CR.
- **Implementation** — the approved change is implemented in a controlled
  branch; the implementer updates any dependent CIs.
- **Verification** — the change is verified against the original justification
  and tested for regression.
- **Baseline update** — the affected baseline is updated and the CR is closed
  with full traceability.
- **Interface control** — changes to shared interfaces between separately
  developed components require notification of all affected parties before
  approval; interface change is a distinct category of CR.

### 5. Maintain status accounting

Status accounting is the continuous recording and reporting of CI status and
change history. Its job is to make "what is in the current build?" and "what
changed since the last release?" answerable without a manual audit.

- Track current version and status of each CI at all times.
- Record which CRs are: submitted, under assessment, approved, implemented,
  verified, closed.
- Record which baseline each CR was applied against and what the resulting
  baseline version is.
- Define reporting frequency, recipients, and format. Status accounting data
  that lives in a spreadsheet nobody reads is not status accounting.

### 6. Conduct audits

At defined milestones, conduct formal audits to verify that CIs and process
are consistent with commitments. Two audit types are defined by the baseline
structure; a third covers process compliance:

- **Functional Configuration Audit (FCA)** — does the software meet its
  functional requirements as specified in the governing baseline? Conducted at
  system test entry and at delivery.
- **Physical Configuration Audit (PCA)** — are all expected CIs present,
  correctly identified, and consistent with each other in the baseline? The PCA
  verifies completeness. Conducted at product baseline establishment.
- **Configuration management audit** — is the SCM process being followed? Are
  CRs being recorded and dispositioned? Are baselines being maintained? A
  process audit, not a product audit.

Plan audit schedule, auditor, and criteria at the same time as the baseline
schedule (step 3). An audit whose criteria are defined after the fact is an
audit in name only.

## Output format

Unless the user asks for something else (e.g., a branching policy document, a
CCB charter, or an audit checklist), use this structure. Adapt depth to the
project's scale and obligations.

```
# SCM Plan: <Project Name>

## 1. Scope and context
- Product(s) under SCM control
- Project overview and duration
- SCM tools: [version control, build system, CI/CD pipeline, artifact registry,
  issue tracker]
- Roles: SCM manager, change control authority, CI custodians by artifact type
- Applicable standards or regulatory obligations

## 2. Configuration item identification
| CI Type | Naming convention | Version scheme | Location / library | Owner |
(Source code, build scripts, config files, env specs, schemas, test suites,
interface specs, dependency manifests, documentation — list each type
explicitly; document exclusions)

## 3. Baseline schedule
| Baseline name | Type | Triggering event | Contents | Audit type | Approved by |
(Reference baseline-types.md for the standard taxonomy)

## 4. Change control process
- Change request form fields: ID, requester, affected CIs, description,
  justification, priority, impact scope
- Approval authority: [CCB members / tech lead / auto-approve criteria by CI
  type]
- Branch and merge policy: ___
- Interface change notification process: ___
- CR disposition timeline (SLA by priority): ___

## 5. Status accounting
- How current CI status is tracked: ___
- How CR status is tracked: ___
- Reporting frequency and recipients: ___
- Query: "what is in build N?" → ___
- Query: "what changed between release X and Y?" → ___

## 6. Audit schedule
| Milestone | Audit type | Auditor | Entry criteria | Exit criteria |

---

# Change Request Form

| Field | Value |
|-------|-------|
| CR ID | |
| Date submitted | |
| Requester | |
| Affected CIs | |
| Change description | |
| Justification | |
| Priority | |
| Impact assessment | |
| Interface change? | Yes / No |
| Approval decision | |
| Approved by | |
| Implementation branch | |
| Verification notes | |
| Baseline updated | |
| CR closed date | |
```

## Reviewing an existing SCM setup

When the task is to audit or evaluate rather than plan, run the workflow as a
checklist against what exists:

1. Is there an explicit list of configuration items? Or is "everything in Git"
   the identification decision — with no distinction between what is
   independently controllable and what is not?
2. Are naming conventions and versioning schemes documented and consistently
   applied across all CI types?
3. Is there a defined baseline schedule tied to engineering milestones, or only
   ad-hoc tagging without corresponding audit obligations?
4. Is there a change control process? Is it followed in practice? Are change
   requests recorded with full traceability, or are changes made directly
   without CR?
5. Can you reconstruct any released version from controlled items alone,
   without depending on an individual's local environment?
6. Has any functional or physical configuration audit been conducted? Were
   gaps found, and were they resolved?
7. Is status accounting maintained — can anyone answer "what changed between
   version X and Y?" without performing a manual diff?
8. Are third-party dependencies, build tools, and infrastructure configurations
   themselves under configuration control, with version pinning and change
   traceability?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Configuration item (CI)** — any item placed under configuration management:
  a discrete unit that can be independently versioned, changed, and audited.
  Not every file is a CI; CI status is the result of an identification
  decision.
- **Baseline** — a formally reviewed and agreed specification of a CI or set of
  CIs, established at a point in time, that can only be changed through formal
  change control. Baselines are commitments, not snapshots.
- **Change control** — the process of systematically managing changes to CIs:
  requesting, evaluating (impact assessment), approving, implementing,
  verifying, and closing.
- **Change control board (CCB)** — the authority responsible for approving or
  rejecting change requests against a baseline. May be a formal body or a
  named individual for small projects.
- **Status accounting** — the continuous recording and reporting of the status
  of CIs and the record of changes made to those CIs over time.
- **Configuration audit** — a formal review to verify that CIs are complete,
  correctly identified, and consistent with their specifications and with each
  other. Two types: FCA (functional) and PCA (physical).
- **Software library** — a controlled collection of software and related
  documentation used to aid in software development, use, and maintenance.
  The library is the physical manifestation of CI control.
- **Interface control** — the management of changes to shared interfaces
  between separately developed components or systems; requires cross-party
  notification and approval before interface CIs are changed.
- **Release management** — the planning, scheduling, and control of a build
  through testing and deployment, including documentation of what is released,
  to whom, and under what conditions.
- **Functional Configuration Audit (FCA)** — verifies that the software as
  built meets its functional requirements as specified in the governing baseline.
- **Physical Configuration Audit (PCA)** — verifies that all expected CIs are
  present, correctly identified, and consistent in the baseline. A completeness
  check, not a requirements check.
