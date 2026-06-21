---
name: swebok-security
description: >-
  Produce or review a software security assessment using the threat modeling,
  security requirements, secure design, and verification discipline from SWEBOK
  V4 Chapter 13. Use this whenever the work involves designing, evaluating, or
  hardening a software system's security posture — e.g. "threat model",
  "secure design", "SDLC security", "secure coding", "security review",
  "penetration testing", "vulnerability management", "OWASP", "security
  requirements", "attack surface analysis", "supply chain security", "cloud
  security", "container security", "zero trust", "SAST", "DAST", "CVE
  remediation", "security policy", "information security", "cybersecurity for
  software", "secure architecture", "authentication design", "authorization
  design", "input validation", "cryptography choices", "secrets management",
  "security testing", "security by design". Trigger even when the user just
  says "how do I secure this", "what are the threats", or "review this for
  security" — the discipline of threat modeling before countermeasure selection
  applies, not just a checklist of best practices.
---

# Software Security

A software security assessment is the work product that identifies the threats
a system faces, derives security requirements from those threats, designs
controls to address them, and establishes a plan to verify and maintain the
system's security posture over time. It is not a compliance checkbox and not a
list of security features. Its job is to give teams a threat-grounded model
that explains _why_ each control exists and what it protects.

Three principles drive everything below:

1. **Security is a system property, not a feature** — it cannot be added at
   the end of development. It must be present in requirements, design,
   construction, testing, and operations simultaneously. A "security sprint"
   after the fact is damage control, not security engineering.
2. **Threat modeling precedes countermeasure selection** — choosing security
   controls without first identifying the threats they address wastes resources
   and creates false confidence. The question is never "what security features
   should we add?" but "what are the realistic threats, and which controls
   address them most cost-effectively?"
3. **Security debt compounds with attack surface** — unlike performance debt
   (which degrades experience), security debt enables catastrophic loss: data
   breach, system compromise, supply chain attack. Deferred security decisions
   widen the attack surface over time.

## When NOT to over-apply this

A personal script with no external inputs and no sensitive data doesn't need a
formal threat model. Scale the discipline to the sensitivity of the assets, the
breadth of the attack surface, and the regulatory context. A web application
with user data always warrants at least steps 1–4. Safety-critical or regulated
systems warrant the full workflow. State the scaling decision rather than
silently defaulting to maximal ceremony.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Define security context

Security is **outward-looking**. Before any control or requirement, establish:

- The **assets** — what needs protection and why. Classify each by sensitivity:
  which CIA properties (confidentiality, integrity, availability) matter most
  and at what level (high/medium/low).
- The **trust boundaries** — every point where data or control moves from one
  trust context to another: internet to application, user input to database
  query, internal service to external API, operator to privileged subsystem.
  Trust boundaries are where threats concentrate.
- The **security objectives** — the ranked priorities among confidentiality,
  integrity, and availability for this specific system. A payment processor
  prioritizes integrity and availability; a health records system prioritizes
  confidentiality. Getting this wrong misaligns every subsequent control
  decision.
- **Applicable regulations and standards** — GDPR, HIPAA, PCI-DSS, SOC 2,
  NIST SP 800-53, Common Criteria, ISO 27001, or domain-specific mandates.
  These are constraints, not suggestions — identify them before designing
  anything.

### 2. Conduct threat modeling

Systematically identify threats to the assets across trust boundaries.
Use STRIDE as the primary framework (Spoofing, Tampering, Repudiation,
Information Disclosure, Denial of Service, Elevation of Privilege); augment
with OWASP Top 10 for web and API systems. Consult
`references/threats.md` for the full taxonomy with mitigations and the
SDLC phase where each threat is best addressed.

Produce a threat model document:

- A system diagram with all trust boundaries marked. Every data flow crossing
  a trust boundary is a potential attack surface element.
- A threat enumeration — one row per threat, identifying the affected asset,
  the attacker goal, and the attack vector.
- A risk rating for each threat: likelihood × impact → risk score. Use a
  consistent scale (e.g. 1–3 × 1–3 = risk 1–9) and be explicit about the
  assumptions behind likelihood estimates.
- A prioritized list: threats ordered by risk score, with high-risk threats
  requiring controls before the system ships.

Don't enumerate threats exhaustively at the expense of prioritization. A
ranked list of the ten most realistic threats is more actionable than an
exhaustive catalog with no ordering.

### 3. Derive security requirements

Translate each prioritized threat into a security requirement. A security
requirement that cannot be verified is a wish, not an engineering specification.

Organize requirements by SDLC phase:

- What must be **specified** — the security properties the system is committed
  to providing, expressed as verifiable conditions.
- What must be **designed** — architectural decisions, control placements, and
  data handling principles that the design must satisfy.
