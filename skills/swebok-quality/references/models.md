# Quality Characteristic Catalog

Based on ISO/IEC 25010:2011 (SQuaRE — Systems and software Quality Requirements
and Evaluation). This catalog is used during quality planning (workflow step 2)
to select which quality characteristics apply to a given product and to define
measurable targets and measurement approaches for each.

**How to use this catalog**

1. Read the "Prioritize when" guidance for each characteristic.
2. Select the characteristics most relevant to this product and context.
3. For each selected characteristic, choose the sub-characteristics to evaluate.
4. Define a measurable metric and target for each selected sub-characteristic.
5. Identify the tool class(es) that will produce the measurement.

Not all characteristics require equal attention on every product. A real-time
embedded system prioritizes performance efficiency and reliability. An enterprise
web application prioritizes usability, maintainability, and security. Be
explicit about which characteristics are in scope and which are deliberately
deferred.

---

## 1. Functional Suitability

_Degree to which the product provides functions that meet stated and implied
needs when used under specified conditions._

**Sub-characteristics**

- **Functional completeness** — the degree to which the set of functions covers
  all specified tasks and user objectives. Are all required functions present?
- **Functional correctness** — the degree to which the product provides correct
  results with the needed degree of precision. Do the functions produce the
  right outputs?
- **Functional appropriateness** — the degree to which functions facilitate the
  accomplishment of specified tasks and objectives. Are the functions designed
  in a way that actually helps users do what they need to do?

**Example metrics**

- Requirements traceability coverage: percentage of requirements covered by at
  least one test case
- Functional test pass rate: percentage of acceptance test cases passing
- Unimplemented function count at release

**Tool classes**

- Requirements traceability tools (Jira, Azure DevOps, Polarion)
- Acceptance test frameworks (Cucumber, FitNesse, Robot Framework)
- Requirements coverage analyzers

**Prioritize when** — correctness and completeness are primary concerns:
safety-critical systems, business-critical transaction systems, systems that
replace manual processes with contractual precision requirements, or any system
where a missing function is a compliance violation rather than a usability gap.

---

## 2. Performance Efficiency

_Performance relative to the amount of resources used under stated conditions._

**Sub-characteristics**

- **Time behavior** — response and processing times; throughput rates under
  stated conditions. How fast does the system respond?
- **Resource utilization** — amounts and types of resources used during
  operation: CPU, memory, network bandwidth, disk I/O. How much does the system
  consume?
- **Capacity** — the maximum limits the product can reach: transactions per
  second, concurrent users, maximum record count, storage limits. What are the
  ceiling constraints?

**Example metrics**

- Response time at P50 / P95 / P99 under target load (milliseconds)
- Throughput at target load (transactions per second)
- CPU and memory utilization at target load (percentage)
- Maximum concurrent users sustained within response time SLA
- Storage growth rate (GB/month)

**Tool classes**

- Load and performance testing: JMeter, Locust, Gatling, k6
- Application performance monitoring (APM): Datadog, New Relic, Dynatrace,
  Grafana
- Profilers: language-specific (async-profiler, py-spy, pprof)
- Infrastructure monitoring: Prometheus, CloudWatch

**Prioritize when** — user experience is response-time sensitive; the system
must scale under variable load; resource costs are significant at scale; the
system has SLA commitments with measurable latency or availability targets;
or the system processes time-constrained data (real-time, streaming, embedded).

---

## 3. Compatibility

_Degree to which two or more systems can exchange information and/or perform
required functions while sharing the same hardware or software environment._

**Sub-characteristics**

- **Co-existence** — the degree to which the product can perform its required
  functions efficiently while sharing a common environment and resources with
  other products, without detrimental impact on any other product.
- **Interoperability** — the degree to which two or more systems can exchange
  information and use the information that has been exchanged.

**Example metrics**

- Interface compliance test pass rate: percentage of defined interface contracts
  passing automated conformance tests
- Protocol conformance: pass/fail against applicable protocol standard test
  suite
- Platform co-deployment success rate: percentage of target platform
  combinations on which the product installs and operates without conflict

**Tool classes**

- API conformance testing: Dredd, Postman/Newman, Pact (contract testing)
- Integration test suites (project-specific)
- Protocol analyzers and conformance test suites (standard-specific)

