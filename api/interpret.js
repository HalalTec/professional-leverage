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

/**
 * DETERMINISTIC DIAGNOSTIC ENGINE
 */
function computeDiagnostic(rawScores) {
  const scores = {
    identity: parseFloat(rawScores.identity_clarity),
    value: parseFloat(rawScores.value_articulation),
    evidence: parseFloat(rawScores.evidence_visibility),
    strengths: parseFloat(rawScores.signature_strength_recognition),
    trust: parseFloat(rawScores.trust_pattern_awareness),
    positioning: parseFloat(rawScores.positioning_strength),
    next_move: parseFloat(rawScores.next_move_clarity),
    leverage: parseFloat(rawScores.leverage_utilization),
  };

  const keys = Object.keys(scores);
  const highTieBreakOrder = { strengths: 1, value: 2, positioning: 3, next_move: 4, trust: 5, identity: 6, evidence: 7, leverage: 8 };
  const lowTieBreakOrder = { identity: 1, evidence: 2, leverage: 3, trust: 4, positioning: 5, value: 6, strengths: 7, next_move: 8 };
  const contradictionPriority = {
    high_capability_low_leverage: 1,
    high_positioning_low_evidence: 2,
    high_value_low_evidence: 3,
    high_value_low_leverage: 4,
    high_next_move_low_identity: 5,
    high_positioning_low_identity: 6,
    high_trust_low_positioning: 7
  };

  const pairs = [
    { key: 'high_capability_low_leverage', a: 'strengths', b: 'leverage' },
    { key: 'high_positioning_low_evidence', a: 'positioning', b: 'evidence' },
    { key: 'high_value_low_evidence', a: 'value', b: 'evidence' },
    { key: 'high_value_low_leverage', a: 'value', b: 'leverage' },
    { key: 'high_next_move_low_identity', a: 'next_move', b: 'identity' },
    { key: 'high_positioning_low_identity', a: 'positioning', b: 'identity' },
    { key: 'high_trust_low_positioning', a: 'trust', b: 'positioning' }
  ];

  const patternMap = {
    high_capability_low_leverage: 'under_deployed',
    high_positioning_low_evidence: 'visible_under_proven',
    high_value_low_evidence: 'narrative_under_proven',
    high_value_low_leverage: 'clear_but_under_deployed',
    high_next_move_low_identity: 'direction_without_foundation',
    high_positioning_low_identity: 'visible_weak_foundation',
    high_trust_low_positioning: 'trusted_under_positioned'
  };

  const getBand = (score) => {
    if (score <= 3) return 'low';
    if (score <= 6) return 'mid';
    if (score <= 8) return 'high';
    return 'very_high';
  };

  const getBandWeight = (bandA, bandB) => {
    const sortedPair = [bandA, bandB].sort().join('_');
    if (sortedPair === 'high_low') return 3;
    if (sortedPair === 'low_mid') return 2;
    if (sortedPair === 'high_mid') return 1;
    if (sortedPair === 'low_very_high' || sortedPair === 'mid_very_high') return 4;
    return 0;
  };

  const topAssets = [...keys].sort((a, b) => {
    if (scores[a] === scores[b]) return highTieBreakOrder[a] - highTieBreakOrder[b];
    return scores[b] - scores[a];
  }).slice(0, 3);

  const weakestAreas = [...keys].sort((a, b) => {
    if (scores[a] === scores[b]) return lowTieBreakOrder[a] - lowTieBreakOrder[b];
    return scores[a] - scores[b];
  }).slice(0, 3);

  const contradictionScores = pairs.map(pair => {
    const gap = Math.abs(scores[pair.a] - scores[pair.b]);
    const weight = getBandWeight(getBand(scores[pair.a]), getBand(scores[pair.b]));
    return { key: pair.key, gap, weight, total: gap + weight };
  });

  contradictionScores.sort((a, b) => {
    if (a.total !== b.total) return b.total - a.total;
    if (a.gap !== b.gap) return b.gap - a.gap;
    return contradictionPriority[a.key] - contradictionPriority[b.key];
  });

  const dominantContradiction = contradictionScores[0].key;
  const secondaryContradiction = contradictionScores[1].key;
  const patternFamily = patternMap[dominantContradiction];

  const stateGroups = {
    clarity: ['identity', 'value', 'strengths', 'next_move'],
    visibility: ['trust', 'positioning'],
    extraction: ['evidence'],
    deployment: ['leverage']
  };

  const stateScores = {};
  for (const [state, items] of Object.entries(stateGroups)) {
    const sum = items.reduce((acc, item) => acc + scores[item], 0);
    stateScores[state] = parseFloat((sum / items.length).toFixed(2));
  }

  const sortedStates = Object.keys(stateScores).sort((a, b) => stateScores[b] - stateScores[a]);
  const systemicTension = `${sortedStates[0]}_vs_${sortedStates[sortedStates.length - 1]}`;

  return {
    top_assets: topAssets,
    weakest_areas: weakestAreas,
    dominant_contradiction: dominantContradiction,
    secondary_contradiction: secondaryContradiction,
    pattern_family: patternFamily,
    systemic_tension: systemicTension
  };
}

