import { useEffect } from "react";
import {
  CheckCircle2,
  Shield,
  TrendingUp,
  Target,
  ArrowUpRight,
} from "lucide-react";

export default function FinalStepForm({ onComplete }) {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const handleFormMessage = (event) => {
      const iframe = document.getElementById("inline-7NRMz5kJUIxJuRh7ToGv");

      if (!iframe || event.source !== iframe.contentWindow) return;

      const action = Array.isArray(event.data) ? event.data[0] : null;

      if (action === "modify-parent-url") {
        event.stopImmediatePropagation();
        onComplete?.();
        return;
      }

      if (action === "set-sticky-contacts") {
        onComplete?.();
      }
    };

    window.addEventListener("message", handleFormMessage, true);
    return () => window.removeEventListener("message", handleFormMessage, true);
  }, [onComplete]);

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#1B2A45] bg-[#050D18] px-6 py-10">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,75,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl">
        {/* Status */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#D4A44B]">
          <CheckCircle2 className="h-4 w-4" />
          <span>All questions complete</span>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-4 h-px w-72 bg-[#1F2A3D]" />

        {/* Label */}
        <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A44B]">
          Final Step
        </p>

        {/* Heading */}
      <div className="flex flex-col items-center">
        <h1 className="mt-4 text-center font-serif text-4xl leading-tight text-white md:text-5xl">
            Your Professional
                  </h1>
                  <h1 className="text-center font-serif text-4xl leading-tight text-white md:text-5xl"> Leverage Pattern is ready.
                      </h1>
        </div>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-lg text-center text-slate-400">
          Enter your details to receive your personalized diagnostic results.
        </p>

        {/* Benefits */}
        <div className="mt-10 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D4A44B]/40">
              <TrendingUp className="h-5 w-5 text-[#D4A44B]" />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-[#D4A44B]">
              Your full diagnostic
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Your scores, pattern, and what they reveal.
            </p>
          </div>

          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D4A44B]/40">
              <Target className="h-5 w-5 text-[#D4A44B]" />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-[#D4A44B]">
              Strategic insights
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Hidden risks, under-leveraged value, and what's possible.
            </p>
          </div>

          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D4A44B]/40">
              <ArrowUpRight className="h-5 w-5 text-[#D4A44B]" />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-[#D4A44B]">
              What's next
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Clarity on your next best moves.
            </p>
          </div>
        </div>

        {/* Embedded Form */}
        <div className="mt-10 overflow-hidden rounded-lg border border-[#22324A] bg-[#0B1320]">
          <iframe
            src="https://link.msgsndr.com/widget/form/7NRMz5kJUIxJuRh7ToGv"
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
            id="inline-7NRMz5kJUIxJuRh7ToGv"
            title="PLA Wheel Pre-Result Form"
            className="w-full border-0"
            style={{
              minHeight: "650px",
              width: "100%",
            }}
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="PLA Wheel Pre-Result Form"
            data-layout-iframe-id="inline-7NRMz5kJUIxJuRh7ToGv"
            data-form-id="7NRMz5kJUIxJuRh7ToGv"
          />
        </div>

        {/* Privacy Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Shield className="h-3.5 w-3.5 text-[#D4A44B]" />
          <span>No spam. Your results are private.</span>
        </div>
      </div>
    </section>
  );
}