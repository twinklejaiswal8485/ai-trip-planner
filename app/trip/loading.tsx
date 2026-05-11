// app/trip/[id]/loading.tsx
import { Loader2 } from "lucide-react";
export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
      <div className="relative flex flex-col items-center">
        {/* A smooth spinning animation */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-900 mb-6"></div>
        <h2 className="text-2xl font-serif text-slate-800 animate-pulse">
          Crafting your perfect escape...
        </h2>
        <p className="text-slate-500 mt-2 text-sm">
          Our AI is exploring activities, restaurants, and hidden gems.
        </p>
      </div>
    </main>
  );
}