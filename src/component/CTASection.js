import { Lock } from "lucide-react";

export default function CTASection() {
  return (
    <section className="w-full mb-0 bg-[#050B14] px-6 pt-20 pb-0">
      <div className="max-w-6xl mx-auto">

        {/* Main Card */}
        <div className="relative border border-[#3A2E20] rounded-md bg-[#07111B] pt-16 pb-10 px-8 md:px-16 text-center">

          {/* PL Circle Connected To Top Border */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-[#C89B43] bg-[#07111B] flex items-center justify-center text-[#C89B43] font-serif text-xl">
            PL
          </div>

          {/* Title */}
          <h2 className="text-center text-white font-serif text-[28px] md:text-[42px] font-light tracking-tight leading-tight">
            Ready to uncover what’s been hidden?
          </h2>

          {/* Button */}
          <a
            href="/wheel"
            className="inline-block mt-8 bg-[#D9A44A] text-black font-semibold px-8 py-4 rounded-md hover:bg-[#c89435] transition"
          >
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