export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <div className="mb-8">
           <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-serif font-semibold max-w-xl">
            You may be carrying
            <br />
            more{" "}
            <span className="text-[#D9A44A] font-semibold inline-block w-auto">
              value
            </span>{" "}
            than your
            <br />
            career currently reflects.
          </h1>
            <p className="mt-8 text-xl text-gray-300 max-w-xl">
              The Professional Leverage Blind Spot Diagnostic helps
              experienced professionals uncover hidden gaps in clarity,
              positioning, trust and leverage.
            </p>
          </div>

          <a href="/wheel" className="inline-block bg-[#D9A44A] text-black font-semibold px-8 py-4 rounded-md hover:bg-[#c89435] transition">
            Start Your Free 5-Minute Diagnostic →
          </a>

          <div className="mt-8 flex items-center gap-3 text-gray-400">
            <span><svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  width="48" 
  height="48" 
  fill="none"
>
  <path 
    d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" 
    stroke="#D4AF37" 
    stroke-width="2" 
    stroke-linejoin="round"
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
</svg></span>
            <p>
              Used by ambitious professionals navigating growth,
              transition and next-level decisions.
            </p>
          </div>
        </div>

       <div className="relative w-full h-[600px]">
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
