# Threat Taxonomy

A reference for use during step 2 of the workflow (Conduct threat modeling).
This taxonomy gives each threat category a definition, the security property
it breaks, common examples, primary mitigations, and the SDLC phase where it
is most cost-effectively addressed.

Use STRIDE as the primary organizing framework; apply the OWASP Top 10 as an
overlay for web and API systems. Domain-specific sections cover container/cloud,
IoT, and ML/AI systems where the standard frameworks need augmentation.

---

## STRIDE Threat Categories

STRIDE enumerates six categories of threat by the kind of action a threat actor
takes. For each category, ask: "Where in my system could an attacker do this,
and what asset would be harmed?"

### Spoofing

**What it is:** Impersonating another user, component, or system — claiming an
identity the attacker does not possess.

**Security property broken:** Authentication (who you are).

**Common examples in software systems:**

- Forging session tokens or cookies to impersonate another user
- Replaying captured authentication credentials
- DNS spoofing or BGP hijacking to impersonate a legitimate service endpoint
- Forged sender addresses in inter-service calls lacking mutual authentication
- Certificate forgery or misuse of a CA-signed certificate for the wrong domain

**Primary mitigations:**

- Strong multi-factor authentication for human users
- Mutual TLS or signed tokens (JWT with appropriate algorithm constraints) for
  service-to-service authentication
- Certificate pinning for high-value connections where CA trust is insufficient
- Secure session management: cryptographically random session identifiers,
  short expiry, binding sessions to a second factor (e.g. IP or device)
- Never transmit credentials over unencrypted channels

**SDLC phase where best addressed:** Design (choose authentication mechanisms
before implementation begins) + Construction (implement correctly, no custom
schemes).

---

### Tampering

**What it is:** Unauthorized modification of data in transit, at rest, or in
execution — changing something the attacker should not be able to change.

**Security property broken:** Integrity (that data or code is what it claims
to be and has not been altered).

**Common examples in software systems:**

- SQL injection modifying database records
- Man-in-the-middle attacks altering data in transit
- Parameter tampering in HTTP requests (hidden fields, URL parameters, headers)
- Unauthorized write access to shared storage or message queues
- Supply chain attacks modifying build artifacts or dependencies

**Primary mitigations:**

- Parameterized queries and prepared statements (eliminates the most common
  form of database tampering via injection)
- Input validation at every trust boundary crossing; reject anything not
  conforming to a strict allowlist
- Message authentication codes (MACs) or digital signatures on data that
  crosses trust boundaries
- Code signing for build artifacts; integrity verification before execution
- Transport Layer Security (TLS) for all data in transit; HSTS for web
  applications
- Write access control: the principle of least privilege applied to data stores

**SDLC phase where best addressed:** Design (place integrity controls at every
trust boundary in the design) + Construction (implement parameterized queries,
input validation, and signing correctly).

---

### Repudiation

**What it is:** Denying having performed an action — a threat actor (or a
legitimate user acting in bad faith) claiming they did not do something they
did, when the system cannot prove otherwise.

**Security property broken:** Non-repudiation (the ability to prove that an
action occurred and who performed it).

**Common examples in software systems:**

- A user denying a financial transaction they initiated, when the system has
  no tamper-evident audit record
- A system component failing to log an action that later becomes relevant to
  an incident investigation
- Audit logs that can be altered or deleted by the same actors whose actions
  they record
- Missing timestamps or identity context in log entries

**Primary mitigations:**

- Tamper-evident audit logging: write logs to an append-only store that the
  application account cannot modify or delete
- Log all security-relevant events: authentication (success and failure),
  authorization decisions, privilege changes, data access and modification
- Include identity, timestamp, source IP, and action details in every log entry
- Digital signatures on high-value transactions (e.g. financial records, legal
  documents) so the action is cryptographically bound to the actor's credential
- Log integrity protection: ship logs to a separate system immediately, or use
  an WORM (write-once, read-many) log store

**SDLC phase where best addressed:** Design (design what to log and where
before construction) + Construction (instrument the code) + Operations
(protect and retain logs per policy).

---

### Information Disclosure

**What it is:** Exposure of information to parties who are not authorized to
receive it — confidential data reaching an attacker.

