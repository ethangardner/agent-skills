---
name: dbt-dearman-give-fast
description: >-
  Apply DBT's interpersonal effectiveness skills (DEARMAN, GIVE, FAST) when
  drafting or reviewing a hard conversation, a request, a boundary, a "no,"
  or any conflict-laden message — balancing getting the objective met,
  preserving the relationship, and keeping self-respect. Use when the user
  asks to write or role-play a difficult email/text/conversation, "how do I
  ask for X", "how do I say no to Y", "help me set a boundary", "how do I
  push back on...", "help me negotiate this", or wants feedback on a drafted
  message meant to assert a need or resolve interpersonal friction. Trigger
  even when the user doesn't mention DBT, DEARMAN, or therapy by name — the
  underlying need (get something met without wrecking the relationship or
  your own self-respect) is what this skill answers.
---

# DEARMAN / GIVE / FAST

Source: Dialectical Behavior Therapy's Interpersonal Effectiveness module
(Marsha Linehan's DBT Skills Training Manual), cross-checked against
[therapyexplained.com's DEAR MAN / GIVE / FAST
guide](https://www.therapyexplained.com/blog/dbt-interpersonal-effectiveness-dear-man-give-fast).
Also commonly spelled "DEAR MAN" with a space — this repo uses "DEARMAN" to
match the skill name (`dbt-dearman-give-fast`). The core claim is that every
interpersonal ask or refusal actually has three separate, sometimes
competing, objectives — and most hard conversations go badly not because the
person lacked words, but because they optimized for only one objective while
silently sacrificing the other two:

1. **Objectives effectiveness** — get what you want, or successfully say no
   (**DEARMAN**).
2. **Relationship effectiveness** — keep or improve the relationship in the
   process (**GIVE**).
3. **Self-respect effectiveness** — keep your self-respect and values intact
   (**FAST**).

A script that nails the ask while trampling the relationship, or that
protects the relationship by caving and eroding self-respect, is not a
success — it's a trade the person made without realizing they were making
it. The job when drafting or reviewing a message is to name the trade-off
out loud and choose it deliberately, not default into it.

## Before drafting: decide the priority weighting

Don't start writing DEARMAN language until you've answered this with the
user, even briefly — it changes which letters to lean on:

- **What's actually the objective here** — the concrete thing that would
  count as success if this conversation went well? Vague objectives produce
  vague asks.
- **If objective and relationship trade off in this conversation, which
  matters more, and for how long?** A one-time landlord negotiation weighs
  differently than a request to a spouse. Weigh relationship _durability_
  (do you need this person again tomorrow?) against objective _stakes_ (how
  costly is not getting it?).
- **Capability** — can the other person actually grant this? A request they
  can't fulfill needs different handling (negotiate down, or route
  elsewhere) than a flat refusal.
- **Authority and rights** — does the user have standing to ask, or to
  refuse, in this specific relationship/context? This shapes tone (Appear
  confident vs. over-hedging) more than any wording choice.
- **Timing** — is this the right moment, or does the message need to
  request a moment first?

Naming the priority weighting up front prevents the two most common failure
modes below: an all-DEARMAN message that reads as an ultimatum, and an
all-GIVE message that never actually asks for anything.

**Quick rating tool** when the weighting isn't obvious: have the user rate
three things 1–5 — how much getting the objective matters, how much the
relationship matters, how much is at stake for self-respect either way.
Whichever scores highest tells you which letter-set to lean on hardest in
the draft; the other two still show up, just in a supporting role.

## DEARMAN — get the objective met

Use for making a request or saying no and having it count.

- **D — Describe**: State the facts of the situation in neutral, non-blaming
  terms before anything else. No interpretation, no character judgments —
  just what happened.
- **E — Express**: Say how you feel about it, using "I" statements. Don't
  assume the other person already knows or will infer your feelings from
  context — DBT treats unstated feelings as functionally invisible to the
  listener.
- **A — Assert**: Ask for what you want, or say no, in plain, explicit
  language. Don't hint, don't hope they'll offer it unprompted, don't assume
  they'll "just know." This is the step people skip most — they Describe and
  Express at length and never actually make the ask.
- **R — Reinforce**: Explain the benefit to the other person of giving you
  what you're asking for (or of accepting your no) _before_ they decide —
  reward the outcome you want, don't only threaten the outcome you don't.
- **M — (stay) Mindful**: Keep the conversation on this one objective. If the
  other person raises old grievances, changes the subject, or attacks, don't
  chase it — the **broken record** technique means calmly restating the ask
  or the no, as many times as needed, without escalating or re-litigating.
- **A — Appear confident**: Confident tone, posture, and eye contact
  (or their written equivalent — no stammering hedges, no wall of
  qualifiers). Note this is about _appearing_ confident, not about actually
  feeling certain — the skill works even when the person doesn't feel sure.
- **N — Negotiate**: Be willing to give to get. Offer an alternative, scale
  the request down, or turn the question back ("what would work for you?").
  This is where Objectives and Relationship effectiveness get reconciled —
  a DEARMAN with no Negotiate is a demand, not a request.

Common mistakes to check a draft against: Describe slipping into
interpretation ("you were being dismissive") instead of observable fact
("you didn't respond to my message for three days"); Express landing as
blame instead of an "I" statement; Assert getting hinted at instead of
stated; Reinforce being skipped entirely; and the whole draft getting
derailed onto a tangent the other person raised instead of returning to the
objective.

## GIVE — keep the relationship [→ consult `references/give-in-practice.md` for worked before/after scenarios]

Use to keep the _other_ person willing to keep engaging, especially when the
ask is unwelcome to them.

- **G — (be) Gentle**: No attacks, threats, judging, or moralizing. Courteous
  even when firm.
- **I — (act) Interested**: Listen to their side without interrupting or
  visibly waiting for your turn to talk.
- **V — Validate**: Acknowledge their feelings, constraints, or point of view
  as understandable — even while disagreeing or still holding your ask.
  Validation is not agreement; it's "I see why you'd feel/see it that way."
- **E — (use an) Easy manner**: A little warmth or humor, a light touch —
  this isn't a courtroom.

Common mistakes: confusing Gentle with passivity (Gentle governs tone, not
whether you assert at all); performing Interested without actually being
curious, which tends to read as fake; and validating insincerely — "I hear
you, but..." cancels the validation it just gave. A real Validate stands on
its own without a "but" stapled to it.

## FAST — keep self-respect [→ consult `references/fast-in-practice.md` for worked before/after scenarios, including one layered example running all three letter-sets at once]

Use as a check on the _user's own_ draft, especially when Relationship
effectiveness (GIVE) is being weighted heavily — GIVE without FAST produces
appeasement, not diplomacy.

- **F — (be) Fair**: Fair to the other person _and_ to yourself — this cuts
  both ways.
- **A — (no) Apologies**: No unnecessary apologizing for having a need, an
  opinion, or a boundary. Over-apologizing undercuts the Assert step and
  signals the ask isn't legitimate, when it is.
- **S — Stick to values**: Don't sell out something the user actually
  believes in order to make the conversation smoother. If a proposed
  compromise crosses a stated value, flag it rather than smoothing past it.
- **T — (be) Truthful**: No exaggeration, no faked helplessness, no invented
  excuses — even small dishonesty here tends to erode the very self-respect
  this letter exists to protect.

Common mistakes: over-apologizing out of habit rather than because an
apology is actually warranted; confusing Fair-to-yourself with capitulating
to keep things smooth (that's not fairness, it's a one-sided trade); and
holding a boundary rigidly without ever naming the value underneath it, which
makes the boundary sound arbitrary instead of principled.

## When NOT to over-apply this

- **Safety-relevant disclosures override the framework.** If what the user
  describes involves abuse, coercion, or physical danger, do not hand them
  scripted assertiveness language as if this were a garden-variety
  disagreement — the priority becomes safety, not a well-formed DEARMAN.
  Say so plainly and suggest resources/support instead of drafting a script.
- **This is a communication scaffold, not therapy.** It structures what to
  say; it doesn't resolve why a request feels impossible to make in the
  first place. If the user's stuck point is emotional (fear, shame, guilt)
  rather than "what words do I use," name that distinction rather than
  pushing a script at an emotional problem.
- **Low-stakes asks don't need the full acronym.** "Can you pass the salt"
  doesn't need Describe-Express-Assert-Reinforce-Mindful-Appear-Negotiate.
  Reach for the full framework when the ask is genuinely hard — repeated
  pushback expected, a relationship at stake, or the user has already tried
  and it went badly.
- **Don't let FAST become license for bluntness.** "Truthful" and "stick to
  values" are not permission to be needlessly harsh — that violates Gentle
  from GIVE. The three letter-sets are meant to operate together, not as a
  menu to pick the most convenient one from.

## Instinct → practice (quick reference)

| Instinct                                              | DBT practice                                                                  |
| ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| Hint and hope they infer the ask                      | Assert it explicitly (A)                                                      |
| Assume they already know how you feel                 | Express it in words, don't assume it's visible (E)                            |
| Over-explain and justify at length                    | Describe facts briefly, then move to the ask                                  |
| Re-litigate every pushback point they raise           | Mindful broken record — restate the ask, don't chase tangents                 |
| Cave immediately to keep the peace                    | Negotiate — give to get, not give up unilaterally                             |
| Apologize for having the need at all                  | No unnecessary apologies (FAST)                                               |
| Attack or blame when frustrated                       | Gentle — no judging or threats (GIVE)                                         |
| Treat every ask as equally high-stakes                | Weigh priorities (objective vs. relationship vs. self-respect) first          |
| Soften the ask until it's not actually an ask anymore | Assert stays explicit even when GIVE softens the delivery                     |
| Sound uncertain to seem humble                        | Appear confident — tone/posture, independent of how certain you actually feel |

## Applying this to common requests

- **"Help me ask for X"** → Establish the concrete objective and priority
  weighting first. Draft DEARMAN in full; layer Gentle/Validate language
  from GIVE around the Describe/Assert steps rather than replacing them.
- **"Help me say no to Y"** → Same DEARMAN structure — Assert the no
  explicitly, don't bury it in a paragraph of justification. Broken record
  (Mindful) is the main tool if pushback is expected. Check the draft
  against FAST for buried apologies.
- **"Help me set a boundary"** → A boundary is a standing Assert plus a
  stated consequence (Reinforce, framed as what happens either way, not as
  a threat). Revisit Negotiate carefully here — a boundary that's endlessly
  negotiable isn't a boundary.
- **"How do I push back / navigate this conflict"** → Start with GIVE
  (Validate their side) before Asserting — conflict de-escalates faster when
  the other person feels heard before they hear the ask. Then apply
  DEARMAN's Describe/Express/Assert once Validation has landed.
- **"Review/critique what I wrote"** → Run the checklist mode below rather
  than a line-by-line rewrite; point at the highest-leverage gap first
  (usually: Assert is missing or buried, or Validate is absent entirely).

## Vocabulary (use precisely)

- **Objectives effectiveness** — getting a specific want met or a no
  honored. What DEARMAN is for.
- **Relationship effectiveness** — keeping the other person willing to
  engage, now and later. What GIVE is for.
- **Self-respect effectiveness** — exiting the conversation still respecting
  yourself. What FAST is for.
- **Broken record** — calmly repeating the ask or refusal without
  escalating, justifying further, or chasing a tangent the other person
  raised.
- **Validate** — communicating that the other person's feelings or
  perspective make sense given their situation; distinct from agreeing with
  them.
- **Negotiate (give to get)** — offering a smaller or alternative version of
  the ask in exchange for movement, as opposed to either holding a rigid
  demand or dropping the ask altogether.

## Reviewing a drafted message (checklist mode)

1. Does it state the facts before the ask (Describe), or jump straight to
   the ask/complaint with no context?
2. Are feelings stated explicitly with "I" language (Express), or assumed to
   be obvious?
3. Is the actual ask or refusal stated in plain words somewhere (Assert), or
   only implied?
4. Does it name a benefit to the other person of agreeing (Reinforce)?
5. Is there a plan for staying on-topic if they push back or deflect
   (Mindful/broken record), or does the draft only cover the first
   response?
6. Is there room to negotiate, or does the message read as all-or-nothing
   with no Negotiate step at all?
7. Does it validate the other person's perspective anywhere (GIVE), or is it
   entirely one-directional?
8. Is the tone gentle — free of blame, threats, or moralizing — even where
   it's firm?
9. Does it contain an apology that isn't actually necessary (FAST)?
10. Is it truthful, or does it lean on exaggeration or invented helplessness
    to make the point land?

Lead the review with whichever gap is most consequential for this specific
message — usually a missing or buried Assert, or a complete absence of
Validate — rather than working the list top to bottom.