- What must be **implemented** — coding-level constraints: which functions are
  forbidden, which patterns are mandatory, which checks must be present at
  every trust boundary.
- What must be **tested** — verification criteria for each security
  requirement, naming the technique (SAST, DAST, SCA, code review,
  penetration test) that will confirm it.
- What must be **operated** — runtime security properties: logging of
  security events, monitoring thresholds, patch SLAs, secrets rotation.

Consult `references/sdlc-controls.md` for the phase-to-control mapping. Every
security requirement must be verifiable.

### 4. Design security controls

Design controls to address security requirements. For each control, record the
threat(s) it addresses and the alternatives rejected — the same discipline as
significant architectural decisions.

Core control categories to reason through:

- **Authentication** — how identity is established. Prefer MFA for human users;
  prefer certificate-based or signed token authentication for service-to-service.
  Never roll custom authentication schemes.
- **Authorization** — who may do what. Design the access control model
  explicitly (RBAC, ABAC, or policy-based); authorization must be enforced at
  every trust boundary, not just at the entry point.
- **Input validation and output encoding** — all data from untrusted sources is
  hostile until proven otherwise. Validate against an allowlist at every trust
  boundary crossing; encode output for the context in which it is rendered
  (HTML, SQL, shell, JSON, etc.). These two controls address the majority of
  injection-class vulnerabilities.
- **Cryptography** — protect data at rest and in transit using current
  algorithm recommendations from NIST. Never design custom cryptographic
  schemes. Select algorithms, key lengths, and modes of operation explicitly
  and document the rationale.
- **Least privilege** — every component, user, process, and service account
  gets only the minimum permissions necessary. Design permission sets
  explicitly; do not inherit ambient or elevated permissions by default.
- **Defense in depth** — layer controls so that no single failure exposes the
  asset. Name the layers and the assumption each makes about the failure of
  layers below it.
- **Secure defaults** — the system must be secure in its default configuration.
  Optional security features that require administrator action to enable are
  not secure by design.
- **Fail securely** — when a control fails (authentication service is
  unavailable, authorization check throws an exception), the system must fail
  closed (deny access), not open.
- **Secrets management** — no credentials, API keys, or cryptographic material
  in source code or build artifacts. Use a secrets store (vault, environment
  injection at runtime) and establish a rotation policy.

### 5. Verify security properties

Apply security-specific verification techniques — each finds a different class
of vulnerability. No single technique is sufficient:

- **SAST (Static Application Security Testing)** — automated analysis of
  source code for known vulnerability patterns (injection sinks, hardcoded
  secrets, insecure API calls) without executing the code. Run in CI on every
  commit. Fast but produces false positives; requires tuning and human triage.
- **DAST (Dynamic Application Security Testing)** — security analysis of a
  running application by exercising it with malformed or adversarial inputs.
  Run against a staging environment. Finds runtime and configuration issues
  SAST cannot see (exposed headers, session management flaws, server-side
  misconfigurations).
- **SCA (Software Composition Analysis)** — scanning of third-party
  dependencies for known CVEs. Run in CI. Results must feed a defined triage
  and patch process — a scan that produces no remediation is not security
  engineering.
- **Security-focused code review** — manual review of code against the threat
  model, checking that controls are present, correctly placed, and not
  bypassable. Most effective when the reviewer knows the threat model, not just
  generic secure coding patterns.
- **Penetration testing** — authorized adversarial testing against the running
  system, attempting to exploit weaknesses. Appropriate for high-risk systems
  before initial launch and on a recurring schedule. Scope and rules of
  engagement must be documented. Results must be tracked to remediation.

For each technique, record the scope, the tool(s) used, the responsible party,
and the pass/fail criteria.

### 6. Operate securely

Security does not end at deployment. Establish the operational security
posture before the system ships:

- **Vulnerability management** — a defined process for monitoring CVE feeds
  (e.g. NVD, vendor advisories), triaging findings against the system's
  dependency set, and patching within defined SLAs by severity (see
  `references/sdlc-controls.md` for recommended SLAs).
- **Security monitoring** — what to log (authentication events, authorization
  failures, input validation failures, privilege changes, anomalous access
  patterns), how to alert, and how to escalate. Logs must be tamper-evident
  and retained per regulatory requirements.
- **Secrets rotation** — a schedule and tooling for rotating all credentials,
  API keys, and cryptographic material. Secrets that never rotate become
  permanent attack surface.
- **Incident response** — a documented plan: who is notified, in what order,
  what they do, how the system is isolated, and how evidence is preserved.
  Plans that have never been tested are unreliable; schedule tabletop exercises.
- **Supply chain security** — SBOM generation for every release (what
  components are in the artifact and at what version), signed artifacts,
  dependency pinning, and a policy for evaluating new dependencies before
  introduction.