**Security property broken:** Confidentiality (that information is accessible
only to those authorized to see it).

**Common examples in software systems:**

- Detailed error messages exposing stack traces, internal paths, or database
  schema information
- Sensitive data in logs (passwords, tokens, PII, credit card numbers)
- Unencrypted data in transit (plain HTTP, unencrypted database connections)
- Unencrypted data at rest (unencrypted backups, unencrypted database columns
  for sensitive fields)
- Overly broad API responses returning more fields than the caller should see
- Directory traversal exposing files outside the intended scope
- Side-channel attacks (timing attacks on authentication, cache timing)

**Primary mitigations:**

- Encryption at rest for sensitive data (field-level encryption for the most
  sensitive fields; full-disk or tablespace encryption as a baseline)
- TLS for all data in transit; verify certificates; use current cipher suites
- Access control enforced at every data access point, not just at the API
  boundary (defense in depth)
- Output encoding and response filtering: return only the fields the caller
  is authorized to see
- Error handling hygiene: generic error messages to users; detailed errors
  only to trusted internal logging systems
- Secrets never in logs, source code, or error responses

**SDLC phase where best addressed:** Design (decide what is encrypted and
where; design access control model) + Construction (implement correctly;
sanitize error messages and logs).

---

### Denial of Service

**What it is:** Making a service or resource unavailable to legitimate users —
consuming resources, crashing the system, or blocking access.

**Security property broken:** Availability (that the system is accessible when
needed by authorized users).

**Common examples in software systems:**

- Network-level DDoS (volumetric attacks flooding bandwidth)
- Application-level DoS (crafted requests that consume disproportionate
  server resources: slow POST, algorithmic complexity attacks on parsing,
  ReDoS)
- Resource exhaustion (thread pool, connection pool, file descriptor, memory)
- XML/JSON bombs and other payload-based amplification attacks
- Cascading failures when downstream dependencies become unavailable

**Primary mitigations:**

- Rate limiting and throttling at all public-facing interfaces
- Input size limits and complexity limits on all parsed inputs
- Circuit breakers to prevent cascading failures from downstream dependencies
- Resource quotas at the infrastructure level (CPU, memory, connection limits
  per client)
- DDoS protection upstream (CDN, load balancer, cloud-provider DDoS
  mitigation services)
- Graceful degradation: define what the system does when resources are
  constrained, so failure modes are controlled

**SDLC phase where best addressed:** Design (design for availability: rate
limits, circuit breakers, resource quotas in the architecture) + Operations
(DDoS protection, capacity monitoring, and incident response for availability
events).

---

### Elevation of Privilege

**What it is:** Gaining capabilities or access beyond what has been authorized
— moving from lower to higher privilege within the system.

**Security property broken:** Authorization (that each actor can do only what
they are permitted to do).

**Common examples in software systems:**

- SQL injection that allows executing commands as the database administrative
  account
- Broken access control (IDOR — Insecure Direct Object Reference) allowing a
  user to access another user's data by changing an ID in a request
- SSRF (Server-Side Request Forgery) allowing a user to reach internal services
  via the application server's network position
- Container escape giving an attacker host-level access from inside a container
- Exploiting a privileged process to execute arbitrary code at elevated privilege
- JWT "alg: none" or algorithm confusion attacks bypassing authorization checks

**Primary mitigations:**

- Principle of least privilege at every layer: OS user, database user, service
  account, IAM role, container security context
- Authorization enforcement at every trust boundary, not just at the entry point
- RBAC or ABAC with explicit permission grants; deny-by-default
- Privilege separation: high-privilege operations isolated to minimal,
  audited components; ordinary application code runs at low privilege
- Input validation to prevent injection-based privilege escalation
- Regular authorization model review to detect privilege drift

**SDLC phase where best addressed:** Design (design the authorization model;
apply least privilege in architecture) + Construction (implement authorization
checks at every trust boundary; no ambient privilege).

---

## OWASP Top 10 (Web/API) — Mapped to SWEBOK

The OWASP Top 10 (2021) names the most critical security risks to web
applications and APIs. Each maps to one or more STRIDE categories and to
specific SDLC phases. Use this alongside STRIDE during threat modeling of
web-facing systems.

### A01: Broken Access Control

