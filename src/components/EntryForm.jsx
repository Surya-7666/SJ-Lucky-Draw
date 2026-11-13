import React, { useState } from "react";
import { Gift, Loader2, ShieldCheck } from "lucide-react";

export default function EntryForm({ onVerify, loading }) {
  const [name, setName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!name.trim()) {
      setLocalError("Please enter your full name.");
      return;
    }
    if (!customerId.trim()) {
      setLocalError("Please enter the Customer ID shared with you.");
      return;
    }

    onVerify(name.trim(), customerId.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {localError && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
          {localError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          Your Name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent bg-white text-stone-800 placeholder:text-stone-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          Order ID
        </label>
        <input
          type="text"
          placeholder="e.g., SJA-104"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent bg-white text-stone-800 uppercase font-mono tracking-wider placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-stone-400 transition"
        />
        <p className="flex items-center gap-1.5 text-xs text-stone-400 mt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>Each Order ID is valid for 1 lucky draw attempt only.</span>
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-3.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-[0.99] text-white font-semibold shadow-md shadow-rose-200/80 transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Verifying Customer ID...</span>
          </>
        ) : (
          <>
            <Gift className="w-5 h-5" />
            <span>Enter</span>
          </>
        )}
      </button>
    </form>
  );
}