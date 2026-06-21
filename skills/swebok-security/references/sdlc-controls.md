# SDLC Security Controls

A phase-by-phase mapping of security activities to the software development
life cycle. This operationalizes the principle that security must be present
in every phase, not retrofitted at the end. Use this during step 3 of the
workflow (Derive security requirements) to ensure each threat identified in
the threat model is addressed by a control in the appropriate SDLC phase.

The organizing question for each phase is: **what security decisions made or
missed here are most expensive to reverse later?**

---

## Requirements Phase

Security requirements missed here result in system designs that have no path
to meeting them without architectural rework. This is the highest-leverage
phase for security cost control.

**Activities:**

- **Elicit security requirements from the threat model.** For each threat
  rated high or critical risk, derive at least one security requirement stating
  the property the system must provide. Requirements must be verifiable — if
  you cannot define a test or measurement that confirms the requirement, it is
  not a requirement yet.
- **Define security acceptance criteria.** For each security requirement,
  define the condition under which the system is considered to have met it.
  These become the basis for security test cases in the Testing phase.
- **Identify regulatory and legal requirements.** Regulations impose non-
  negotiable constraints on security controls, data handling, logging,
  retention, and disclosure. Common examples:
  - GDPR: data minimization, right to erasure, breach notification within 72 hours
  - HIPAA: access controls, audit logs, encryption of PHI at rest and in transit
  - PCI-DSS: network segmentation, encryption of cardholder data, vulnerability
    scanning and penetration testing schedules
  - NIST SP 800-53: control baseline for US federal systems
  - SOC 2: trust service criteria covering security, availability, and
    confidentiality
    Regulatory requirements are constraints, not design options.
- **Define privacy requirements.** Where the system handles personal data,
  specify: what data is collected (data minimization — collect only what is
  necessary), how long it is retained (retention policy), what the right-to-
  erasure process is, and where data is processed (data residency requirements).
- **Document security constraints.** Fixed boundaries on the solution that
  security imposes: approved cryptographic algorithm list, mandated
  authentication standard, prohibited technologies, required certifications.
  Constraints discovered late cause expensive rework; surface them at
  requirements time.

---

## Design Phase

Security controls designed incorrectly at this phase produce systems that are
structurally insecure — fixing them requires redesign, not just a code change.

**Activities:**

- **Apply security design principles throughout.** These are not checklists to
  apply at the end of design; they are constraints that shape every design
  decision:
  - _Least privilege_ — every component, service account, user role, and
    process gets only the minimum permissions required for its function.
  - _Defense in depth_ — layer independent controls so that no single failure
    exposes an asset. Name the layers; state what each assumes about the failure
    of layers below it.
  - _Fail securely_ — when a control fails (authentication service unavailable,
    authorization check throws an exception), the system must deny access, not
    grant it.
  - _Secure defaults_ — the system is secure in its default configuration.
    Security features that must be explicitly enabled are not security by design.
  - _Separation of duties_ — high-value operations require more than one actor
    or component to complete; no single entity can perform and conceal a
    sensitive action alone.
  - _Economy of mechanism_ — simpler security mechanisms are easier to reason
    about, review, and get right. Prefer simple, well-understood controls over
    complex novel ones.
- **Design authentication and session management.** Choose the authentication
  mechanism before any construction begins. Document: what factors are required,
  how credentials are stored (hashed with a modern adaptive algorithm: bcrypt,
  scrypt, Argon2), how sessions are established and terminated, session lifetime
  and renewal policy, and how account recovery is handled. Never design custom
  authentication schemes; use proven implementations.
- **Design the authorization model.** Choose and document the access control
  model: role-based (RBAC), attribute-based (ABAC), or policy-based. Define
  all roles and their permitted actions. Define where authorization is enforced
  (it must be enforced at every trust boundary, not only at the entry point).
  Authorization logic that lives only in the UI layer is not authorization — it
  is presentation.
- **Design input validation and output encoding strategy.** Specify: what
  constitutes valid input for each category of data (allowlists, format rules,
  size limits); where validation is enforced (at every trust boundary); and
  what encoding is applied to outputs in each rendering context (HTML
  encoding for HTML output, parameterized queries for SQL, shell quoting for
  OS commands). These decisions, made once at design time, prevent entire
  classes of injection vulnerabilities.
