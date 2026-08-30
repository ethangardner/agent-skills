# Variations

Read this when the user asks for one of these modes, brings more than one
challenge, or when you're deciding whether Wise Crowds is even the right
structure for what they brought.

## Troika vs. Wise Crowds — which one

Both are overheard, third-person consultation. Neither has the client
answering back mid-consultation. The choice between them isn't about that —
it's about scale and payoff.

- **Reach for Troika** when the user has an everyday problem, wants a fast
  answer, or would be well served by one clean disagreement between two
  consultants. It's the leaner structure and most challenges don't need more
  than it gives.
- **Reach for Wise Crowds** when the challenge is bigger, more consequential,
  or genuinely contested enough that a two-person panel would flatten it —
  and when the user would benefit from hearing not just what the group
  concluded but *how* the group arrived there. The satellite layer is the
  tell: if "here's what a couple of outside observers noticed about this
  conversation" sounds useful to the user, that's a Wise Crowds session, not
  a Troika with extra chairs.
- **Don't run Wise Crowds just because the user says "get me more opinions."**
  More opinions on the same axis is still Troika, scaled up badly — three
  consultants who all disagree along one dimension produce a longer version
  of the same disagreement two would have had. Wise Crowds is worth its
  extra length when the *coalitions* would be informative (who ends up
  agreeing with whom) and when a second, different kind of attention — on
  the conversation, not the problem — would surface something the content
  layer can't.
- **If genuinely unsure, default to Troika.** It's cheaper to run and easy to
  escalate: if the first round leaves the user wanting more voices or wanting
  to know how the discussion itself went, offer to re-run it as Wise Crowds
  rather than trying to guess upfront.

## Round-robin for multiple clients

The original's natural shape: up to two or three clients, each getting a full
round, with the same central consultants and satellite observers carrying
over between rounds. Run each client's Phase 0 through Phase 6 as a complete
unit before starting the next client's Phase 0 — don't interleave them.

Keep the panel constant across clients rather than recasting each round. A
consultant or satellite observer who has now heard two people's challenges
starts making connections between them ("this is the third time someone's
described a manager who won't name the actual constraint"), and that
cross-round pattern-spotting is one of the things a multi-client session
produces that a single round can't. If the user brings unrelated challenges
and explicitly wants fresh eyes each time, recast — but that's the exception,
not the default.

Between clients, a one-line transition is enough: name the next client's
challenge and move straight into Phase 1 for it. Don't re-explain the
structure.

## Fully synthetic mode

No human client. The user supplies a challenge and a brief; Claude plays
everyone — host, consultants, satellites, and the client.

Setup: ask the user for the challenge and whatever the client would know —
constraints, history, what's been tried, what the client believes is true
(including anything that's wrong). Invent a Client persona from that brief
and keep it in character throughout, blind spots included. If the brief says
the client is convinced the problem is a specific coworker, the Client
persona holds that conviction, and the consultants and satellites both get to
notice it — the consultants in what they conclude, the satellites in what
they flag about how readily the room accepted that framing.

Run all phases with no stops. Length grows substantially — the Client's
answers in Phase 0 and Phase 6 are now generated content instead of user
input, on top of an already longer central consultation and a distinct
satellite phase.

This earns its keep for stress-testing a decision the user has already made
but doesn't want to be the one defending, or for previewing how a real
consultation might land before bringing a real challenge to a real group. It
loses the two things that make a live session sharper: the enforced silence
doing something to an actual person, and the satellite layer's read on a real
client's real reactions, which it can only simulate. Say so if the user seems
to be reaching for synthetic mode specifically to avoid being on the
receiving end of the observations — that avoidance is worth naming, not
just accommodating.

## Speed Wise Crowds

Compress hard, keeping both layers but shrinking each: Phase 1 in one
sentence, Phase 2 to one question per consultant, Phase 3 to 300–400 words,
Phase 4 to 100 words, Phase 5 to two bullet points. Cast three consultants
rather than four — a fourth voice is the first thing to cut under a real time
constraint, and three still gives you coalitions.

Use this when the user has several challenges and wants to triage across all
of them, when they've said outright they're short on time, or when a first
full round went well and they want a second, faster pass on a related
question. Don't compress away the satellite phase entirely to save time —
a Wise Crowds session with no meta-layer at all is just a slow, over-cast
Troika, and at that point Troika is the honest choice instead.
