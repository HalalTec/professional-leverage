import { useState } from "react";
import {
  Lightbulb,
  ChevronDown,
  AlertTriangle,
  Gem,
  Compass,
  ArrowRight,
  Calendar,
  User,
  Fingerprint,
  Sparkles,
} from "lucide-react";
import ScoreSnapshot from "./ScoreSnapshot";

const BulletList = ({ items }) => (
  <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
    {items.map((item, index) => (
      <li key={index} className="flex gap-2">
        <span className="text-[#D4A44B]" aria-hidden="true">•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default function NewResult({ interpretation, scores }) {
  const [showExpanded, setShowExpanded] = useState(false);

  const {
    your_pattern: pattern,
    what_this_pattern_suggests: suggestion,
    what_may_be_quietly_costing_you: quietCost,
    where_hidden_value_may_be_sitting: hiddenValue,
    what_this_may_open_up: possibilities,
    audit_bridge: auditBridge,
  } = interpretation;

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <div className="rounded-2xl border border-[#1B2A45] bg-[#08111F] px-6 py-10 text-center shadow-[0_0_40px_rgba(0,0,0,0.4)] md:px-8">
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4A44B]/30 bg-[#0C1728]">
            <Sparkles className="h-5 w-5 text-[#D4A44B]" />
          </div>
        </div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A44B]">
          {pattern.title}
        </p>

        <h1 className="font-serif text-4xl text-white md:text-6xl">
          {pattern.value}
        </h1>

        <div className="mt-4 space-y-1 text-lg leading-relaxed text-slate-300">
          {pattern.summary.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>

      <ScoreSnapshot scores={scores} />

      <div className="rounded-xl border border-[#1B2A45] bg-[#08111F] px-6 py-6">
        <div className="flex items-start gap-4">
          <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-[#D4A44B]" />

          <div className="min-w-0 flex-1">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#D4A44B]">
              {suggestion.title}
            </h3>

            <div className="space-y-2 text-sm leading-relaxed text-slate-300">
              {suggestion.short.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>

            {showExpanded && (
              <div className="mt-5 border-t border-[#1B2A45] pt-5">
                <BulletList items={suggestion.expanded} />
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowExpanded((current) => !current)}
              aria-expanded={showExpanded}
              className="!mt-6 !flex !items-center !gap-2 !text-sm !font-medium !text-[#D4A44B] hover:!opacity-80"
            >
              {showExpanded ? "Show less" : "Read deeper"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-[#1B2A45] bg-[#08111F] p-6">
          <AlertTriangle className="mb-4 h-6 w-6 text-[#D4A44B]" />
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#D4A44B]">
            {quietCost.title}
          </h3>
          <BulletList items={quietCost.points} />
        </div>

        <div className="rounded-xl border border-[#1B2A45] bg-[#08111F] p-6">
          <Gem className="mb-4 h-6 w-6 text-emerald-400" />
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
            {hiddenValue.title}
          </h3>
          <BulletList items={hiddenValue.points} />
        </div>

        <div className="rounded-xl border border-[#1B2A45] bg-[#08111F] p-6">
          <Compass className="mb-4 h-6 w-6 text-green-400" />
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-green-400">
            {possibilities.title}
          </h3>
          <BulletList items={possibilities.points} />
        </div>
      </div>

      <div className="rounded-xl border border-[#1B2A45] bg-[#08111F] px-6 py-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#D4A44B]/20 bg-[#07101B]">
              <Fingerprint className="h-10 w-10 text-[#D4A44B]" />
            </div>
          </div>

          <div className="hidden h-20 w-px bg-[#24324B] md:block" />

          <div className="flex-1">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#D4A44B]">
              {auditBridge.title}
            </h3>
            <div className="space-y-2 text-sm leading-relaxed text-slate-300">
              {auditBridge.body.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#1B2A45] bg-[#08111F] p-6 shadow-[0_0_30px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="shrink-0">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#D4A44B]/20">
              <div className="absolute inset-2 rounded-full border border-dashed border-[#D4A44B]/20" />
              <Sparkles className="h-10 w-10 text-[#D4A44B]" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-serif text-3xl text-white md:text-4xl">
              Ready to turn these patterns into your next advantage?
            </h2>

            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-300">
              The Professional Leverage Audit™ goes beyond the diagnostic to
              uncover your unique leverage map, evidence bank, and strategic
              direction dossier.
            </p>

            <button
              type="button"
              className="group !mt-6 !flex !w-full !items-center !justify-center !gap-3 !rounded-md !bg-gradient-to-r !from-[#D9A34A] !to-[#E2B156] !px-6 !py-4 !text-center !text-sm !font-bold !uppercase !tracking-wider !text-[#111827] !transition hover:!brightness-105"
            >
              Request Your Professional Leverage Audit™
              <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-5 flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#D4A44B]" />
                <span>2 deep-dive sessions</span>
              </div>

              <div className="hidden h-4 w-px bg-slate-700 md:block" />

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#D4A44B]" />
                <span>Personally led by Prof. Leverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