// PROMPT UPDATED AND CONTEXT ALIGNED WITH PREVIOUS ARRAY EXPECTATIONS
const SYSTEM_PROMPT = `
You are a professional leverage pattern interpreter.

This is NOT coaching, therapy, or personality analysis.

Your job is to interpret work patterns from a Professional Leverage Blind Spot Diagnostic.

IMPORTANT:
The structural analysis is already computed.

Do NOT recalculate:
- top_assets
- weakest_areas
- dominant_contradiction
- secondary_contradiction
- pattern_family
- systemic_tension

Treat computed_pattern as fixed.

Use scores only for nuance.

Do NOT:
- invent career details
- infer industries, roles, or skills
- advise
- prescribe
- coach
- praise

Only interpret.

====================
INPUT
====================

{
  "scores": {...},
  "computed_pattern": {
    "top_assets": [],
    "weakest_areas": [],
    "dominant_contradiction": "",
    "secondary_contradiction": "",
    "pattern_family": "",
    "systemic_tension": ""
  }
}

computed_pattern is the structural truth.

====================
LANGUAGE RULES
====================

Write in simple Grade 4–6 English.

Use:
- short sentences
- plain words
- easy ideas

Avoid:
- abstract business jargon
- vague phrases
- consultant language

If a sentence feels hard to read in one pass, simplify it.

====================
DEPTH RULES
====================

Do not restate scores.

Do not stop at:
X > Y

Always explain:
X > Y → what this likely causes

Weak:
"Value is stronger than proof."

Better:
"You may explain your value well, but without enough proof, people may trust it slower."

Weak:
"Strengths are strong but use is low."

Better:
"Your best strengths may be doing less work for you than they should."

Every important point must answer:
"So what?"

Make consequences concrete and easy to picture.

Avoid vague phrases like:
- untapped potential
- credibility gaps
- hidden upside
- friction

====================
SECTION ROLES
====================

Pattern Name:
Short label for the main pattern.

Short:
State the core pattern.

Expanded:
Explain what the pattern means, what it may cause, and what may be blocked.

Quiet Costs:
What this pattern may quietly take away.

Hidden Value:
Where value may be sitting but not fully used.

Open Up:
What may become possible if the pattern becomes clearer.

====================
EXPANDED RULES
====================

Expanded must explain meaning, not just comparison.

Each sentence must do at least one:
- explain what a gap may cause
- explain what a mismatch may look like at work
- explain what may be blocked, slowed, hidden, or weakened

BANNED:
- score summaries
- one-category summaries
- pure comparisons with no consequence

REQUIRED:
- at least 4 sentences connect two categories
- at least 4 sentences explain a clear consequence
- at least 1 sentence explains the main contradiction simply

====================
OUTPUT FORMAT
====================

Return ONLY valid JSON matching this schema setup:

{
  "your_pattern": {
    "title": "Your Pattern",
    "value": "",
    "summary": [
      "Brief baseline summary sentence one.",
      "Brief baseline summary sentence two."
    ]
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
}

No markdown wrappers.
No extra prose.

====================
LENGTH
====================

your_pattern.value
2–5 words

your_pattern.summary
exactly 2 items in the array

short
2–3 sentences (items in the array)
max 70 words total

expanded
6–8 sentences (items in the array)
max 22 words each string
max 160 words total

quiet_costs
exactly 2 points
8–18 words each

hidden_value
exactly 2–3 points
8–18 words each

open_up
exactly 2 points
10–20 words each
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
            minItems: 2,
            maxItems: 3,
          },
          expanded: {
            type: "array",
            items: { type: "string" },
            minItems: 6,
            maxItems: 8,
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
            minItems: 2,
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
    },
    required: [
      "your_pattern",
      "what_this_pattern_suggests",
      "what_may_be_quietly_costing_you",
      "where_hidden_value_may_be_sitting",
      "what_this_may_open_up",
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
  if (response.choices?.[0]?.message?.content) {
    return response.choices[0].message.content;
  }
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
    const computedPattern = computeDiagnostic(scores);

    const aiPayloadInput = {
      scores: scores,
      computed_pattern: computedPattern
    };

    const requestedModel = process.env.OPENAI_MODEL || "gpt-4o";
    const openaiStartedAt = Date.now();

    const response = await client.chat.completions.create({
      model: requestedModel,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: JSON.stringify(aiPayloadInput) }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: RESPONSE_FORMAT.name,
          strict: RESPONSE_FORMAT.strict,
          schema: RESPONSE_FORMAT.schema
        }
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
    const requestId = response.id || "unknown";
    const usage = response.usage || {};

    console.info(
      "[interpret:timing]",
      JSON.stringify({
        requestId,
        model: response.model || requestedModel,
        totalMs,
        openaiMs,
        parseMs,
        inputTokens: usage.prompt_tokens,
        outputTokens: usage.completion_tokens,
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