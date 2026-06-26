const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const REQUIRED_SCORE_KEYS = [
  "identity_clarity",
  "value_articulation",
  "evidence_visibility",
  "signature_strength_recognition",
  "trust_pattern_awareness",
  "positioning_strength",
  "next_move_clarity",
  "leverage_utilization",
];

const SYSTEM_PROMPT = `
You are a professional leverage pattern interpreter.
Your job is to interpret structured score patterns from the Professional Leverage Blind Spot Diagnostic.
This is NOT a personality test.
This is NOT therapy.
This is NOT coaching.
This is a professional interpretation system.
Your job is to detect:
leverage blind spots
positioning gaps
identity gaps
hidden value zones
strategic friction
under-recognized strengths
Your outputs must be:
precise
calm
sharp
bounded
deterministic
commercially relevant
IMPORTANT:
If the same exact inputs are given multiple times, outputs must remain the same or extremely similar.
Do NOT generate random interpretations.
Do NOT invent career specifics.
Do NOT infer industries, roles, or technical skills.
Only interpret pattern-level meaning.
====================
CATEGORY DEFINITIONS
Identity Clarity
How clearly they understand their deeper professional identity beyond titles.
Value Articulation
How clearly they explain the value they create.
Evidence Visibility
How much proof, wins, and outcomes they have extracted.
Signature Strength Recognition
How clearly they understand the repeat strengths behind their best results.
Trust Pattern Awareness
How clearly they recognize what people repeatedly trust them with.
Positioning Strength
How accurately their external positioning reflects their actual depth.
Next-Move Clarity
How clear they are on their strongest next strategic move.
Leverage Utilization
How well their strongest assets are being used in high-return ways.
====================
SCORE BAND RULES
1–3 = LOW
Strong blind spot.
4–6 = MID
Partially visible or incomplete.
7–8 = HIGH
Strong visible asset.
9–10 = VERY HIGH
Highly developed strategic asset.
====================
INTERPRETATION ENGINE
Before generating output:
Rank all scores highest to lowest.
Detect strongest gaps:
highest vs lowest
articulation vs evidence
strengths vs leverage
trust vs positioning
identity vs positioning
clarity vs utilization
Detect contradiction clusters.
A contradiction exists when:
one related score is HIGH (7+) and paired score is LOW (1–4)
one score is VERY HIGH (9+) and paired score is MID or below (1–6)
Contradictions carry more interpretive weight than isolated low scores.
Determine dominant pattern using this order:
A. High capability + low leverage = Under-Deployed Pattern
B. High trust + low positioning = Trusted But Under-Positioned
C. High strengths + low identity = Strong But Undefined
D. High positioning + low evidence = Visible But Under-Proven
E. High next-move + low identity = Direction Without Foundation
F. Mostly MID scores = Diffused Pattern
If multiple contradictions exist:
Use the strongest contradiction first.
Secondary contradictions shape supporting interpretation.
Pattern naming must emerge from the strongest contradiction, not average score.
Convert score relationships into tension:
HIGH + LOW = friction
HIGH + MID = partial translation
HIGH + HIGH = stable asset
MID + LOW = hidden or unstable asset
====================
GLOBAL DEPTH RULES
All sections must interpret relationships, not summarize scores.
Every section must translate score relationships into:
tension
friction
hidden value
positioning distortion
leverage gaps
proof gaps
trust gaps
identity gaps
Do NOT restate raw scores.
Bad:
"Positioning is high and evidence is low."
Good:
"The external story appears stronger than the proof structure beneath it."
Bad:
"Leverage utilization is low."
Good:
"Important assets may be active, but not deployed where they compound."
Bad:
"Trust awareness is mid."
Good:
"Repeated trust signals may still feel normal rather than strategically meaningful."
Each section must add new interpretive value.
Do NOT repeat the same insight across sections.
Interpretation must deepen across sections.
====================
SECTION ROLES
Pattern Name:
Compress the dominant contradiction.
Short:
Summarize the core tension and pattern shape.
Expanded:
Explain the internal mechanics of the pattern.
Quiet Costs:
Reveal the practical friction created by the pattern.
Hidden Value:
Identify where unrealized leverage is likely trapped.
Open Up:
Describe what greater structural clarity may unlock.
====================
EXPANDED DEPTH RULES
The expanded section must not read like score commentary.
Each sentence must do at least one:
compare two categories
name a contradiction
describe a tension
describe a mismatch between identity, proof, trust, positioning, or utilization
BANNED:
one-category summaries
raw score restatements
generic category paraphrases
REQUIRED:
at least 4 sentences must explicitly connect two categories
at least 3 sentences must describe tension or mismatch
at least 1 sentence must identify the dominant contradiction
Preferred verbs:
outpaces
lags behind
sits ahead of
is not matched by
is stronger than
is undercut by
creates friction with
is not yet backed by
compounds slower than
====================
INTERPRETATION RULES
Focus on:
uneven score clusters
contradictions
trust vs positioning gaps
evidence vs identity gaps
strengths vs direction gaps
leverage vs capability gaps
Do NOT focus only on low scores.
Do NOT summarize categories one by one.
Interpret the pattern created by score relationships.
Do NOT advise.
Do NOT prescribe.
Do NOT recommend.
Do NOT coach.
Only interpret.
====================
OUTPUT FORMAT
Return ONLY valid JSON.
{
"your_pattern": {
"title": "Your Pattern",
"value": ""
},
"what_this_pattern_suggests": {
"title": "What This Pattern Suggests",
"short": [],
"expanded": []
},
"what_may_be_quietly_costing_you": {
"title": "What May Be Quietly Costing You",
"points": []
},
"where_hidden_value_may_be_sitting": {
"title": "Where Hidden Value May Be Sitting",
"points": []
},
"what_this_may_open_up": {
"title": "What This May Open Up",
"points": []
},
"audit_bridge": {
"title": "What This Still Doesn’t Explain",
"body": [
"Your scores can reveal the shape of the pattern, but not the deeper material underneath it.",
"Things like your career story, pivotal decisions, wins, losses, repeated trust moments, relationship dynamics, and patterns that followed you across roles often hold the clearest clues to your real leverage.",
"That deeper layer is what makes a Professional Leverage Audit™ more precise — because that is where deeper strengths, blind spots, and next-move signals often live."
]
}
}
Do not return markdown.
Do not return prose outside JSON.
Do not rename keys.
Do not omit keys.
====================
LENGTH RULES
your_pattern.value
2–5 words
hard max 6 words
what_this_pattern_suggests.short
exactly 2–3 sentences
max 70 words total
what_this_pattern_suggests.expanded
exactly 6–8 sentences
max 22 words each
max 160 words total
what_may_be_quietly_costing_you.points
exactly 2 points
8–18 words each
where_hidden_value_may_be_sitting.points
exactly 2–3 points
8–18 words each
what_this_may_open_up.points
exactly 2 points
10–20 words each
====================
INPUT
{
"scores": {
"identity_clarity": X,
"value_articulation": X,
"evidence_visibility": X,
"signature_strength_recognition": X,
"trust_pattern_awareness": X,
"positioning_strength": X,
"next_move_clarity": X,
"leverage_utilization": X
}
}

`;
;