## Output format

Unless the user asks for something else, use this structure. Adapt depth to
the system's scale and risk level.

```
# Security Assessment: <System Name>

## 1. Security context
- Assets and their sensitivity (high/medium/low CIA requirements)
- Trust boundaries and data flows diagram
- Security objectives (confidentiality / integrity / availability priorities)
- Applicable regulations and standards

## 2. Threat model
| Threat ID | Category (STRIDE) | Threat description | Affected asset | Likelihood | Impact | Risk | Priority |

### System diagram with trust boundaries
[diagram or description]

## 3. Security requirements (derived from threats)
| Req ID | Threat(s) addressed | SDLC phase | Requirement | Verification method |

## 4. Security control design
| Control | Threat(s) addressed | Design decision | Alternatives rejected |

## 5. Verification plan
| Technique | What it finds | Scope | Tool(s) | Responsible |
(SAST, DAST, SCA, code review, penetration test)

## 6. Operational security
- Vulnerability management process and SLA by severity
- Security monitoring: what to log, alert on, and how to escalate
- Secrets management approach
- Incident response contacts and runbook pointer
- SBOM and supply chain security approach
```

If asked to evaluate a specific vulnerability or control rather than produce
a full assessment, still apply the discipline silently: name the threat the
finding represents, identify the asset at risk, and recommend controls tied
to that specific threat.

## Reviewing an existing system's security (checklist mode)

When the task is to critique or evaluate rather than design, run the workflow
as a checklist against what exists:

1. Is there a threat model? If not, the controls are guesses, not engineering.
   Ask what threat each existing control is meant to address; absence of an
   answer is itself a finding.
2. Do security controls map to specific threats, or are they "best practices"
   with no threat rationale? Controls without a threat rationale cannot be
   evaluated for sufficiency or cost-effectiveness.
3. Are all trust boundaries identified and protected — input validation,
   authentication, and authorization at every boundary crossing, not just at
   the perimeter?
4. Are there hardcoded secrets, credentials in logs, or insecure defaults?
   These are high-severity findings with immediate remediation paths.
5. Are dependencies monitored for CVEs? Is there a defined patch SLA by
   severity, and evidence it is being followed?
6. Is SAST running in CI? DAST against staging? Penetration testing on a
   recurring schedule appropriate to the system's risk level?
7. Is there security-specific logging: authentication events, authorization
   failures, input validation failures? Are logs tamper-evident and retained?
8. Is there an incident response plan, and has it been tested (tabletop
   exercise or simulation)?
9. For cloud and container deployments: are images scanned for CVEs, are
   network policies applied to limit lateral movement, is IAM configured to
   least privilege, and are secrets injected at runtime rather than baked in?

Lead the review with the highest-severity finding, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Asset** — anything of value that needs protection: data, services,
  reputation, availability. Assets are what a threat actor wants to reach or
  harm.
- **Threat** — a potential adverse action that could harm an asset (distinct
  from a vulnerability, which is a weakness that could be exploited). A threat
  requires an actor, an action, and a target.
- **Vulnerability** — a weakness in design, implementation, or operation that
  a threat actor could exploit to cause harm to an asset.
- **Attack surface** — the sum of all points where an attacker could try to
  enter or extract data from the system. Every exposed interface, input field,
  API endpoint, and dependency version is part of the attack surface.
- **Trust boundary** — a point in the system where data or control moves from
  a context with one level of trust to another (e.g. from internet to
  application, from user input to database query, from one service to another).
  Controls must be present at every trust boundary crossing.
- **STRIDE** — Spoofing, Tampering, Repudiation, Information Disclosure,
  Denial of Service, Elevation of Privilege — a threat categorization
  framework used to enumerate threats systematically during threat modeling.
- **CIA** — Confidentiality, Integrity, Availability — the three pillars of
  information security objectives. Every asset has a CIA rating; every threat
  breaks one or more of these properties.
- **SAST** — Static Application Security Testing: analysis of source code for
  vulnerability patterns without execution. Finds issues at commit time.
- **DAST** — Dynamic Application Security Testing: security analysis of a
  running application. Finds runtime, configuration, and integration issues
  that SAST cannot reach.
- **SCA** — Software Composition Analysis: scanning of third-party dependencies
  for known CVEs. The primary tool for supply chain vulnerability management.
- **Least privilege** — granting each component, user, process, or service
  account only the minimum permissions required for its function and no more.
- **Defense in depth** — layering multiple independent security controls such
  that no single failure exposes the asset; each layer assumes the layer below
  it may fail.
- **Threat model** — the work product of systematically enumerating threats to
  a system's assets across its trust boundaries, rating their risk, and
  prioritizing them for countermeasure design. Controls designed without a
  threat model are guesses.
