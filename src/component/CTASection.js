import { Lock, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="w-full bg-[#050B14] px-6 py-20">
      <div className="max-w-6xl mx-auto relative">

        {/* Horizontal top lines */}
        <div className="absolute top-0 left-0 w-full flex items-center">
          <div className="flex-1 h-px bg-[#3E3222]" />

          {/* PL Circle */}
          <div className="w-14 h-14 rounded-full border border-[#C89B43] bg-[#050B14] flex items-center justify-center text-[#C89B43] font-serif text-xl mx-4 z-10">
            PL
          </div>

          <div className="flex-1 h-px bg-[#3E3222]" />
        </div>

        {/* Main Card */}
        <div className="border border-[#3A2E20] rounded-md bg-[#07111B] pt-16 pb-10 px-8 md:px-16 text-center">

          {/* Title */}
          <h2 className="text-center text-white font-serif text-[28px] md:text-[42px] font-light tracking-tight leading-tight">
            Ready to uncover what’s been hidden?
          </h2>

          {/* Button */}
         <a href="/wheel" className="inline-block mt-8 bg-[#D9A44A] text-black font-semibold px-8 py-4 rounded-md hover:bg-[#c89435] transition">
            Start Your Free 5-Minute Diagnostic →
          </a>
          {/* Footer Note */}
          <div className="flex items-center justify-center gap-2 mt-5 text-gray-400 text-sm">
            <Lock size={14} className="text-[#C89B43]" />
            <span>Your results are immediate.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
