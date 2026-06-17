const items = [
  {
    title: "Identity Clarity",
    text: "Do you clearly understand what makes you professionally valuable?"
  },
  {
    title: "Positioning Strength",
    text: "Is your value visible, legible and differentiated?"
  },
  {
    title: "Trust Patterns",
    text: "Where does trust repeatedly form around you?"
  },
  {
    title: "Hidden Leverage",
    text: "What strengths may be quietly underused?"
  }
];

export default function RevealSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <h2 className="text-center text-[#D9A44A] text-3xl font-serif mb-14">
        WHAT THIS REVEALS
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="border border-[#D9A44A]/20
            rounded-lg p-8 bg-[#0b1220]"
          >
            <div className="text-4xl mb-5">◎</div>

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