- **Select cryptographic algorithms.** Consult current NIST recommendations
  (NIST SP 800-131A for algorithm transitions; NIST SP 800-57 for key
  management). Document choices for: symmetric encryption (AES-256-GCM),
  key derivation (HKDF, PBKDF2 with sufficient iterations), hashing (SHA-256
  or SHA-3 family), asymmetric operations (RSA 2048+ or elliptic curve P-256+),
  and TLS configuration (TLS 1.2 minimum; 1.3 preferred; specify permitted
  cipher suites). Never design custom cryptographic algorithms or modes.
- **Design secrets management.** Define how all credentials, API keys, and
  cryptographic material are stored and delivered to the application at
  runtime. No secrets in source code, build artifacts, container images,
  configuration files committed to version control, or environment variables
  visible in process listings. Use a secrets store (HashiCorp Vault, AWS
  Secrets Manager, GCP Secret Manager, Azure Key Vault) with access control
  and audit logging. Define the rotation schedule for each secret class.
- **Produce an updated threat model for the design.** The requirements-phase
  threat model was based on system context; the design-phase threat model
  adds the implementation approach, data flows, and component interactions
  that may introduce new threats or change risk ratings. Update the threat
  model when the design is sufficiently detailed to reveal implementation
  choices.
- **Conduct a security architecture review.** Have the design reviewed by
  someone not on the design team, using the threat model as the review
  baseline. The review question is not "does this look secure?" but "does
  this design address each threat in the threat model, and are there threats
  the model missed?"

---

## Construction Phase

Construction phase security failures produce vulnerabilities that SAST and
code review can find but that cannot be fixed without code changes. The most
common and most costly class of security defect is introduced here.

**Activities:**

- **Implement security controls per design.** Each security control specified
  in the design phase must be implemented exactly as specified. Deviations must
  be reviewed against the threat model, not resolved by the implementing
  developer alone.
- **Parameterized queries and prepared statements.** All database access must
  use parameterized queries or prepared statements — not string concatenation
  of user-supplied values into SQL. This is not optional for systems that
  accept external input. ORMs that generate parameterized queries are
  acceptable; raw query construction from user input is not, regardless of
  other validation in place.
- **Input validation at all trust boundaries.** Validate all inputs against
  an allowlist of permitted values, formats, sizes, and types at every point
  where data crosses from a less-trusted to a more-trusted context. Reject
  invalid input with a generic error; do not attempt to sanitize and accept
  it. Allowlist validation (permit known-good) is more reliable than
  denylist validation (block known-bad).
- **Output encoding context-appropriate.** Encode all data before including
  it in output, using the encoding appropriate to the rendering context: HTML
  entity encoding for HTML output, JavaScript encoding for script contexts,
  URL encoding for URLs, and parameterized queries (not encoding) for SQL.
  Mixing encoding contexts or applying the wrong encoding is as dangerous as
  no encoding.
- **Error handling: fail securely and without disclosure.** Error handling
  must: (1) deny access when an unexpected state is reached, not permit it;
  (2) return generic error messages to external callers (no stack traces, file
  paths, internal component names, or configuration details); (3) log
  detailed error information internally with sufficient context for diagnosis.
  Catch-all exception handlers that silently swallow errors and continue
  normal operation mask security failures and inhibit incident response.
- **Dependency management: pin versions and scan for CVEs.** Pin all
  dependency versions in the build configuration (lock files for language
  package managers; explicit version tags for container base images). Run SCA
  scanning as part of the build or CI pipeline; triage results before merging.
  Track which CVEs have been reviewed and accepted as low-risk vs. which
  require patching — an unreviewed CVE list is not a risk management process.
- **No secrets in source code.** Enforce through a combination of: developer
  education, pre-commit hooks that scan for credential patterns (detect-secrets,
  truffleHog, GitLeaks), and CI checks that block merge if secrets are
  detected. Secrets that reach version control are compromised secrets —
  rotation is required even if the repository is nominally private, because
  access control on the repository is a separate and potentially weaker
  boundary than the secret itself.
