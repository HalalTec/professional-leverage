import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const descriptions = {
  "Identity Clarity": [
    ["You mostly describe your job, not who you are.", "Your deeper edge feels hard to name.", "Your full professional story still feels unclear."],
    ["You can explain your experience, but not your deeper pattern.", "Your identity still feels tied to titles and roles.", "You know you have value, but your edge is still fuzzy."],
    ["You know who you are, but some parts are still hard to explain.", "Your story is strong, but not fully sharp yet.", "Some deeper value may still be sitting in the background."],
    ["You know your professional identity very well.", "Your deeper value is easy to name.", "Your career feels clear and grounded."]
  ],
  "Value Articulation": [
    ["It is hard to explain what you really bring.", "People may not quickly see your strongest value.", "Your message may feel vague."],
    ["You can explain your value, but it takes time.", "Your message is not always sharp enough.", "People need extra time to understand your best value."],
    ["Your value is mostly clear.", "You explain yourself well, but it could be tighter.", "Some parts of your message still need sharpening."],
    ["People quickly understand your value.", "Your message is easy to explain.", "What you bring feels clear and strong."]
  ],
  "Evidence Visibility": [
    ["Your wins feel buried.", "Your proof is not well gathered.", "It may be hard to show strong examples quickly."],
    ["You have proof, but some of it is scattered.", "Not all of your strongest work is easy to find.", "Some key evidence may still be hidden."],
    ["Your proof is strong.", "Some important wins may still be missing.", "Your evidence is good, but not fully organized."],
    ["Your proof is easy to find.", "Your best wins are well gathered.", "You can quickly show strong evidence of your value."]
  ],
  "Signature Strength Recognition": [
    ["You may not know your strongest repeat strengths.", "What comes easy may not feel valuable.", "Your best abilities may still be hard to spot."],
    ["You know some strengths, but not the full pattern.", "Some key strengths still feel too normal.", "You may be missing your biggest advantages."],
    ["Your strengths are mostly clear.", "Some familiar strengths may still be easy to overlook.", "There may still be hidden strengths in plain sight."],
    ["You know your strongest abilities well.", "You can spot your strengths fast.", "You know what keeps driving your best results."]
  ],
  "Trust Pattern Awareness": [
    ["You may not notice your trust patterns.", "The same problems may keep coming to you.", "You may not yet see what that means."],
    ["You see some trust patterns, but not all.", "People rely on you in ways you may not fully notice.", "The pattern is there, but still blurry."],
    ["You can see what people trust you with.", "The pattern is mostly clear.", "There may still be deeper meaning inside it."],
    ["You clearly know what people trust you with.", "The trust pattern is easy to spot.", "You can clearly see where your value is strongest."]
  ],
  "Positioning Strength": [
    ["Your outside image may feel smaller than your real value.", "People may not quickly see the depth you bring.", "Your positioning may be holding your career back."],
    ["Some of your value is visible, but not all of it.", "Important parts of your story may still be missing.", "You may not fully sound like the level you've reached."],
    ["Your positioning is strong, but not complete.", "People can see your value, but maybe not your full depth.", "There may still be stronger ways to frame what you do."],
    ["Your outside image matches your real value well.", "People quickly understand your depth.", "Your positioning feels strong, clear, and credible."]
  ],
  "Next-Move Clarity": [
    ["Your next move feels foggy or stuck.", "You may know you want more, but not what comes next.", "Too many choices may be creating pressure."],
    ["You have good options, but no clear best one.", "You may feel pulled in different directions.", "Your next step still needs sharper shape."],
    ["Your direction is mostly clear.", "You still have some open questions.", "The path ahead feels real, but not fully locked in."],
    ["Your next move feels clear and grounded.", "You know what path makes the most sense.", "Your decision feels steady, not uncertain."]
  ],
  "Leverage Utilization": [
    ["A lot of your energy may be going into low-return work.", "Your strongest assets may not be fully used.", "You may be working hard without enough return."],
    ["Some of your strengths are working well, but not all.", "There may be more upside than your current setup is capturing.", "Your effort may not be aimed at your highest-return work yet."],
    ["Your leverage is strong, but not fully stretched.", "You are using your strengths well, but there may still be more in them.", "There may still be room to raise your return."],
    ["Your strongest assets are being used in smart ways.", "Your effort feels well placed.", "Your experience is likely compounding well."]
  ]
};

const bands = ["1–3", "4–6", "7–8", "9–10"];
const getBandIndex = (score) => score <= 3 ? 0 : score <= 6 ? 1 : score <= 8 ? 2 : 3;

export default function ResultCard({ category, score, onAdjust, onConfirm }) {
  const bandIndex = getBandIndex(score);
  const bullets = descriptions[category]?.[bandIndex] ?? [];

  return (
    <section className="w-full mt-12 flex flex-col items-center" aria-live="polite">
      <div className="w-full max-w-5xl mx-auto bg-[#07111D] border border-[#1E293B] rounded-xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex justify-center md:justify-start">
            <div className="w-12 h-12 shrink-0 rounded-full border border-[#D4A24A]/30 bg-[#0A1625] flex items-center justify-center">
              <Sparkles className="text-[#D4A24A]" size={22} />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-[#D4A24A] text-xl md:text-2xl font-semibold mb-4">A {bands[bandIndex]} in {category} often looks like:</h2>
            <ul className="space-y-3 text-gray-300 text-sm md:text-base leading-relaxed">
              {bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="text-[#D4A24A]">•</span><span>{bullet}</span></li>)}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1E293B] my-8" />
        <div className="grid md:grid-cols-2 gap-4">
         <button type="button" onClick={onAdjust}
  className="!border !border-[#D4A24A] !bg-transparent !text-[#D4A24A] !h-14 !px-6 !rounded-md !font-medium !flex !items-center !justify-center hover:!bg-[#D4A24A]/10 !transition"
>
  Adjust Score
</button>
          <button type="button" onClick={onConfirm} className="!bg-[#D4A24A] !text-black !py-4 !rounded-md !font-medium !flex !items-center !justify-center !gap-2 hover:!bg-[#C99635] !transition">Feels Accurate <ArrowRight size={18} /></button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-sm">
        <ShieldCheck size={16} className="text-[#D4A24A]" /><span>Your results are for your eyes only.</span>
      </div>
    </section>
  );
}
