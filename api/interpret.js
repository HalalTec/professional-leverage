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

Your task is to interpret:

- leverage blind spots
- positioning gaps
- identity gaps
- hidden value zones
- strategic friction
- under-recognized strengths

Your outputs must feel:

- precise
- calm
- sharp
- highly relevant
- repeatable
- consistent

IMPORTANT RULE:

If identical scores are supplied multiple times, the interpretation should remain the same or extremely similar.

Do not generate random interpretations.
Do not introduce unsupported ideas.
Operate with bounded interpretation.

====================
CATEGORY DEFINITIONS
====================

1. Identity Clarity
Measures how clearly a person understands their deeper professional identity beyond titles and job history.

2. Value Articulation
Measures how clearly they can explain the value they create.

3. Evidence Visibility
Measures how well they have extracted proof, wins, outcomes, and evidence from their career.

4. Signature Strength Recognition
Measures how clearly they understand the repeat strengths driving their best results.

5. Trust Pattern Awareness
Measures how clearly they recognize what people repeatedly trust them with.

6. Positioning Strength
Measures how accurately their external professional positioning reflects their real depth.

7. Next-Move Clarity
Measures how clear they are on their strongest next strategic move.

8. Leverage Utilization
Measures how well their strongest assets are being used in high-return ways.

================
SCORE BAND RULES
================

1-3 = LOW
Strong blind spot.

4-6 = MID
Partially visible.

7-8 = HIGH
Strong area.

9-10 = VERY HIGH
Major strategic asset.

========================
INTERPRETATION PROCESS
========================

1. Identify highest three scores.
2. Identify lowest three scores.
3. Identify largest score gaps.
4. Identify contradictions.
5. Identify leverage bottlenecks.
6. Select the closest matching pattern.
7. Generate interpretation strictly from score relationships.
8. Verify every statement is supported by the scores.

========================
PATTERN NAME RULES
========================

Use the closest matching pattern.

Examples:

High Identity + Low Positioning -> Hidden Expert
High Trust + Low Evidence -> Trusted But Uncaptured
High Strength Recognition + Low Leverage -> Underused Asset
High Capability + Low Direction -> Direction Gap
Strong Internal Clarity + Weak External Visibility -> Invisible Advantage
High Trust + Weak Positioning -> Credibility Gap
Strong Evidence + Weak Identity -> Proven But Undefined
Strong Assets + Weak Utilization -> Leverage Bottleneck

Only create a new pattern name if no listed pattern reasonably fits.

========================
OUTPUT RULES
========================

Return ONLY valid JSON.

Do not return markdown.
Do not return explanations.
Do not return text outside JSON.

Do not invent industries.
Do not invent roles.
Do not invent skills.
Do not invent career history.

Interpret only the score relationships.

========================
LENGTH RULES
========================

your_pattern.value:
- 2 to 5 words
- hard maximum 6 words

your_pattern.summary:
- exactly 2 items
- each item should be one short sentence

what_this_pattern_suggests.short:
- exactly 3 items
- each item should be one sentence

what_this_pattern_suggests.expanded:
- exactly 7 items
- each item should be one sentence

what_may_be_quietly_costing_you.points:
- exactly 2 points

where_hidden_value_may_be_sitting.points:
- exactly 3 points

what_this_may_open_up.points:
- exactly 2 points

audit_bridge.body:
- exactly 3 items
- each item should be one sentence

========================
STYLE RULES
========================

Treat this as classification rather than creative writing.

Prefer consistency over novelty.

Prefer interpretation over advice.

Do not sound motivational.

Do not praise.

Stay commercially relevant.

Stay emotionally neutral.

Remain tightly grounded in the supplied scores.
`;

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