**Prioritize when** — the system integrates with external systems, third-party
APIs, or government/industry data exchanges; standards compliance is a
contractual or regulatory obligation; the product must co-deploy on shared
infrastructure alongside other software without interference; or the system
must interoperate with systems not under the team's control.

---

## 4. Usability

_Degree to which the product can be used by specified users to achieve
specified goals with effectiveness, efficiency, and satisfaction in a specified
context of use._

**Sub-characteristics**

- **Appropriateness recognizability** — the degree to which users can recognize
  whether the product is appropriate for their needs from first contact.
- **Learnability** — the degree to which users can learn to use the product
  effectively, efficiently, and without risk within a specified time.
- **Operability** — the degree to which the product has attributes that make it
  easy to operate and control.
- **User error protection** — the degree to which the system protects users
  against making errors: input validation, confirmation dialogs, undo
  capability.
- **User interface aesthetics** — the degree to which the interface enables
  pleasing and satisfying interaction for the user.
- **Accessibility** — the degree to which the product can be used by people
  with the widest range of characteristics and capabilities, including those
  with disabilities.

**Example metrics**

- Task success rate (percentage of users completing a defined task without
  assistance)
- Time on task (minutes for a defined task under usability test conditions)
- Error rate (number of errors per user per task)
- System Usability Scale (SUS) score (target: ≥ 68 is above average)
- WCAG 2.1 conformance level (A / AA / AAA — specify which level is required)
- Net Promoter Score or CSAT (for satisfaction)

**Tool classes**

- Usability testing and session recording: Maze, UserTesting, Hotjar,
  FullStory
- Accessibility scanners: Axe, Lighthouse (Google), WAVE, NVDA (screen reader
  testing)
- A/B and multivariate testing: Optimizely, LaunchDarkly
- Analytics: Mixpanel, Amplitude (for task completion and funnel analysis)

**Prioritize when** — the system has broad or non-technical user populations;
onboarding cost or user adoption is a business risk; regulatory accessibility
requirements apply (Section 508, EN 301 549, WCAG); the system is a consumer
product where user experience is a differentiator; or high user error rates
have safety or compliance implications.

---

## 5. Reliability

_Degree to which a system performs specified functions under specified
conditions for a specified period of time._

**Sub-characteristics**

- **Maturity** — the degree to which the system meets reliability needs under
  normal operation: defect-free behavior in expected usage conditions.
- **Availability** — the degree to which the system is operational and
  accessible when required for use.
- **Fault tolerance** — the degree to which the system operates as intended
  despite the presence of hardware or software faults, or invalid inputs.
- **Recoverability** — the degree to which the system can recover data and
  re-establish its desired state after interruption or failure.

**Example metrics**

- Availability: (uptime / total time) × 100% — target typically expressed as
  an SLA (e.g., 99.9% = 8.7 hours downtime/year)
- Mean Time Between Failures (MTBF): average time between system failures
- Mean Time To Recovery (MTTR): average time to restore service after failure
- Error rate under normal conditions: errors per 1,000 requests
- Recovery Point Objective (RPO): maximum acceptable data loss
- Recovery Time Objective (RTO): maximum acceptable downtime

**Tool classes**

- Chaos engineering: Chaos Monkey, Gremlin, Chaos Mesh
- SLO / SLA monitoring: Datadog SLOs, Google Cloud SLOs, PagerDuty
- Redundancy and failover testing (environment-specific)
- Synthetic monitoring: Pingdom, Checkly, Uptime Robot

**Prioritize when** — downtime carries significant financial, operational, or
reputational cost; safety or mission continuity is required; SLA commitments
are contractual; the system handles transactions where data loss is
unacceptable; or the system operates in environments with unreliable
infrastructure (embedded, distributed, edge).

---

## 6. Security

_Degree to which a product or system protects information and data so that
persons or other products or systems have the degree of data access appropriate
to their types and levels of authorization._

**Sub-characteristics**

- **Confidentiality** — data accessible only to those authorized to access it.
- **Integrity** — the system and its data are unaltered by unauthorized parties
  or processes.
- **Non-repudiation** — actions or events can be proven to have taken place,
  so they cannot be denied later.
- **Accountability** — actions of a user can be traced uniquely to that user.
- **Authenticity** — the identity of a subject or resource can be proved to be
  the one claimed.

**Example metrics**

