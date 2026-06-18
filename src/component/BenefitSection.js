import icon2 from "./icon2.png";

const benefits = [
  { text: "Your Professional Pattern", iconPosition: "0% center" },
  { text: "Hidden risks slowing you down", iconPosition: "25% center" },
  { text: "Untapped value", iconPosition: "50% center" },
  { text: "What your scores reveal", iconPosition: "75% center" },
  { text: "Deeper interpretation", iconPosition: "100% center" }
];

export default function BenefitsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">

      <div className="flex items-center gap-4 mb-14">
        <div className="flex-1 h-px bg-[#D9A44A]" />
        <h2 className="text-[#D9A44A] text-3xl font-serif whitespace-nowrap">
          WHAT YOU'LL GET
        </h2>
        <div className="flex-1 h-px bg-[#D9A44A]" />
      </div>

      <div className="grid md:grid-cols-5 gap-6 text-center">

        {benefits.map((item) => (
          <div
            key={item.text}
            className="border-r border-[#D9A44A]/20 last:border-none"
          >
            <div
              className="w-24 h-[164px] mb-4 mx-auto bg-no-repeat"
              style={{
                backgroundImage: `url(${icon2})`,
                backgroundSize: "500% 100%",
                backgroundPosition: item.iconPosition
              }}
            />

            <p className="text-gray-300">
              {item.text}
            </p>
          </div>
        ))}

      </div>

      <div className="mt-20 text-center max-w-[18.75rem] mx-auto border-t border-b border-[#D9A44A]/20 py-10">
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