export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-serif max-w-xl">
              You may be carrying
              <br />
              more <span className="text-[#D9A44A]">value</span> than your
              <br />
              career currently reflects.
            </h1>

            <p className="mt-8 text-xl text-gray-300 max-w-xl">
              The Professional Leverage Blind Spot Diagnostic helps
              experienced professionals uncover hidden gaps in clarity,
              positioning, trust and leverage.
            </p>
          </div>

          <a href="/wheel" className="inline-block bg-orange-500 text-black font-semibold px-8 py-4 rounded-md hover:bg-orange-600 transition">
            Start Your Free 5-Minute Diagnostic →
          </a>

          <div className="mt-8 flex items-center gap-3 text-gray-400">
            <span>🛡️</span>
            <p>
              Used by ambitious professionals navigating growth,
              transition and next-level decisions.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-[#111827] to-[#05070d]
          border border-[#D9A44A]/20 rounded-xl p-8 shadow-2xl">

            <p className="uppercase text-[#D9A44A] text-sm tracking-widest">
              Your Professional Pattern
            </p>

            <h3 className="text-4xl font-serif mt-4">
              Trusted But
              <br />
              Under-Positioned
            </h3>

            <div className="space-y-6 mt-8">

              <div>
                <h4 className="text-[#D9A44A] font-semibold">
                  What This Suggests
                </h4>
                <p className="text-gray-400">
                  Strong evidence and trust. Weak translation and positioning.
                </p>
              </div>

              <div>
                <h4 className="text-[#D9A44A] font-semibold">
                  Quiet Cost
                </h4>
                <p className="text-gray-400">
                  Hidden value staying hidden.
                </p>
              </div>

              <div>
                <h4 className="text-[#D9A44A] font-semibold">
                  Potential Opening
                </h4>
                <p className="text-gray-400">
                  Sharper positioning. Better next moves.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
