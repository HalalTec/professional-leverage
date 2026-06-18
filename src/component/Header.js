import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-black border-b border-[#1f2937]">
      <div className="max-w-7xl w-full px-3 sm:px-8 py-3 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">

        {/* Logo */}
        <div className="flex items-center gap-2">

          <div className="border border-[#D4A24A] flex items-center justify-center text-[#D4A24A] font-serif text-[9px] sm:text-xl px-2 py-1 shrink-0">
            PL
          </div>

          <div className="flex flex-col leading-none">

            <h1 className="text-[#D4A24A] font-bold text-[9px] sm:text-xl tracking-[0.06em] sm:tracking-wider leading-none">
              PROFLEVERAGE
            </h1>

            <p className="text-[5px] sm:text-[6px] text-gray-400 tracking-[0.08em] sm:tracking-[0.15em] mt-[2px] leading-none">
              CLARITY. LEVERAGE. NEXT LEVEL.
            </p>

          </div>
        </div>

        {/* Confidentiality */}
        <div className="flex items-center gap-1 text-gray-400 text-[9px] sm:text-sm">

          <Shield size={11} className="sm:hidden shrink-0" />
          <Shield size={16} className="hidden sm:block shrink-0" />

          <span className="whitespace-nowrap leading-none">
            Your responses are confidential
          </span>

        </div>

      </div>
    </header>
  );
};

export default Header;