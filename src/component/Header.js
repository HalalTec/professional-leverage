const Header = () => {
  return (
    <header className="bg-black border-b border-[#1f2937]">
      <div className="max-w-7xl w-full px-3 sm:px-8 py-3 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">

        {/* Logo */}
        <div className="flex items-center gap-2">

          <div className="border border-[#D4A24A] flex items-center justify-center text-[#D4A24A] font-serif text-xl px-2 py-1 shrink-0">
            PL
          </div>

          <div className="flex flex-col leading-none">

            <h1 className="text-[#D4A24A] font-bold !text-[10px] sm:!text-xs md:!text-xl tracking-[0.06em] md:tracking-wider leading-none">
              PROFLEVERAGE
            </h1>

            <p className="!text-[5px] md:!text-[6px] text-gray-400 tracking-[0.08em] md:tracking-[0.15em] mt-[2px] leading-none">
              CLARITY. LEVERAGE. NEXT LEVEL.
            </p>

          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;