- **Security-relevant code review checklist.** In addition to standard code
  review, check:
  - Authorization is enforced at the function/method level, not only at the
    routing layer
  - No hardcoded credentials, tokens, or keys
  - Input validation is present at every trust boundary in the code path
  - Cryptographic operations use approved libraries and algorithms (no
    custom implementations, no MD5/SHA-1 for security purposes, no DES/3DES)
  - Error handling does not leak internal state
  - Logging captures security-relevant events without logging sensitive data
  - New dependencies have been reviewed and approved before introduction

---

## Testing Phase

Testing phase security activities verify that controls implemented during
construction are present, correct, and not bypassable. Each technique finds
a different class of vulnerability; no single technique is sufficient.

**Activities:**

- **SAST in CI pipeline.** Run static application security testing on every
  commit or pull request. SAST analyzes source code for vulnerability patterns
  (injection sinks, insecure API calls, hardcoded secrets, known-bad patterns)
  without executing the code. SAST finds issues early and cheaply, but
  produces false positives that require triage; configure rules to match the
  language and framework in use.
  - Example tools: Semgrep, CodeQL, Checkmarx, Veracode, Bandit (Python),
    SpotBugs with FindSecBugs (Java), Brakeman (Ruby on Rails).
  - Treat SAST findings as a required review step before merge, not an
    optional report.
- **DAST against staging environment.** Run dynamic application security
  testing against a running instance of the application in a staging
  environment. DAST sends adversarial requests to the application and analyzes
  responses for vulnerability indicators. DAST finds runtime and configuration
  issues that SAST cannot see: exposed security headers, session management
  flaws, server-side misconfigurations, injection vulnerabilities not caught
  at the source code level.
  - Example tools: OWASP ZAP, Burp Suite, Nikto.
  - Scope DAST to cover all application endpoints; review results manually —
    DAST has both false positives and false negatives.
- **SCA and dependency scanning.** Run software composition analysis to
  identify known CVEs in all third-party dependencies, including transitive
  dependencies. Results must feed a defined triage and remediation process.
  - Example tools: Dependabot (GitHub), Snyk, OWASP Dependency-Check,
    Trivy (container images and filesystems), Grype.
  - Integrate into CI so that new CVEs introduced by dependency changes are
    caught before merge.
- **Security-focused code review.** Manual review of code specifically against
  the threat model. A security-focused reviewer asks: "Is the control for
  threat T present here? Can it be bypassed? Is it applied at the right trust
  boundary?" This is distinct from general code quality review. Reviewers
  should know the threat model, not just generic secure coding guidelines.
- **Penetration testing.** Authorized adversarial testing against the running
  system, attempting to exploit identified or previously unknown weaknesses.
  Penetration testing is appropriate for: systems with high-risk assets, before
  initial production launch of significant systems, after major architectural
  changes, and on a recurring schedule (annually at minimum for high-risk systems).
  - Scope and rules of engagement must be documented and signed before testing
    begins.
  - Findings must be tracked to remediation with defined timelines.
  - Distinguish between black-box (no prior system knowledge), grey-box (partial
    knowledge), and white-box (full knowledge) testing; choose based on what
    is most useful given the system's threat model.
- **Security regression tests.** For every security vulnerability found and
  fixed — whether in testing, penetration testing, or production — add a
  specific regression test that confirms the vulnerability is no longer
  exploitable. This prevents reintroduction through future changes and builds
  a security-specific test suite over time.

---

## Operations Phase

Security in operations is not optional maintenance — it is the continuation
of the security engineering discipline into the phase where the attack surface
is exposed to real adversaries in real conditions.

**Activities:**

- **Vulnerability management.** Establish a defined process with accountable
  owners for: monitoring CVE feeds and vendor security advisories for all
  components in use (OS, runtime, libraries, container images, cloud services);
  triaging findings against the actual system to determine exploitability and
  impact; and patching within defined SLAs by severity:

  | Severity | CVSS Score Range | Patch SLA |
  | -------- | ---------------- | --------- |
  | Critical | 9.0 – 10.0       | 24 hours  |
  | High     | 7.0 – 8.9        | 7 days    |
  | Medium   | 4.0 – 6.9        | 30 days   |
  | Low      | 0.1 – 3.9        | 90 days   |

  SLAs are not goals — they are commitments. Track compliance. Escalate
  when SLAs cannot be met due to operational constraints; accept formal risk
  exceptions rather than silently missing them.

