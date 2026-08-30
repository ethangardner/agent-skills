# Variations

Read this when the user asks for one of these, or when a single plain round
isn't the right shape for what they brought.

## Larger org map

The source material's min-spec allows three to seven functional groups. For a
solo session, four is usually the ceiling before the fishbowl turns into a
queue of monologues the user has to track — but if the user's situation
genuinely spans five or more functions (a launch, a reorg, an incident
retro), it's worth running the larger cast rather than forcing it down to
four and losing a function that matters.

To do this without the session collapsing into noise:

- Cast every function in Phase 1, but in Phase 2 have the user address
  requests to them in a fixed order, one at a time, rather than dumping the
  whole list at once. Answer each persona's response before moving to the
  next function — resolve pairs, don't batch.
- Watch for coalitions. With five or more personas, two or three will
  naturally share an incentive (Finance and Legal both want the same
  guardrail, for different reasons) and will start referencing each other's
  answers. Let that happen — it's realistic and it's information — but don't
  let it turn into the personas debating each other instead of answering the
  user.
- The reversal (Phase 4) gets long fast with five-plus personas. It's fine to
  compress it: each persona states their ask in one sentence, and the user
  answers all of them in a single pass rather than a full back-and-forth per
  persona. Say so before starting the phase so the user knows the format
  changed.
- Integration (Phase 5) is where a large cast earns its keep — this is the
  point where the host should explicitly flag any two agreements that
  conflict with each other (a commitment made to Function A that Function B's
  agreement now makes hard to keep). That conflict is exactly the kind of
  thing WINFY exists to surface before it becomes a live problem.

## Renegotiation round

Use this when the user wants to revisit a standing agreement — theirs or a
persona's — that's gone stale: a commitment made months ago that's no longer
being honored, quietly slipping, or was never really tested.

Setup: ask the user what the original agreement was, who it was between, and
what's changed since — on either side — that makes it worth reopening. Recast
the relevant persona with their *current* constraints, not the ones that were
true when the original deal was struck. This matters: a persona renegotiating
under old assumptions produces a fake session. If the Engineering lead's
original yes-if was tied to a roadmap that's since shipped, that condition is
gone and the persona's position has probably moved.

Run it as a compressed version of Phases 2 through 4: the user states
whether they're renewing, changing, or ending the original ask; the persona
responds with the same yes / no / yes-if discipline, explicitly referencing
what's different now; then reverse it, since the persona's original ask may
also be stale on their side. Skip Phase 0's full intake — the context is the
history of the agreement, not a fresh situation — but do ask what changed,
since that's the entire content of a renegotiation round.

End by having the host state the new agreement explicitly, next to the old
one, so the user has both versions rather than a vague sense that "we talked
about it and updated things."

## Fully synthetic mode

Not recommended as a default, but available if the user wants to stress-test
how a request would land before raising it for real: the user supplies the
situation and the request, and instead of playing themselves, asks the LLM to
also play a persona for their *own* function, so the user can watch two
invented sides negotiate rather than participating.

This loses the entire point of WINFY, which is the user practicing making
and answering real commitments under their own name. Only run it if the user
explicitly wants to observe rather than practice — and say so before starting,
the way Troika's synthetic mode calls out what's lost when the user opts out
of being the one on the receiving end.
