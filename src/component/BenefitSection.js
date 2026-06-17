const benefits = [
  "Your Professional Pattern",
  "Hidden risks slowing you down",
  "Untapped value",
  "What your scores reveal",
  "Deeper interpretation"
];

export default function BenefitsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">

      <h2 className="text-center text-[#D9A44A] text-3xl font-serif mb-14">
        WHAT YOU'LL GET
      </h2>

      <div className="grid md:grid-cols-5 gap-6 text-center">

        {benefits.map((item) => (
          <div
            key={item}
            className="border-r border-[#D9A44A]/20 last:border-none"
          >
            <div className="text-4xl mb-4">◈</div>

            <p className="text-gray-300">
              {item}
            </p>
          </div>
        ))}

      </div>

      <div className="mt-20 text-center max-w-2xl mx-auto">
        <p className="text-4xl font-serif leading-relaxed">
          No fluff.
          <br />
          No personality test.
          <br />
          No generic advice.
        </p>

        <p className="mt-8 text-gray-400">
          Just a sharper read on where your career may be carrying hidden friction.
        </p>
      </div>

    </section>
  );
}