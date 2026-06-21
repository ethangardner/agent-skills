---
name: swebok-operations
description: >-
  Plan, review, or improve software operations using the availability,
  observability, and controlled-change discipline from SWEBOK V4 Chapter 6.
  Use this whenever the work involves keeping software running correctly in
  production — e.g. "deployment strategy", "release planning", "rollback
  strategy", "rollback plan", "incident management", "monitoring strategy",
  "capacity planning", "disaster recovery", "DR plan", "SLA definition",
  "on-call process", "change management in production", "operational runbook",
  "container deployment", "production readiness review", "PRR", "operational
  acceptance", "operational testing", "problem management", "service
  continuity", "backup strategy", "failover", "observability", "alerting",
  "deployment pipeline operations". Trigger even when the user just says
  "how do I deploy this safely", "what should I monitor", or "write a runbook"
  — the discipline of intentional failure management and designed-in
  observability applies, not just one-off deployment steps.
---

# Software Engineering Operations

Operations is the engineering discipline that keeps software running correctly
over time in its production environment. It is not "what happens after
development" — it is a set of engineering decisions and processes that must be
designed before deployment and maintained indefinitely. The dominant failure
mode is not technical: it is assuming that operational concerns can be deferred
until "after launch."

Three ideas drive everything below:

1. **Operations is intentional failure management.** Production systems fail.
   The engineering question is not how to achieve zero failure but how to
   minimize mean time to detection (MTTD) and mean time to recovery (MTTR).
   Every operational decision is a tradeoff in this space.
2. **Observability must be designed in.** A system you cannot observe cannot be
   operated. Logs, metrics, traces, and health checks must be specified as
   requirements and implemented alongside features, not added after incidents
   reveal their absence.
3. **Every operational procedure is a risk tradeoff.** Deployment frequency,
   rollback triggers, maintenance windows, redundancy levels, and backup
   frequency each trade off availability, cost, and change velocity. Make these
   tradeoffs explicitly, not by default.

## When NOT to over-apply this

A personal project or internal tool with no SLA and no users other than the
author doesn't need a full operational readiness review. The discipline earns
its keep when others depend on the system's availability or when data loss has
consequences. State the scaling decision rather than silently defaulting to
maximal.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Assess operational context

Identify: SLA commitments (availability, response time, RTO/RPO), criticality
(what is the business impact of an outage?), team capabilities and on-call
rotation, the toolchain (deployment platform, monitoring stack, incident
management system), and regulatory constraints (data residency, audit logging
requirements).

The operational context determines what is proportionate. A 99.9% availability
target (~8.7 hours downtime/year) implies a very different redundancy and
on-call posture than 99.99% (~52 minutes/year). Establish the target before
designing the procedures to meet it; don't reverse-engineer targets from
whatever infrastructure is already in place.

### 2. Define availability and continuity posture

Set explicit availability targets and design the redundancy model
(active-active, active-passive, geographic distribution) to match. Define RTO
(Recovery Time Objective — how long can the system be down?) and RPO (Recovery
Point Objective — how much data can be lost?). Design backup, disaster
recovery, and failover procedures to meet these targets.

Backup and DR procedures are only as reliable as the last time they were
tested. Schedule and record test executions; untested recovery procedures are
not operational assets.

### 3. Design the deployment and release pipeline

Choose a deployment strategy appropriate to the risk tolerance and change
frequency:

- **Rolling** — instances are updated incrementally; always-on but with
  temporarily mixed versions in flight.
- **Blue-green** — two identical environments; traffic switches atomically;
  rollback is an immediate traffic switch.
- **Canary** — a small fraction of traffic routes to the new version first;
  risk is bounded but the observation period adds deployment cycle time.
- **Feature flags** — code ships decoupled from activation; enables instant
  disable without redeployment.

Define change management: who approves production changes, how rollbacks are
triggered, what constitutes a failed deployment. Design data migration
procedures for schema changes before they are needed, not at deployment time.

### 4. Establish monitoring and incident response

Define what to monitor: service health, error rate, latency (p50/p95/p99),
resource utilization, and business-level metrics (conversion rates, job
completion counts) that reflect real user impact. Set alert thresholds with
escalation criteria — an alert with no escalation path is noise.

Write runbooks for the most likely incidents before those incidents occur. A
runbook written under incident pressure is a runbook written badly. Define the
incident management process: detection → declaration → response → resolution
→ post-mortem. Distinguish incident management (restore service) from problem
management (eliminate the root cause so the incident does not recur).

### 5. Plan for capacity and scaling