**Description:** Access control restrictions are not properly enforced — users
can act outside their intended permissions (access other users' data, perform
privileged operations, view unauthorized content).

**STRIDE mapping:** Elevation of Privilege; Information Disclosure.

**Primary mitigation:** Deny-by-default access control enforced server-side at
every request; authorization checks on every resource, not just navigation.
Automated testing of access control rules as part of the test suite.

**Detection technique:** DAST (crawl and attempt unauthorized access); manual
security-focused code review (check that every endpoint enforces authorization).

**SDLC phase:** Design (design the authorization model explicitly) + Testing
(verify with DAST and authorization-specific test cases).

---

### A02: Cryptographic Failures

**Description:** Failures related to cryptography (or its absence) that expose
sensitive data — weak algorithms, missing encryption, insecure key management,
sensitive data in logs or URLs.

**STRIDE mapping:** Information Disclosure.

**Primary mitigation:** Classify data by sensitivity; encrypt sensitive data at
rest and in transit using current NIST-recommended algorithms; never design
custom cryptographic schemes; audit all data paths for exposure.

**Detection technique:** Code review (identify where sensitive data is handled
and whether encryption is present and correct); SAST (detect known-weak
algorithm use).

**SDLC phase:** Design (choose encryption scheme; design key management) +
Construction (implement correctly; sanitize outputs).

---

### A03: Injection

**Description:** Attacker-controlled data is interpreted as commands or queries
by an interpreter — SQL, OS command, LDAP, XML, template, or other injection.

**STRIDE mapping:** Tampering; Elevation of Privilege.

**Primary mitigation:** Parameterized queries / prepared statements for all
database access; input validation against a strict allowlist at every trust
boundary; output encoding appropriate to the rendering context; avoid
constructing commands from user-controlled data.

**Detection technique:** SAST (identifies injection sinks and unsanitized data
flows to them); DAST (attempts injection payloads against running application).

**SDLC phase:** Construction (parameterized queries and input validation are
implementation-level controls) + Testing (SAST in CI, DAST in staging).

---

### A04: Insecure Design

**Description:** Missing or ineffective security controls resulting from design
decisions that did not consider threats — not implementation bugs but
architectural failures: no rate limiting, no fraud controls, no defense in depth.

**STRIDE mapping:** All STRIDE categories (insecure design can fail to address
any threat).

**Primary mitigation:** Threat modeling before design is finalized; security
design principles applied in architecture (least privilege, fail securely,
defense in depth, secure defaults); security requirements derived from the
threat model, not added after the fact.

**Detection technique:** Security-focused design review against the threat
model; architecture review checklist.

**SDLC phase:** Requirements (elicit security requirements) + Design (apply
security design principles; conduct threat model–driven design review).

---

### A05: Security Misconfiguration

**Description:** Insecure default configurations, incomplete configurations,
open cloud storage, verbose error messages, unnecessary features or services
enabled, missing security hardening.

**STRIDE mapping:** Elevation of Privilege; Information Disclosure.

**Primary mitigation:** Secure defaults in all configuration; automated
configuration hardening and compliance scanning (CIS Benchmarks, cloud security
posture management); infrastructure-as-code reviewed for misconfigurations;
remove or disable all unnecessary features, services, and accounts.

**Detection technique:** DAST (probe configuration exposures); infrastructure
scanning (cloud security posture management tools, container image scanning).

**SDLC phase:** Design (define the secure configuration baseline) + Operations
(enforce via configuration management and compliance scanning).

---

### A06: Vulnerable and Outdated Components

**Description:** Using components (libraries, frameworks, runtime environments,
operating systems) with known vulnerabilities — including components that are
no longer supported and will not receive patches.

**STRIDE mapping:** All STRIDE categories (a vulnerable component can be
exploited to cause any class of harm).

**Primary mitigation:** SCA (Software Composition Analysis) scanning in CI;
subscribe to CVE feeds for all dependencies; defined patch SLA by severity;
dependency pinning with verified checksums; SBOM generation per release.

**Detection technique:** SCA tools (Dependabot, Snyk, OWASP Dependency-Check,
Trivy for container images).

**SDLC phase:** Construction (pin and scan dependencies) + Operations
(monitor CVE feeds; patch within SLA).

---

