import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Camera, ExternalLink, Info, Sparkles } from "lucide-react";
import { BRAND_INFO } from "../config/gifts";

export default function PrizeRevealModal({ customerName, customerId, prize }) {
  const [stage, setStage] = useState("shaking");
  const instagramUrl =
    "https://www.instagram.com/sj._atelier_23?rpxt=ejYyY3B0NXkyanUw";

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setStage("opening");
      confetti({
        particleCount: 100,
        spread: 80,
        startVelocity: 42,
        origin: { y: 0.55 },
        colors: ["#f43f5e", "#fb7185", "#fbbf24", "#f9a8d4", "#ffffff"],
      });
    }, 550);

    const revealTimer = setTimeout(() => {
      setStage("revealed");
    }, 1250);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  if (stage !== "revealed") {
    return (
      <div className="py-10 flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
          {stage === "opening" && (
            <>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-300 via-rose-400 to-pink-200 blur-2xl animate-light-burst pointer-events-none" />
              <div className="relative z-20 flex flex-col items-center justify-center animate-bounce">
                {prize.image ? (
                  <div
                    className={`w-20 h-20 rounded-full p-2 flex items-center justify-center shadow-lg border border-rose-200 ${
                      prize.darkBg ? "bg-stone-950" : "bg-white"
                    }`}
                  >
                    <img
                      src={prize.image}
                      alt={prize.name}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                ) : (
                  <span className="text-5xl drop-shadow-md">{prize.emoji}</span>
                )}
                <span className="mt-1.5 px-3 py-0.5 rounded-full bg-white/95 text-rose-700 text-xs font-bold shadow">
                  {prize.name}
                </span>
              </div>
            </>
          )}

          <img
            src="/mystery-box.jpg"
            alt="Gift Box Lid"
            style={{ clipPath: "inset(0 0 52% 0)" }}
            className={`absolute inset-0 w-full h-full object-contain rounded-2xl pointer-events-none ${
              stage === "shaking" ? "animate-box-shake" : "animate-lid-fly"
            }`}
          />

          <img
            src="/mystery-box.jpg"
            alt="Gift Box Base"
            style={{ clipPath: "inset(47.5% 0 0 0)" }}
            className={`absolute inset-0 w-full h-full object-contain rounded-2xl pointer-events-none ${
              stage === "shaking" ? "animate-box-shake" : "animate-base-drop"
            }`}
          />
        </div>

        <p className="mt-6 text-sm font-semibold text-rose-600 flex items-center gap-1.5 animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>
            {stage === "shaking"
              ? "Unsealing your mystery box..."
              : "Surprise unlocked!"}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="py-2 text-center space-y-5 animate-card-emerge">
      {/* Product Photo or Studs Emoji Badge */}
      {prize.image ? (
        <div
          className={`w-28 h-28 mx-auto rounded-full p-2.5 border-2 border-rose-200 flex items-center justify-center shadow-md shadow-rose-200/60 overflow-hidden ${ prize.darkBg ? "bg-stone-950" : "bg-gradient-to-br from-white via-rose-50 to-amber-50" }`} > <img src={prize.image} alt={prize.name} className="w-full h-full object-contain rounded-full transition-transform duration-300 hover:scale-105" /> </div> ) : ( <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-rose-100 to-amber-100 border border-rose-200 flex items-center justify-center text-4xl shadow-inner animate-bounce"> {prize.emoji} </div> )}  <div> <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2"> <CheckCircle2 className="w-3.5 h-3.5" /> <span>Entry Recorded</span> </div> <h2 className="text-2xl font-bold text-stone-900"> Congratulations, {customerName}! </h2> <p className="text-sm text-stone-500 mt-1"> You unlocked a handmade gift from {BRAND_INFO.name}: </p> </div>  <div className={`p-5 rounded-2xl bg-gradient-to-r ${prize.accent} border border-rose-200/80 shadow-sm`}
      >
        <p className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-1">
          Your Won Gift
        </p>
        <p className="text-xl sm:text-2xl font-bold text-rose-900">
          {prize.name}
        </p>
        <div className="mt-3 pt-3 border-t border-rose-200/60 flex items-center justify-center gap-2 text-xs text-stone-600">
          <span>Customer ID:</span>
          <span className="font-mono font-bold text-stone-900 bg-white/80 px-2.5 py-0.5 rounded-md border border-rose-200/60">
            {customerId}
          </span>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3 text-left">
        <div className="flex items-start gap-2.5">
          <Camera className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <p className="text-xs text-stone-600 leading-relaxed">
            Take a{" "}
            <span className="font-semibold text-stone-900">screenshot</span> of
            this screen and DM it to{" "}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-rose-600 underline hover:text-rose-700"
            >
              {BRAND_INFO.instagramHandle}
            </a>{" "}
            on Instagram to verify your Customer ID and claim your gift!
          </p>
        </div>

        <div className="flex items-start gap-2 pt-2.5 border-t border-stone-200/70">
          <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-stone-500 leading-relaxed">
            <span className="font-semibold text-stone-700">Note:</span>{" "}
            Customization is not available for the giveaway gifts provided.
          </p>
        </div>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span>Open {BRAND_INFO.instagramHandle} on Instagram</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
} 