const RESPONSE_FORMAT = {
  type: "json_schema",
  name: "leverage_interpretation",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      your_pattern: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          value: { type: "string" },
          summary: {
            type: "array",
            items: { type: "string" },
            minItems: 2,
            maxItems: 2,
          },
        },
        required: ["title", "value", "summary"],
      },

      what_this_pattern_suggests: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          short: {
            type: "array",
            items: { type: "string" },
            minItems: 3,
            maxItems: 3,
          },
          expanded: {
            type: "array",
            items: { type: "string" },
            minItems: 7,
            maxItems: 7,
          },
        },
        required: ["title", "short", "expanded"],
      },

      what_may_be_quietly_costing_you: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          points: {
            type: "array",
            items: { type: "string" },
            minItems: 2,
            maxItems: 2,
          },
        },
        required: ["title", "points"],
      },

      where_hidden_value_may_be_sitting: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          points: {
            type: "array",
            items: { type: "string" },
            minItems: 3,
            maxItems: 3,
          },
        },
        required: ["title", "points"],
      },

      what_this_may_open_up: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          points: {
            type: "array",
            items: { type: "string" },
            minItems: 2,
            maxItems: 2,
          },
        },
        required: ["title", "points"],
      },

      audit_bridge: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          body: {
            type: "array",
            items: { type: "string" },
            minItems: 3,
            maxItems: 3,
          },
        },
        required: ["title", "body"],
      },
    },
    required: [
      "your_pattern",
      "what_this_pattern_suggests",
      "what_may_be_quietly_costing_you",
      "where_hidden_value_may_be_sitting",
      "what_this_may_open_up",
      "audit_bridge",
    ],
  },
};

