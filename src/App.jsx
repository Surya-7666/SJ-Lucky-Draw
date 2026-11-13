import React, { useState } from "react";
import Header from "./components/Header";
import WelcomeHome from "./components/WelcomeHome";
import EntryForm from "./components/EntryForm";
import GiftBoxGrid from "./components/GiftBoxGrid";
import PrizeRevealModal from "./components/PrizeRevealModal";
import { GIFTS } from "./config/gifts";
import { checkCustomerId, submitWinner } from "./services/sheetsApi";

export default function App() {
  const [step, setStep] = useState("home"); // "home" | "form" | "boxes" | "reveal"
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [wonPrize, setWonPrize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyEntry = async (name, id) => {
    setError("");
    setLoading(true);
    try {
      const cleanName = name.trim();
      const cleanId = id.trim().toUpperCase();

      const res = await checkCustomerId(cleanName, cleanId);

      if (res.status === "duplicate") {
        setError(
          res.message ||
            "This Customer ID has already participated in the lucky draw!"
        );
        return;
      }

      if (res.status !== "valid") {
        setError(res.message || "Unable to verify Customer ID.");
        return;
      }

      setCustomerName(cleanName);
      setCustomerId(cleanId);
      setStep("boxes");
    } catch (err) {
      setError(err.message || "Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBox = async (boxIndex) => {
    if (loading || selectedBoxIndex !== null) return;

    setError("");
    setSelectedBoxIndex(boxIndex);
    setLoading(true);

    const randomPrize = GIFTS[Math.floor(Math.random() * GIFTS.length)];

    try {
      const res = await submitWinner(
        customerName,
        customerId,
        randomPrize.name
      );

      if (res.status === "duplicate") {
        setSelectedBoxIndex(null);
        setError(
          res.message ||
            "This Customer ID has already participated in the lucky draw!"
        );
        setStep("form");
        return;
      }

      if (res.status !== "success") {
        setSelectedBoxIndex(null);
        setError(res.message || "Could not record your entry. Try again.");
        return;
      }

      setWonPrize(randomPrize);
      setStep("reveal");
    } catch (err) {
      setSelectedBoxIndex(null);
      setError(err.message || "Failed to submit your entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50/70 to-amber-50/60 flex items-center justify-center p-4 sm:p-6">
      <main className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-200/50 border border-rose-100 p-6 sm:p-8 transition-all">
        <Header />

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium text-center">
            {error}
          </div>
        )}

        {step === "home" && (
          <WelcomeHome
            onStart={() => {
              setError("");
              setStep("form");
            }}
          />
        )}

       {step === "form" && (
          <EntryForm
            onVerify={handleVerifyEntry}
            loading={loading}
            onBack={() => {
              setError("");
              setStep("home");
            }}
          />
        )}

        {step === "boxes" && (
          <GiftBoxGrid
            customerName={customerName}
            gifts={GIFTS}
            selectedBoxIndex={selectedBoxIndex}
            onSelectBox={handleSelectBox}
            loading={loading}
          />
        )}

        {step === "reveal" && wonPrize && (
          <PrizeRevealModal
            customerName={customerName}
            customerId={customerId}
            prize={wonPrize}
          />
        )}
      </main>
    </div>
  );
}