# Stakeholders and Concerns

A **concern** is any stakeholder interest in the system — anything that could
influence it in its environment. The point of cataloging concerns explicitly is
that _what is fundamental to the architecture changes with whose concern you're
addressing_. Miss a stakeholder class and you'll miss the concerns that would
have driven a whole view.

## Stakeholder → concern starting map

Use this to make sure you've covered the major roles. It's a prompt, not a
ceiling — real systems have more.

| Stakeholder                     | Typical concerns                                                                        |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| Customer / sponsor              | Cost to build and operate, schedule, time-to-market, ROI, affordability                 |
| Users                           | Functionality, usability, user experience, accessibility                                |
| Designers / programmers         | Feasibility, whether design meets requirements, modifiability, modularity, buildability |
| Testers / QA                    | Testability, observability, reproducibility                                             |
| Operators / SRE                 | Deployability, resource utilization, availability, monitorability, disposability        |
| Security / safety owners        | Security, safety, information assurance, privacy, compliance                            |
| Compliance / legal / regulatory | Regulatory fit, auditability, data residency                                            |
| Maintainers / future teams      | Evolvability, extensibility, comprehensibility, reverse-architecting support            |
| Business / product              | Business goals & strategy, agility, openness, product-line variability                  |
| Society / environment           | Energy efficiency, sustainability                                                       |

## Classify every concern

Same taxonomy as requirements:

- **Functional** — what the system must do.
- **Non-functional / quality attribute** ("ility") — how well it must do it.
- **Constraint** — a fixed boundary on the solution (tech mandate, standard,
  budget, regulation).

Also watch for:

- **Emergent properties** — properties of the whole, which may be _desired_
  (e.g. resilience) or _prohibited_ (e.g. a deadlock state, a data-leak path).
  These don't live in any single element and are easy to miss.

## Concerns are not static

Concerns evolve over the life cycle and as the world changes — technologies,
policies, regulations, and social expectations shift. Energy efficiency and
sustainability are the canonical recent example: largely absent from older ADs,
now first-class. When eliciting, ask _which concerns are likely to grow_ and
note them, so the architecture's principles of evolution account for them.

## Concern checklist (sweep for missed classes)

Scan this list when eliciting; it's the SWEBOK examples-of-concerns set. Don't
include all of these in an AD — use it to catch a concern class you forgot to
ask about.

affordability · agility · assurance · autonomy · availability · behavior ·
business goals & strategies · complexity · compliance with regulation ·
concurrency · control · cost · data accessibility · deployability ·
disposability · energy efficiency · evolvability · extensibility · feasibility ·
flexibility · functionality · information assurance · inter-process
communication · interoperability · known limitations · maintainability ·
modifiability · modularity · openness · performance · privacy ·
quality of service · reliability · resource utilization · reusability · safety ·
scalability · schedule · security · system modes · software structure ·
subsystem integration · sustainability · system features · testability ·
usability · usage · user experience

## From concern to view

Each significant concern should drive at least one view (see
`viewpoints.md`). Build the coverage table both directions:

- **Forward**: for each concern, which viewpoint addresses it?
- **Backward**: for each proposed view, which concern justifies it? Drop views
  with no concern behind them.

An orphaned concern (no view) is a documentation gap. An orphaned view (no
concern) is wasted effort that adds maintenance burden and reader load.
