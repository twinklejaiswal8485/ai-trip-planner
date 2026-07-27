"use client";
import { useEffect, useState } from "react";
import { Compass } from "lucide-react";

const loadingPhrases = [
  "Curating your personalized experience...",
  "Discovering hidden local gems...",
  "Finding the best culinary delights...",
  "Optimizing your travel routes...",
  "Finalizing your perfect itinerary..."
];

export default function Loading() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-stone-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <div className="relative flex flex-col items-center max-w-md w-full text-center px-6">
        <div className="relative mb-12">
          {/* Subtle glowing ring behind */}
          <div className="absolute inset-0 rounded-full blur-xl bg-emerald-500/20 animate-pulse"></div>
          
          {/* Main Icon container */}
          <div className="relative w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center border border-stone-100">
            <Compass className="w-12 h-12 text-emerald-700 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>
        
        <h2 className="text-3xl font-serif text-stone-900 mb-4 tracking-wide">
          Crafting Your Journey
        </h2>
        
        {/* Animated phrases wrapper */}
        <div className="h-8 overflow-hidden relative w-full">
          {loadingPhrases.map((phrase, index) => (
            <p 
              key={index}
              className={`absolute w-full text-stone-500 text-lg transition-all duration-700 ease-in-out ${
                index === phraseIndex 
                  ? 'opacity-100 translate-y-0' 
                  : index < phraseIndex 
                    ? 'opacity-0 -translate-y-8'
                    : 'opacity-0 translate-y-8'
              }`}
            >
              {phrase}
            </p>
          ))}
        </div>
        
        {/* Simple progress bar */}
        <div className="w-48 h-1 bg-stone-200 rounded-full mt-12 overflow-hidden">
          <div className="h-full bg-emerald-600 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
      
      {/* Custom style for the indeterminate progress bar */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% { transform: translateX(-100%); width: 50%; }
          100% { transform: translateX(200%); width: 50%; }
        }
      `}} />
    </main>
  );
}