### A07: Identification and Authentication Failures

**Description:** Weaknesses in how the system identifies and authenticates
users — weak passwords, missing MFA, insecure session management, credential
exposure, broken account recovery flows.

**STRIDE mapping:** Spoofing.

**Primary mitigation:** MFA for all human users with access to sensitive
functions; strong password policy with breach-password checking; secure session
management (random session IDs, short expiry, secure and HttpOnly cookie
flags); rate-limited login; secure account recovery (no security questions,
use secondary channel verification).

**Detection technique:** DAST (attempt credential stuffing, brute force, session
fixation); manual security review of authentication flow.

**SDLC phase:** Design (choose and design the authentication scheme) +
Construction (implement correctly; use proven libraries, not custom schemes).

---

### A08: Software and Data Integrity Failures

**Description:** Code and infrastructure that does not protect against integrity
violations — insecure deserialization, auto-updates without integrity
verification, CI/CD pipelines that can be modified by untrusted actors,
unsigned build artifacts.

**STRIDE mapping:** Tampering.

**Primary mitigation:** Code signing for build artifacts and software updates;
verify integrity before consuming any deserialized data; CI/CD pipeline
access control; SBOM and dependency pinning with checksum verification;
do not deserialize data from untrusted sources without strict schema validation.

**Detection technique:** SAST (identify unsafe deserialization patterns);
CI/CD security review; supply chain audit.

**SDLC phase:** Design (design the update and build pipeline with integrity
controls) + Operations (maintain signed artifact distribution; monitor
dependency integrity).

---

### A09: Security Logging and Monitoring Failures

**Description:** Insufficient logging and monitoring — the system does not
record security-relevant events, alerts are not configured, logs are not
reviewed, and breaches go undetected.

**STRIDE mapping:** Repudiation (insufficient logging enables denial of
actions); all categories (monitoring failures allow ongoing attacks).

**Primary mitigation:** Log all security-relevant events (authentication,
authorization, input validation failures, privilege changes); protect log
integrity; configure alerts on anomalous patterns; establish incident response
procedures and test them.

**Detection technique:** Manual review of logging configuration against
requirements; penetration testing to confirm whether attacks are detected.

**SDLC phase:** Design (specify what to log and how) + Operations (configure
monitoring, alerting, and incident response).

---

### A10: Server-Side Request Forgery (SSRF)

**Description:** The application can be induced to make server-side HTTP
requests to an attacker-specified destination — often used to reach internal
services, cloud metadata endpoints, or other resources protected by network
controls that the application server can bypass.

**STRIDE mapping:** Elevation of Privilege; Information Disclosure.

**Primary mitigation:** Validate and allowlist all URLs the application fetches
on behalf of users; block requests to internal IP ranges (RFC 1918), loopback,
and cloud metadata endpoints (169.254.169.254); use an egress proxy with an
allowlist of permitted external destinations.

**Detection technique:** DAST (attempt SSRF payloads against URL-accepting
inputs); code review (locate all outbound HTTP calls with user-influenced URLs).

**SDLC phase:** Design (design egress controls and URL allowlisting) +
Construction (implement URL validation and allowlisting at all outbound call
sites) + Testing (DAST with SSRF payloads).

---

## Domain-Specific Threat Considerations

Standard STRIDE and OWASP coverage is necessary but not sufficient for these
deployment contexts. Augment the threat model with the considerations below
when the system involves any of these domains.

### Container and Cloud Security

Cloud and containerized deployments introduce a distinct class of threats
that arise from the platform itself:

- **Image vulnerabilities** — container images contain OS packages and runtime
  components that accumulate CVEs over time. An unscanned or outdated base
  image can contain critical vulnerabilities that exist below the application
  layer. Scan images in CI and at runtime; use minimal base images (distroless
  or Alpine); rebuild images regularly.
- **Misconfigured IAM** — over-permissioned service accounts, roles, and
  instance profiles are the primary vector for privilege escalation in cloud
  environments. Every workload should have a dedicated IAM role with only the
  permissions it actually uses. Audit IAM policies against the principle of
  least privilege using cloud security posture management (CSPM) tools.
