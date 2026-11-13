import React from "react";
import { Gift, ArrowRight, Sparkles, ShieldCheck, Camera } from "lucide-react";
import { GIFTS, BRAND_INFO } from "../config/gifts";

export default function WelcomeHome({ onStart }) {
  return (
    <div className="text-center space-y-5">
      {/* Boutique Welcome Message */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50/90 via-pink-50/60 to-amber-50/70 border border-rose-200/70 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>A Little Thank You From Us</span>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Thank you for supporting{" "}
          <span className="font-semibold text-stone-900">{BRAND_INFO.name}</span>!
          Every verified customer gets{" "}
          <span className="font-semibold text-rose-600">1 free mystery gift</span>{" "}
          from our handcrafted collection.
        </p>
      </div>

      {/* 5 Possible Gifts Preview Strip */}
      <div>
        <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-2.5">
          What&apos;s Inside the Mystery Boxes
        </p>
        <div className="grid grid-cols-5 gap-2">
          {GIFTS.map((gift) => (
            <div
              key={gift.id}
              className="flex flex-col items-center gap-1.5 p-1.5 rounded-xl bg-stone-50/90 border border-stone-200/70"
            >
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full p-1 flex items-center justify-center border border-rose-200/80 shadow-xs overflow-hidden ${
                  gift.darkBg ? "bg-stone-950" : "bg-white"
                }`}
              >
                {gift.image ? (
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-full object-contain rounded-full"
                  />
                ) : (
                  <span className="text-lg">{gift.emoji}</span>
                )}
              </div>
              <span className="text-[10px] font-medium text-stone-700 leading-tight line-clamp-2">
                {gift.name.replace("Handmade ", "")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Quick Steps */}
      <div className="grid grid-cols-3 gap-2 pt-1 text-left">
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
          <ShieldCheck className="w-4 h-4 text-rose-500 mb-1" />
          <p className="text-[11px] font-semibold text-stone-800">1. Verify ID</p>
          <p className="text-[10px] text-stone-500 leading-snug">
            Enter your Name &amp; Customer ID
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
          <Gift className="w-4 h-4 text-rose-500 mb-1" />
          <p className="text-[11px] font-semibold text-stone-800">2. Pick Box</p>
          <p className="text-[10px] text-stone-500 leading-snug">
            Tap 1 of 5 boxes to unseal
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
          <Camera className="w-4 h-4 text-rose-500 mb-1" />
          <p className="text-[11px] font-semibold text-stone-800">3. Claim Gift</p>
          <p className="text-[10px] text-stone-500 leading-snug">
            DM screenshot on Instagram
          </p>
        </div>
      </div>

      {/* Enter Login Page CTA Button */}
      <div className="pt-1 space-y-2">
        <button
          type="button"
          onClick={onStart}
          className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm shadow-md shadow-rose-200/80 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
        >
          <span>Enter Lucky Draw</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-[11px] text-stone-400">
          1 entry per Customer ID • Giveaway gifts cannot be customized
        </p>
      </div>
    </div>
  );
}