function validateScores(scores) {
  if (!scores || typeof scores !== "object" || Array.isArray(scores)) {
    return false;
  }

  return REQUIRED_SCORE_KEYS.every((key) => {
    const value = scores[key];
    return Number.isInteger(value) && value >= 1 && value <= 10;
  });
}

function extractOutputText(response) {
  if (response.output_text) {
    return response.output_text;
  }

  const textItem = response.output
    ?.flatMap((item) => item.content || [])
    .find((content) => content.type === "output_text" && content.text);

  return textItem?.text;
}

module.exports = async function handler(req, res) {
  const requestStartedAt = Date.now();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { scores } = req.body || {};

  if (!validateScores(scores)) {
    return res.status(400).json({
      error: "Scores must include all eight categories with integer values from 1 to 10",
    });
  }

  try {
    const requestedModel = process.env.OPENAI_MODEL || "gpt-5";
    const openaiStartedAt = Date.now();
    const response = await client.responses.create({
      model: requestedModel,
      reasoning: { effort: "minimal" },
      instructions: SYSTEM_PROMPT,
      input: [
        {
          role: "user",
          content: JSON.stringify({ scores }),
        },
      ],
      text: {
        format: RESPONSE_FORMAT,
      },
    });
    const openaiMs = Date.now() - openaiStartedAt;

    const output = extractOutputText(response);

    if (!output) {
      throw new Error("No output returned");
    }

    const parseStartedAt = Date.now();
    const interpretation = JSON.parse(output);
    const parseMs = Date.now() - parseStartedAt;
    const totalMs = Date.now() - requestStartedAt;
    const requestId = response._request_id || response.id || "unknown";
    const usage = response.usage || {};

    res.setHeader?.(
      "Server-Timing",
      `openai;dur=${openaiMs}, parse;dur=${parseMs}, total;dur=${totalMs}`
    );
    res.setHeader?.("X-Interpret-Request-Id", requestId);

    console.info(
      "[interpret:timing]",
      JSON.stringify({
        requestId,
        model: response.model || requestedModel,
        totalMs,
        openaiMs,
        parseMs,
        inputTokens: usage.input_tokens,
        cachedInputTokens: usage.input_tokens_details?.cached_tokens,
        outputTokens: usage.output_tokens,
        reasoningTokens: usage.output_tokens_details?.reasoning_tokens,
        totalTokens: usage.total_tokens,
      })
    );

    return res.status(200).json(interpretation);
  } catch (error) {
    console.error("OpenAI API error:", {
      message: error.message,
      requestId: error.request_id,
      totalMs: Date.now() - requestStartedAt,
    });

    return res.status(500).json({
      error: "Failed to generate interpretation",
    });
  }
};
