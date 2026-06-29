const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Keys expected from incoming user scores request
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
 * Runs locally to determine patterns, stripping heavy computation load away from the LLM.
 */
function computeDiagnostic(rawScores) {
  // Map incoming schema names to internal shorthand names
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

  // Top Assets
  const topAssets = [...keys].sort((a, b) => {
    if (scores[a] === scores[b]) return highTieBreakOrder[a] - highTieBreakOrder[b];
    return scores[b] - scores[a];
  }).slice(0, 3);

  // Weakest Areas
  const weakestAreas = [...keys].sort((a, b) => {
    if (scores[a] === scores[b]) return lowTieBreakOrder[a] - lowTieBreakOrder[b];
    return scores[a] - scores[b];
  }).slice(0, 3);

  // Contradiction Matrix
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

  // Structural Macro State Clusters
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

const SYSTEM_PROMPT = `
You are a professional leverage pattern interpreter.

This is NOT coaching, therapy, or personality analysis.
Your job is to interpret professional leverage patterns from a precomputed structural diagnostic.

IMPORTANT:
The structural analysis has already been computed.
Do NOT recalculate:
- top assets
- weakest areas
- contradictions
- pattern family
- systemic tension

Treat them as fixed. Use the raw scores only for nuance.

Your job is to interpret:
- leverage blind spots
- positioning gaps
- identity gaps
- hidden value zones
- strategic friction
- under-recognized strengths

Your outputs must be: precise, sharp, bounded, deterministic, and commercially relevant.
Do NOT invent career specifics, infer industries/roles, advise, prescribe, or coach. Interpret only.

====================
INPUT CONTRACT
====================
You will receive:
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
  },
  "computed_pattern": {
    "top_assets": [],
    "weakest_areas": [],
    "dominant_contradiction": "",
    "secondary_contradiction": "",
    "pattern_family": "",
    "systemic_tension": ""
  }
}

computed_pattern is authoritative. Use it as the structural truth. Scores provide nuance only.

====================
DEPTH RULES
====================
All sections must interpret relationships, not summarize scores.
Translate patterns into tension, friction, leverage gaps, proof gaps, identity gaps, trust gaps, positioning distortion, or hidden value.

Do NOT restate raw scores.
Bad: "Positioning is high and evidence is low."
Good: "The external story appears stronger than the proof beneath it."

Each section must add new interpretive value. Do NOT repeat the same insight across sections. Each section must go deeper.

====================
SECTION ROLES & LENGTH RULES
====================
your_pattern.value:
- Compress dominant contradiction + pattern family.
- 2–5 words.

your_pattern.summary:
- Array containing exactly 2 strings. Each string is a brief baseline observation summary.

what_this_pattern_suggests.short:
- Array containing exactly 3 strings. Each string must be a single complete sentence stating the core tension. Max 70 words total across all 3 strings.

what_this_pattern_suggests.expanded:
- Array containing exactly 7 strings. Each string must be a single complete sentence explaining internal mechanics. Max 22 words per string. Max 160 words total.
- At least 4 strings must explicitly connect two categories.
- At least 3 strings must describe structural tension/mismatch.
- At least 1 string must pinpoint the dominant contradiction.
- Preferred verbs: outpaces, lags behind, sits ahead of, is undercut by, is not matched by, creates friction with, is not yet backed by, compounds slower than.

what_may_be_quietly_costing_you.points:
- Array containing exactly 2 strings revealing practical friction.
- 8–18 words per string.

where_hidden_value_may_be_sitting.points:
- Array containing exactly 3 strings revealing trapped unrealized leverage.
- 8–18 words per string.

what_this_may_open_up.points:
- Array containing exactly 2 strings outlining structural clarity outcomes.
- 10–20 words per string.

====================
OUTPUT FORMAT
====================
Return ONLY valid JSON matching this layout. Do not return prose or markdown wrapper blocks outside of the JSON payload object.
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
  // Gracefully handle Standard Completions or Structured Outputs architecture payloads
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
    // 1. Run local diagnostic compute engine to offload logic from the AI
    const computedPattern = computeDiagnostic(scores);

    // 2. Assemble streamlined context wrapper contract matching the system blueprint instructions
    const aiPayloadInput = {
      scores: scores,
      computed_pattern: computedPattern
    };

    const requestedModel = process.env.OPENAI_MODEL || "gpt-4o";
    const openaiStartedAt = Date.now();

    // 3. Initiate Chat Completion request targeting structured JSON constraints
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