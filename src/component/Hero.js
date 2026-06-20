export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-0 pb-0 mb-0">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        <div className="max-w-2xl">
  {/* Hero Text */}
  <div className="mb-10">
    <h1 className="font-['Cormorant_Garamond'] text-[48px] md:text-[64px] leading-[1.05] tracking-[-0.03em] font-medium text-white">
      You may be carrying
      <br />
      more{" "}
      <span className="text-[#D9A44A]">
        value
      </span>{" "}
      than your
      <br />
      career currently reflects.
    </h1>

    <p className="mt-8 text-[18px] leading-[1.8] text-gray-400 max-w-xl">
      The Professional Leverage Blind Spot Diagnostic™ helps
      experienced professionals uncover hidden gaps in clarity,
      positioning, trust, and leverage — in just 5 minutes.
    </p>
  </div>

  {/* CTA Button */}
  <a
    href="/wheel"
    className="inline-flex items-center gap-3 bg-[#D9A44A] text-black font-semibold px-8 py-4 rounded-md hover:bg-[#C4975B] transition duration-300"
  >
    Start Your Free 5-Minute Diagnostic
    <span className="text-xl">→</span>
  </a>

  {/* Footer Note */}
  <div className="mt-8 flex items-start gap-4 text-gray-400 max-w-lg">
    <div className="shrink-0 mt-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
      >
        <path
          d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 7V17L17 12H14V9L12 7Z"
          fill="#D4AF37"
          opacity="0.9"
        />
        <path
          d="M12 17V12L7 9V14L12 17Z"
          fill="#D4AF37"
          opacity="0.6"
        />
      </svg>
    </div>

    <p className="text-[16px] leading-[1.7]">
      Used by ambitious professionals navigating growth,
      transition, and next-level decisions.
    </p>
  </div>
</div>

       <div className="relative w-full h-full">
      <img
        src={require('./side.png')}
        alt="Professional Leverage"
        className="w-full h-full object-contain rounded-xl"
      />
    </div>

      </div>
    </section>
  );
}