- **Security monitoring and alerting.** Establish what to log, how to protect
  logs, and how to alert on anomalous patterns:
  - _What to log:_ authentication events (success and failure, including
    source IP and user agent), authorization failures, input validation
    failures, privilege changes, session management events, administrative
    actions, anomalous access patterns (unusual volume, unusual time, unusual
    location for the user).
  - _Log protection:_ ship logs to a separate, append-only system in real
    time; retain per regulatory requirements; protect with access controls
    the application account cannot satisfy; ensure logs include sufficient
    context (identity, timestamp, action, outcome) to support incident
    investigation.
  - _Alerting thresholds:_ configure alerts for authentication failure rates
    above baseline (potential credential stuffing), authorization failures
    for a single user above baseline (potential privilege escalation attempt),
    anomalous data export volumes, and off-hours administrative actions.
  - Logs that are not reviewed and not alerting are not a security control —
    they are a storage cost.

- **Secrets rotation.** Define and enforce a rotation schedule for all
  secrets: API keys, database credentials, service account credentials,
  TLS certificates, encryption keys, and signing keys. Rotation schedules
  should be driven by the sensitivity of what the secret protects and the
  blast radius of compromise:
  - High-privilege credentials (root database access, IAM admin): rotate
    frequently, ideally via short-lived credentials issued on-demand.
  - Service-to-service credentials: rotate on a schedule (30–90 days) and
    on any personnel change.
  - TLS certificates: automate renewal (Let's Encrypt, AWS Certificate
    Manager, cert-manager) to avoid expiry-driven outages.
    Automate rotation where possible; manual rotation schedules are reliably
    missed. Design applications to handle secret rotation without downtime
    (support overlapping validity periods during rotation).

- **Incident response plan.** Document and test a plan covering: who is
  notified (security lead, engineering lead, legal, communications, affected
  customers) and in what order; how the system is isolated or degraded to
  limit blast radius; how evidence is preserved (forensic copies of logs,
  memory, disk before remediation); who has authority to take the system
  offline; regulatory notification obligations and their timelines (e.g.
  GDPR 72-hour breach notification). A plan that has never been tested is
  unreliable. Conduct tabletop exercises at least annually for high-risk
  systems; test the notification and isolation procedures, not just the
  written plan.

- **Supply chain security.** Security of the software supply chain is an
  operations concern as much as a construction concern:
  - _SBOM (Software Bill of Materials)_ — generate an SBOM for every release
    artifact, listing all components and their versions. SBOM formats: SPDX
    or CycloneDX. SBOM enables rapid impact assessment when a new CVE is
    disclosed for a component.
  - _Signed artifacts_ — sign all release artifacts (container images, binary
    distributions, package releases) using a key management system the
    attacker cannot access. Verify signatures before deployment. Sigstore
    (cosign, rekor) provides a free, auditable signing infrastructure for
    container images and software artifacts.
  - _Dependency pinning_ — pin all dependencies to exact versions with
    verified checksums. Floating version references (^1.2, ~1.2, latest)
    introduce uncontrolled update paths that supply chain attackers exploit.
  - _New dependency evaluation_ — define and enforce a policy for introducing
    new dependencies: who approves, what due diligence is required (maintainer
    reputation, license, CVE history, community size), and how the decision
    is recorded.

- **Regular security assessments.** Establish a recurring schedule for formal
  security activities beyond the CI/CD pipeline:
  - Penetration testing: annually at minimum for high-risk systems; after
    major architectural changes.
  - Threat model review: when the system's assets, trust boundaries, or
    regulatory context changes significantly; at least annually.
  - Red team exercises: for the highest-risk systems, authorized adversarial
    simulation of realistic attack scenarios (including social engineering
    and physical access, not just technical exploitation).

- **Security patching process for infrastructure.** Application-layer security
  is insufficient if the OS, container runtime, language runtime, web server,
  and cloud platform components are unpatched. Establish: automated OS and
  runtime patching schedules; container image rebuild cadence (rebuild and
  redeploy regularly, not only when application code changes); cloud platform
  service version management; and firmware update processes for any hardware
  under the organization's control.
