import React, { useState } from "react";
import { Sparkles } from "lucide-react";

export default function GiftBoxGrid({
  customerName,
  gifts,
  selectedBoxIndex,
  onSelectBox,
  loading,
  openingPrize,
}) {
  const [tappedIndex, setTappedIndex] = useState(null);

  const handleBoxClick = (index) => {
    if (
      loading ||
      selectedBoxIndex !== null ||
      tappedIndex !== null ||
      openingPrize
    ) {
      return;
    }

    setTappedIndex(index);
    setTimeout(() => {
      onSelectBox(index);
    }, 350);
  };

  return (
    <div className="text-center">
      <p className="text-sm sm:text-base text-stone-600 mb-6">
        Welcome,{" "}
        <span className="font-semibold text-stone-900">{customerName}</span>!
        Tap{" "}
        <span className="font-semibold text-rose-600">
          any 1 mystery box
        </span>{" "}
        below to open your gift:
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
        {gifts.map((gift, index) => {
          const isSelected =
            selectedBoxIndex === index || tappedIndex === index;
          const isLidOpening = isSelected && Boolean(openingPrize);
          const isShaking = isSelected && !openingPrize;
          const isOtherBox =
            (selectedBoxIndex !== null || tappedIndex !== null) && !isSelected;

          return (
            <button
              key={gift.id}
              type="button"
              onClick={() => handleBoxClick(index)}
              disabled={
                loading || selectedBoxIndex !== null || tappedIndex !== null
              }
              className={`group relative rounded-2xl border-2 flex flex-col items-center justify-between p-3 transition-all duration-300 cursor-pointer overflow-visible ${
                isLidOpening
                  ? "border-amber-400 bg-stone-950 scale-110 shadow-2xl shadow-amber-300/80 z-20"
                  : isSelected
                  ? "border-rose-500 bg-stone-950 scale-105 shadow-xl shadow-rose-300/60 z-10"
                  : isOtherBox
                  ? "border-stone-200 bg-stone-900/80 opacity-35 scale-95 cursor-not-allowed"
                  : "border-rose-200/90 bg-stone-950 hover:-translate-y-1.5 hover:border-rose-400 hover:shadow-lg hover:shadow-rose-200/70 active:scale-95"
              }`}
            >
              {/* Golden Glow Burst When Box Opens */}
              {isLidOpening && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-rose-500/40 via-amber-300/35 to-amber-100/20 animate-pulse pointer-events-none" />
              )}

              {/* Split 3D Mystery Box Container */}
              <div
                className={`relative w-full aspect-square flex items-center justify-center p-1 ${
                  isShaking ? "animate-box-wiggle" : ""
                }`}
              >
                {/* Rising Gift Preview Inside the Open Box */}
                {isLidOpening && openingPrize && (
                  <div className="absolute inset-x-0 top-1 z-30 flex flex-col items-center justify-center animate-prize-rise pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 border-2 border-amber-300 shadow-lg flex items-center justify-center text-3xl">
                      {openingPrize.emoji}
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-extrabold shadow">
                      {openingPrize.name}
                    </span>
                  </div>
                )}

                {/* Top Ribbon Lid (Top 43% of image - pops upward & tilts open) */}
                <img
                  src="/mystery-box.jpeg"
                  alt=""
                  aria-hidden="true"
                  style={{ clipPath: "inset(0 0 57% 0)" }}
                  className={`absolute inset-1 w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] object-contain rounded-xl z-20 transition-transform duration-300 ${
                    isLidOpening
                      ? "animate-lid-open"
                      : "group-hover:scale-105 group-hover:-rotate-2"
                  }`}
                />

                {/* Bottom Box Base (Bottom 57% of image - stays anchored) */}
                <img
                  src="/mystery-box.jpeg"
                  alt={`Mystery Box #${index + 1}`}
                  style={{ clipPath: "inset(43% 0 0 0)" }}
                  className={`w-full h-full object-contain rounded-xl z-10 transition-transform duration-300 ${
                    isLidOpening
                      ? "scale-105 brightness-110"
                      : "group-hover:scale-105 group-hover:-rotate-2"
                  }`}
                />
              </div>

              {/* Label Footer */}
              <div className="relative z-10 w-full pt-1.5 pb-0.5 flex flex-col items-center">
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-1">
                  {isSelected && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                  )}
                  Box #{index + 1}
                </span>
                <span className="text-[11px] text-rose-200/90 font-medium">
                  {isLidOpening
                    ? "Unlocked!"
                    : isSelected
                    ? "Opening gift..."
                    : "Tap to open"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}