- Vulnerability count by severity (Critical / High / Medium / Low — per CVSS)
- Mean time to remediate CVEs by severity class
- Penetration test findings count and severity distribution
- Authentication failure rate and anomaly detection rate
- Percentage of dependencies with known vulnerabilities (SCA finding rate)

**Tool classes**

- SAST (static application security testing): Semgrep, SonarQube, Bandit,
  CodeQL
- DAST (dynamic application security testing): OWASP ZAP, Burp Suite
- SCA (software composition analysis): Snyk, Dependabot, OWASP Dependency-Check
- Penetration testing: manual or automated (Metasploit, Nessus)
- Secrets scanning: TruffleHog, GitLeaks, GitHub secret scanning

See also: swebok-security for the threat modeling and hardening workflow.

**Prioritize when** — the system handles sensitive, personal, financial, or
health data; regulatory compliance applies (GDPR, HIPAA, PCI-DSS, FedRAMP);
the system is publicly accessible; the system manages authentication or
authorization for other systems; or a breach carries legal, financial, or
safety consequences.

---

## 7. Maintainability

_Degree of effectiveness and efficiency with which a product or system can be
modified to improve it, correct it, or adapt it to changes in environment and
requirements._

**Sub-characteristics**

- **Modularity** — composed of discrete components such that a change to one
  component has minimal impact on other components.
- **Reusability** — the degree to which an asset can be used in more than one
  system, or in building other assets.
- **Analyzability** — the degree of effectiveness and efficiency with which it
  is possible to assess the impact of an intended change on the product, or
  to diagnose deficiencies or causes of failures.
- **Modifiability** — the degree to which the product can be effectively and
  efficiently modified without introducing defects or degrading existing quality.
- **Testability** — the degree to which criteria can be established for the
  product and tests can be performed to determine whether those criteria have
  been met.

**Example metrics**

- Cyclomatic complexity per function (target: ≤ 10 per function; ≤ 15 is
  tolerable; > 20 is a refactoring candidate)
- Coupling metrics: efferent / afferent coupling, instability index
- Test coverage: line, branch, and/or mutation coverage (target depends on
  criticality — 80% line coverage is a common floor)
- Change failure rate: percentage of changes that result in a defect or
  rollback (DORA metric)
- Mean time to implement a defined change (lead time for changes)

**Tool classes**

- Static analysis: SonarQube, CodeClimate, NDepend, ArchUnit
- Test coverage: JaCoCo, Istanbul/nyc, Coverage.py, go test -cover
- Complexity analyzers: lizard, radon, plato
- Dependency analysis: Dependency-Track, language-specific tools

**Prioritize when** — the system has a long expected lifetime; a large or
distributed team works on it; the change rate is high; technical debt reduction
is a priority; or onboarding new developers must be efficient. Maintainability
is frequently the most under-measured characteristic — and the one whose debt
compounds most damagingly over time.

---

## 8. Portability

_Degree of effectiveness and efficiency with which a system can be transferred
from one hardware, software, or other operational or usage environment to
another._

**Sub-characteristics**

- **Adaptability** — the degree to which the product can effectively and
  efficiently be adapted for different or evolving hardware, software, or other
  operational or usage environments.
- **Installability** — the degree of effectiveness and efficiency with which
  the product can be successfully installed and/or uninstalled in a specified
  environment.
- **Replaceability** — the degree to which the product can replace another
  specified software product for the same purpose in the same environment.

**Example metrics**

- Platform coverage in test matrix: number of distinct OS / runtime / hardware
  combinations validated
- Installation success rate: percentage of installation attempts that complete
  without error on target platforms
- Configuration surface area: number of environment-specific parameters
  requiring modification between deployments
- Migration test pass rate: percentage of data or state successfully migrated
  from predecessor system

**Tool classes**

- Cross-platform test matrices: GitHub Actions matrix strategy, GitLab CI
  parallel jobs, Tox (Python)
- Containerization: Docker, OCI-compliant runtimes
- Infrastructure-as-code linting: tflint, checkov, cfn-lint
- Installation testing: automated install/uninstall test suites, Vagrant for
  environment simulation

**Prioritize when** — the product is packaged for distribution to end users
on heterogeneous environments; multi-platform deployment is a stated
requirement; the system is replacing a legacy system and must accept migrated
data or configurations; or the deployment environment is expected to change
over the product's lifetime (cloud provider changes, OS upgrades,
containerization migration).