Forecast demand growth. Define scaling triggers (CPU, memory, queue depth,
request rate). Design the scaling response (manual vs. auto-scaling, horizontal
vs. vertical). Identify resource bottlenecks before they become incidents.

Capacity planning is not a one-time activity: revisit it on a regular cadence
and after any significant change in usage patterns. Load test at least at 2×
expected peak before a major launch; resource saturation under load is one of
the most predictable incident types and one of the most avoidable.

## Output format

Unless the user asks for something else, use this structure. Adapt depth to
the service's availability requirements and team size.

```
# Operational Readiness Checklist: <System / Service>

## Availability posture
- [ ] SLA target defined: ___% (implies ___ downtime/year)
- [ ] RTO defined: ___
- [ ] RPO defined: ___
- [ ] Redundancy model: [active-active / active-passive / single-instance]
- [ ] Backup procedure documented and tested
- [ ] Disaster recovery procedure documented and tested
- [ ] Failover tested: [ ] yes / [ ] no

## Deployment
- [ ] Deployment strategy: [rolling / blue-green / canary / feature flag]
- [ ] Rollback procedure documented: ___
- [ ] Rollback tested: [ ] yes / [ ] no
- [ ] Change approval process: ___
- [ ] Data migration procedure: ___

## Observability
- [ ] Health check endpoints: ___
- [ ] Key metrics defined and dashboarded: ___
- [ ] Log aggregation configured: ___
- [ ] Distributed tracing (if applicable): ___
- [ ] Alerts defined for: error rate, latency, resource saturation, availability

## Incident management
- [ ] On-call rotation defined
- [ ] Escalation path documented
- [ ] Runbooks written for top N incident types
- [ ] Incident severity levels defined
- [ ] Post-mortem process defined

## Capacity
- [ ] Current capacity baseline established
- [ ] Scaling triggers defined
- [ ] Scaling mechanism: [manual / auto-scaling]
- [ ] Load tested at 2× expected peak

---

# Incident Runbook Template: <Incident Type>

## Detection
- Alert: ___
- Symptoms: ___

## Impact
- Affected components: ___
- User impact: ___

## Initial response
1. ___
2. ___

## Diagnostic steps
1. ___

## Resolution options
- Option A: ___
- Option B (rollback): ___

## Escalation
If not resolved in ___ minutes → escalate to ___

## Post-incident
- [ ] Root cause identified
- [ ] Action items created
- [ ] Monitoring updated
```

## Reviewing an existing operational setup (instead of designing one)

When the task is to critique or evaluate rather than design, run the workflow
as a checklist against what exists:

1. Is there an explicit SLA with defined availability, RTO, and RPO? An
   implicit SLA is an SLA that will be violated without warning.
2. Is the deployment strategy documented? Has rollback been tested — not just
   documented as possible, but actually executed?
3. Can operators answer "is the system healthy right now?" from dashboards
   alone, without reading logs or querying databases?
4. Is there a defined escalation path for incidents at each severity level?
5. Are runbooks written before incidents, or only after? Post-incident runbooks
   are retrospective documentation, not operational preparation.
6. Has disaster recovery actually been tested? Documentation of an untested
   procedure is a hypothesis, not an assurance.
7. Is there a capacity plan, or does capacity grow reactively after incidents?
8. Is there a defined problem management process for recurring incidents, or
   does the same incident type get resolved repeatedly without root cause
   elimination?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Availability** — the proportion of time a system is in a functioning state;
  typically expressed as a percentage (99.9%, "three nines").
- **RTO (Recovery Time Objective)** — the maximum acceptable time for a system
  to be unavailable following a failure.
- **RPO (Recovery Point Objective)** — the maximum acceptable amount of data
  loss measured in time (how old can the most recent recoverable backup be?).
- **MTTD (Mean Time to Detection)** — the average time from when a failure
  occurs to when it is detected by operations.
- **MTTR (Mean Time to Recovery)** — the average time from when a failure is
  detected to when the system is restored to normal operation.
- **Incident** — an unplanned interruption to service or reduction in service
  quality.
- **Problem** — the root cause underlying one or more incidents; the distinction
  between incident management (restore service) and problem management
  (eliminate root cause) is operationally critical.
- **Deployment** — the act of making a new version of software available in the
  target environment.
- **Runbook** — a documented set of procedures for responding to a specific
  operational event or incident.
- **Change management** — the process of controlling changes to production
  systems to minimize risk.
- **Observability** — the degree to which the internal state of a system can be
  inferred from its external outputs; operationalized through logs, metrics,
  and traces.
