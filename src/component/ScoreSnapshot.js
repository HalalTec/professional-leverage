import { useState } from "react";
import {
  User,
  Target,
  HandHeart,
  TrendingUp,
  BookOpen,
  Compass,
  Gem,
  Rocket,
  Info,
} from "lucide-react";

const SCORE_DEFINITIONS = [
  { key: "identity_clarity", icon: User, label: "Identity Clarity" },
  { key: "value_articulation", icon: BookOpen, label: "Value Articulation" },
  { key: "evidence_visibility", icon: Gem, label: "Evidence Visibility" },
  {
    key: "signature_strength_recognition",
    icon: TrendingUp,
    label: "Signature Strength Recognition",
  },
  {
    key: "trust_pattern_awareness",
    icon: HandHeart,
    label: "Trust Pattern Awareness",
  },
  { key: "positioning_strength", icon: Target, label: "Positioning Strength" },
  { key: "next_move_clarity", icon: Compass, label: "Next-Move Clarity" },
  {
    key: "leverage_utilization",
    icon: Rocket,
    label: "Leverage Utilization",
  },
];

function ScoreBar({ Icon, label, score }) {
  const numericScore = Number(score);
  const percentage = Math.min(Math.max((numericScore / 10) * 100, 0), 100);

  return (
    <div className="flex items-center gap-4">
      <Icon className="h-5 w-5 shrink-0 text-slate-400" />

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-start justify-between gap-3">
          <span className="text-sm text-slate-200">{label}</span>
          <span className="shrink-0 text-xl font-light text-white">
            {numericScore.toFixed(1)}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full rounded-full bg-[#D4A44B] transition-[width] duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ScoreSnapshot({ scores }) {
  const [showHelp, setShowHelp] = useState(false);

  const scoreItems = SCORE_DEFINITIONS.map((definition) => ({
    ...definition,
    score: scores[definition.key],
  }));
  const leftColumn = scoreItems.slice(0, 4);
  const rightColumn = scoreItems.slice(4);

  const renderColumn = (items) => (
    <div className="space-y-6">
      {items.map((item) => (
        <ScoreBar
          key={item.key}
          Icon={item.icon}
          label={item.label}
          score={item.score}
        />
      ))}
    </div>
  );

  return (
    <div className="rounded-xl border border-[#1B2A45] bg-[#07111F] p-6">
      <div className="mb-6 flex flex-col gap-3 border-b border-[#1B2A45] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#D4A44B]">
          Your Score Snapshot
        </h2>

        <button
          type="button"
          onClick={() => setShowHelp((current) => !current)}
          aria-expanded={showHelp}
          aria-controls="score-snapshot-help"
          className="!flex !items-center !gap-2 !text-xs !text-slate-400 hover:!text-slate-300"
        >
          <span>{showHelp ? "Hide score guide" : "How scores work"}</span>
          <Info className="h-3.5 w-3.5" />
        </button>
      </div>

      {showHelp && (
        <p
          id="score-snapshot-help"
          className="mb-6 rounded-lg border border-[#1B2A45] bg-[#0B1626] p-4 text-sm leading-relaxed text-slate-400"
        >
          Each score is the answer you selected for that diagnostic category.
          Scores range from 1 (low) to 10 (high).
        </p>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {renderColumn(leftColumn)}
        {renderColumn(rightColumn)}
      </div>

      <div className="mt-6 border-t border-[#1B2A45] pt-4 text-center text-xs text-slate-500">
        Scores range from 1 (low) to 10 (high)
      </div>
    </div>
  );
}
