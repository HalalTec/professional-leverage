import icons from "./icons.png";

const items = [
  {
    title: "Identity Clarity",
    text: "Do you clearly understand what makes you professionally valuable?",
    iconPosition: "0% 0%"
  },
  {
    title: "Positioning Strength",
    text: "Is your value visible, legible and differentiated?",
    iconPosition: "100% 0%"
  },
  {
    title: "Trust Patterns",
    text: "Where does trust repeatedly form around you?",
    iconPosition: "0% 100%"
  },
  {
    title: "Hidden Leverage",
    text: "What strengths may be quietly underused?",
    iconPosition: "100% 100%"
  }
];

export default function RevealSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="flex items-center gap-4 mb-14">
        <div className="flex-1 h-px bg-[#D9A44A]" />
        <h2 className="text-[#D9A44A] text-3xl font-serif whitespace-nowrap">
          WHAT THIS REVEALS
        </h2>
        <div className="flex-1 h-px bg-[#D9A44A]" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="border border-[#D9A44A]/20
            rounded-lg p-8 bg-[#0b1220]"
          >
            <div
              className="w-[108px] h-[72px] mb-5 mx-auto bg-no-repeat"
              style={{
                backgroundImage: `url(${icons})`,
                backgroundSize: "200% 200%",
                backgroundPosition: item.iconPosition
              }}
            />

            <h3 className="text-[#D9A44A] uppercase tracking-widest text-sm">
              {item.title}
            </h3>

            <p className="mt-4 text-gray-400">
              {item.text}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}