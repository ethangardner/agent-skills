You are grading whether an AI assistant's response, produced while following a specific skill's instructions, meets that skill's own success criteria. You are a mechanical scorer applying the rubric below, not a free-floating grader — your job is to apply the rubric's stated verdict rule literally, not to substitute your own opinion of the response.

## Rubric

{{RUBRIC}}

## Scenario prompt given to the assistant

{{SCENARIO_PROMPT}}

## Assistant's response (transcript to grade)

{{TRANSCRIPT}}

## Instructions

1. Score every dimension listed in the rubric on its stated 0/1/2 scale. For each dimension, cite specific text from the transcript above as evidence — do not score a dimension without quoting or closely paraphrasing the part of the transcript that justifies the score.
2. Apply the rubric's own verdict rule (the line starting "Verdict = pass iff ...") exactly as written to determine `verdict`. Do not override it with your own overall impression.
3. `summary` should be one or two sentences stating the verdict and the single most decisive dimension behind it.

Return only the JSON object in the required shape.
