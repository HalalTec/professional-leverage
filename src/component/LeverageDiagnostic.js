import { useMemo } from "react";

export default function LeverageDiagnostic({ scores, debug = false }) {
  const result = useMemo(() => {
    const requiredKeys = [
      "identity",
      "value",
      "evidence",
      "strengths",
      "trust",
      "positioning",
      "next_move",
      "leverage",
    ];

    // STEP 1 — VALIDATE INPUT
    for (const key of requiredKeys) {
      if (scores[key] === undefined) {
        throw new Error(`Missing score: ${key}`);
      }

      scores[key] = Number(scores[key]);

      if (scores[key] < 0 || scores[key] > 10) {
        throw new Error(`Score '${key}' must be between 0 and 10`);
      }
    }

    // STEP 2 — TIE BREAKERS
    const highTieBreakOrder = {
      strengths: 1,
      value: 2,
      positioning: 3,
      next_move: 4,
      trust: 5,
      identity: 6,
      evidence: 7,
      leverage: 8,
    };

    const lowTieBreakOrder = {
      identity: 1,
      evidence: 2,
      leverage: 3,
      trust: 4,
      positioning: 5,
      value: 6,
      strengths: 7,
      next_move: 8,
    };

    const contradictionPriority = {
      high_capability_low_leverage: 1,
      high_positioning_low_evidence: 2,
      high_value_low_evidence: 3,
      high_value_low_leverage: 4,
      high_next_move_low_identity: 5,
      high_positioning_low_identity: 6,
      high_trust_low_positioning: 7,
    };

    // STEP 3 — BAND
    const getBand = (score) => {
      if (score <= 3) return "low";
      if (score <= 6) return "mid";
      if (score <= 8) return "high";
      return "very_high";
    };

    const getBandWeight = (a, b) => {
      const pair = [a, b].sort().join("|");

      if (pair === "high|low") return 3;
      if (pair === "low|very_high") return 4;
      if (pair === "mid|very_high") return 4;
      if (pair === "mid|low") return 2;
      if (pair === "high|mid") return 1;

      return 0;
    };

    // STEP 4 — TOP ASSETS
    const sortedHigh = Object.keys(scores).sort((a, b) => {
      if (scores[b] === scores[a]) {
        return highTieBreakOrder[a] - highTieBreakOrder[b];
      }
      return scores[b] - scores[a];
    });

    const topAssets = sortedHigh.slice(0, 3);

    // STEP 5 — WEAK AREAS
    const sortedLow = Object.keys(scores).sort((a, b) => {
      if (scores[a] === scores[b]) {
        return lowTieBreakOrder[a] - lowTieBreakOrder[b];
      }
      return scores[a] - scores[b];
    });

    const weakestAreas = sortedLow.slice(0, 3);

    // STEP 6 — CONTRADICTIONS
    const pairs = [
      ["high_capability_low_leverage", "strengths", "leverage"],
      ["high_positioning_low_evidence", "positioning", "evidence"],
      ["high_value_low_evidence", "value", "evidence"],
      ["high_value_low_leverage", "value", "leverage"],
      ["high_next_move_low_identity", "next_move", "identity"],
      ["high_positioning_low_identity", "positioning", "identity"],
      ["high_trust_low_positioning", "trust", "positioning"],
    ];

    const contradictionScores = pairs.map(([key, a, b]) => {
      const scoreA = scores[a];
      const scoreB = scores[b];

      const gap = Math.abs(scoreA - scoreB);

      const weight = getBandWeight(getBand(scoreA), getBand(scoreB));

      return {
        key,
        gap,
        weight,
        total: gap + weight,
      };
    });

    contradictionScores.sort((a, b) => {
      if (a.total !== b.total) return b.total - a.total;
      if (a.gap !== b.gap) return b.gap - a.gap;
      return (
        (contradictionPriority[a.key] || 99) -
        (contradictionPriority[b.key] || 99)
      );
    });

    const dominantContradiction = contradictionScores[0].key;
    const secondaryContradiction = contradictionScores[1].key;

    // STEP 7 — PATTERN MAP
    const patternMap = {
      high_capability_low_leverage: "under_deployed",
      high_positioning_low_evidence: "visible_under_proven",
      high_value_low_evidence: "narrative_under_proven",
      high_value_low_leverage: "clear_but_under_deployed",
      high_next_move_low_identity: "direction_without_foundation",
      high_positioning_low_identity: "visible_weak_foundation",
      high_trust_low_positioning: "trusted_under_positioned",
    };

    const patternFamily = patternMap[dominantContradiction];

    // STEP 8 — STATE GROUPS
    const stateGroups = {
      clarity: ["identity", "value", "strengths", "next_move"],
      visibility: ["trust", "positioning"],
      extraction: ["evidence"],
      deployment: ["leverage"],
    };

    const stateScores = Object.entries(stateGroups).reduce(
      (acc, [state, keys]) => {
        const sum = keys.reduce((s, k) => s + scores[k], 0);
        acc[state] = Number((sum / keys.length).toFixed(2));
        return acc;
      },
      {}
    );

    const sortedStates = Object.keys(stateScores).sort(
      (a, b) => stateScores[b] - stateScores[a]
    );

    const systemicTension = `${sortedStates[0]}_vs_${sortedStates.at(-1)}`;

    // FINAL OUTPUT
    const output = {
      top_assets: topAssets,
      weakest_areas: weakestAreas,
      dominant_contradiction: dominantContradiction,
      secondary_contradiction: secondaryContradiction,
      pattern_family: patternFamily,
      systemic_tension: systemicTension,
    };

    if (debug) {
      output.state_scores = stateScores;
      output.contradiction_scores = contradictionScores;
    }

    return output;
  }, [scores, debug]);

  return (
    <pre style={{ background: "#111", color: "#0f0", padding: 16 }}>
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}