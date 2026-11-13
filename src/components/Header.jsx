import React from "react";
import { Sparkles } from "lucide-react";
import { BRAND_INFO } from "../config/gifts";

export default function Header() {
  return (
    <header className="text-center mb-6">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-600 text-[11px] font-semibold tracking-wider uppercase mb-4">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Exclusive Customer Giveaway</span>
      </div>

      <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-3 rounded-full overflow-hidden bg-white shadow-md shadow-rose-200/50 border border-rose-100 p-1">
        <img
          src="/sj-logo.jpeg"
          alt={BRAND_INFO.name}
          className="w-full h-full object-contain rounded-full"
        />
      </div>

      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
        {BRAND_INFO.name}
      </h1>
      <p className="text-xs sm:text-sm text-stone-500 mt-1">
        {BRAND_INFO.tagline}
      </p>
    </header>
  );
}