- **Exposed metadata endpoints** — cloud providers expose instance metadata
  (including IAM credentials) via a link-local HTTP endpoint (169.254.169.254).
  An SSRF vulnerability or a misconfigured container can allow an attacker to
  retrieve these credentials. Block metadata endpoint access at the network
  policy level where possible; use IMDSv2 (which requires a PUT-based session
  token) on AWS.
- **Secret sprawl** — secrets injected as environment variables can leak into
  process listings, crash dumps, and logging systems. Prefer secrets mounted
  as files from a secrets store; ensure crash reporting excludes environment
  variables; rotate secrets frequently.
- **Network policy gaps** — without explicit network policies, all pods or
  services in a cluster can communicate with each other, enabling lateral
  movement after initial compromise. Define and enforce network policies
  (Kubernetes NetworkPolicy, AWS Security Groups, GCP VPC firewall rules)
  restricting east-west traffic to what is required.
- **Container escape** — vulnerabilities in the container runtime or
  misconfigured privilege settings (running as root, privileged containers,
  host path mounts, hostNetwork/hostPID) can allow an attacker who compromises
  a container to escape to the host. Run containers as non-root; avoid
  privileged mode; use seccomp profiles and AppArmor/SELinux where available.

### IoT Software

IoT systems face threats that arise from the intersection of constrained
hardware, physical accessibility, and long deployment lifespans:

- **Fixed or default credentials** — IoT devices shipped with hardcoded or
  default credentials (admin/admin, root/root) and no forced change mechanism
  are trivially compromised at scale. Require unique per-device credentials
  generated at manufacturing; enforce credential change on first use.
- **Unencrypted firmware** — firmware that is transmitted or stored without
  encryption can be extracted, analyzed for vulnerabilities, and modified.
  Encrypt firmware images; sign them; verify signatures on the device before
  execution.
- **Physical access threats** — an attacker with physical access to a device
  can extract firmware via JTAG/UART debug interfaces, read storage directly,
  or replace firmware entirely. Disable debug interfaces in production firmware
  or protect them with authentication; use secure boot with hardware root
  of trust.
- **Update mechanism security** — unsigned or unauthenticated firmware updates
  allow an attacker who can intercept or modify update delivery to install
  malicious firmware at scale. Sign all firmware updates; verify signatures
  on-device before applying; use TLS for update delivery; ensure the update
  mechanism itself is not exploitable (no command injection in update scripts).
- **Long deployment lifespan** — IoT devices may be deployed for 10+ years
  without regular updates, outliving the support lifecycle of their embedded
  components. Design for updateability from the start; establish a support
  and end-of-life policy; consider the cryptographic algorithm lifetime
  relative to the deployment period.

### ML and AI Systems

ML systems introduce threats that do not map cleanly onto traditional
application security frameworks:

- **Data poisoning** — an attacker who can influence the training data can
  introduce biases, backdoors (specific inputs that trigger specific outputs),
  or degrade model performance on targeted inputs. Validate and audit training
  data provenance; monitor for distribution shifts; implement data integrity
  checks in training pipelines; restrict write access to training data stores.
- **Model extraction** — repeated queries to a model API can allow an attacker
  to reconstruct a functionally equivalent model, bypassing access controls,
  licensing, or competitive protection. Rate-limit and monitor model inference
  APIs; add query watermarking; restrict the detail level of confidence scores
  returned to callers.
- **Adversarial inputs** — inputs crafted to cause misclassification or
  unexpected behavior (adversarial examples) can bypass fraud detection,
  image classification, or content moderation systems. Conduct adversarial
  robustness testing as part of the security test plan; apply input
  preprocessing to reduce adversarial effectiveness where feasible.
- **Training data privacy** — models can memorize and reproduce training data,
  enabling an attacker to extract private information (PII, trade secrets,
  confidential documents) from the model through inference. Apply differential
  privacy during training; audit for memorization; treat model access as data
  access for regulatory purposes (GDPR, HIPAA) when the training data contains
  personal information.
- **Prompt injection (for LLM-based systems)** — in systems where user input
  is included in prompts to a language model, an attacker can craft inputs
  that override system instructions, exfiltrate context, or cause the model
  to take unintended actions. Treat prompt injection as a trust boundary
  issue: user-supplied content must be sandboxed from system instructions;
  outputs must be validated before being used in consequential actions.
