export default function CTASection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24 text-center border border-[#D9A44A]/60 rounded-2xl">

      <p className="text-[#D9A44A] uppercase tracking-widest text-sm mb-6">
        Free · 5 Minutes · No Fluff
      </p>

      <h2 className="text-4xl lg:text-5xl font-serif leading-tight mb-10">
        Ready to see your
        <br />
        professional pattern?
      </h2>

      <button
        className="bg-[#D9A44A] text-black font-semibold px-10 py-4 rounded-md hover:bg-[#c89435] transition text-lg"
        onClick={() => window.location.href = '/wheel'}
      >
        Start Your Free Diagnostic →
      </button>

      <p className="mt-8 text-gray-500 text-sm">
        Takes 5 minutes. Insight lasts much longer.
      </p>

    </section>
  );
}
