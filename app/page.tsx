"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { generateItinerary } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Calendar, Users, Wallet, Sparkles, Compass, ShieldCheck, AlertCircle } from "lucide-react";
import RecentTrips from "@/components/RecentTrips";

export default function Home() {
  const [formData, setFormData] = useState({ destination: "", days: "", travelers: "", budget: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isFormComplete = Object.values(formData).every((val) => val.trim() !== "");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    // Client-side validation
    const dest = formData.destination.trim();
    const days = parseInt(formData.days);
    const travelers = parseInt(formData.travelers);
    const budgetStr = formData.budget.trim();

    if (dest.length < 2) {
      setFormError("Destination must be at least 2 characters long.");
      return;
    }
    if (isNaN(days) || days < 1 || days > 30) {
      setFormError("Duration must be between 1 and 30 days.");
      return;
    }
    if (isNaN(travelers) || travelers < 1 || travelers > 20) {
      setFormError("Number of travelers must be between 1 and 20.");
      return;
    }
    if (!budgetStr) {
      setFormError("Please provide a budget for your trip.");
      return;
    }

    setIsLoading(true);

    try {
      const submitData = new FormData(event.currentTarget);
      await generateItinerary(submitData);
    } catch (error: any) {
      console.error("Form submission failed:", error);
      setFormError(error.message || "Our AI encountered an issue crafting your trip. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar Placeholder */}
      <header className="absolute top-0 w-full z-50 px-6 lg:px-12 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Compass className="w-8 h-8 text-white" />
          <span className="text-2xl font-serif text-white font-bold tracking-tight">Wander AI</span>
        </div>
        <nav className="hidden md:flex gap-8 text-white/90 font-medium text-sm">
          <a href="#" className="hover:text-white transition-colors">Destinations</a>
          <a href="#" className="hover:text-white transition-colors">How it works</a>
          <a href="#" className="hover:text-white transition-colors">Testimonials</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main 
        className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2668&auto=format&fit=crop')" }}
      >
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wider mb-6 backdrop-blur-md border border-white/30">
            DISCOVER THE EXTRAORDINARY
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-lg">
            Your Dream Journey, <br className="hidden md:block"/>Curated by AI.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl font-light drop-shadow-md">
            Enter your destination, budget, and travel style. Our advanced AI will craft a bespoke, day-by-day itinerary in seconds.
          </p>

          <div className="w-full flex flex-col items-center gap-4">
            {/* Booking Bar Form */}
            <form 
              onSubmit={handleSubmit} 
              className="w-full bg-white/10 backdrop-blur-xl p-3 md:p-4 rounded-3xl md:rounded-full border border-white/20 shadow-2xl flex flex-col md:flex-row gap-3 md:gap-2 items-center"
            >
              {/* Destination Input */}
              <div className="relative flex-1 w-full group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors">
                  <MapPin size={20} />
                </div>
                <Input 
                  name="destination"
                  placeholder="Where to? (e.g., Kyoto)" 
                  className="h-14 pl-12 bg-white/10 border-transparent text-white placeholder:text-white/60 rounded-2xl md:rounded-full focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:bg-white/20 text-lg transition-all"
                  onChange={(e) => {
                    setFormError(null);
                    setFormData({ ...formData, destination: e.target.value });
                  }}
                  required
                />
              </div>
              
              <div className="hidden md:block w-px h-10 bg-white/20"></div>

              {/* Duration Input */}
              <div className="relative w-full md:w-36 group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors">
                  <Calendar size={20} />
                </div>
                <Input 
                  name="duration"
                  type="number"
                  min="1"
                  max="30"
                  placeholder="Days" 
                  className="h-14 pl-12 bg-white/10 border-transparent text-white placeholder:text-white/60 rounded-2xl md:rounded-full focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:bg-white/20 text-lg transition-all"
                  onChange={(e) => {
                    setFormError(null);
                    setFormData({ ...formData, days: e.target.value });
                  }}
                  required
                />
              </div>
              
              <div className="hidden md:block w-px h-10 bg-white/20"></div>

              {/* Travelers Input */}
              <div className="relative w-full md:w-40 group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors">
                  <Users size={20} />
                </div>
                <Input 
                  name="members"
                  type="number"
                  min="1"
                  max="20"
                  placeholder="Travelers" 
                  className="h-14 pl-12 bg-white/10 border-transparent text-white placeholder:text-white/60 rounded-2xl md:rounded-full focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:bg-white/20 text-lg transition-all"
                  onChange={(e) => {
                    setFormError(null);
                    setFormData({ ...formData, travelers: e.target.value });
                  }}
                  required
                />
              </div>
              
              <div className="hidden md:block w-px h-10 bg-white/20"></div>

              {/* Budget Input */}
              <div className="relative w-full md:w-44 group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors">
                  <Wallet size={20} />
                </div>
                <Input 
                  name="budget"
                  placeholder="Budget (₹)" 
                  className="h-14 pl-12 bg-white/10 border-transparent text-white placeholder:text-white/60 rounded-2xl md:rounded-full focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:bg-white/20 text-lg transition-all"
                  onChange={(e) => {
                    setFormError(null);
                    setFormData({ ...formData, budget: e.target.value });
                  }}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={!isFormComplete || isLoading}
                className={`w-full md:w-auto h-14 px-8 text-lg rounded-xl md:rounded-full transition-all duration-300 flex items-center justify-center shrink-0 ${
                  isFormComplete 
                    ? "bg-white text-black hover:bg-emerald-50 hover:text-emerald-900 shadow-xl hover:shadow-emerald-500/20" 
                    : "bg-white/30 text-white/50 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Crafting...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate
                  </>
                )}
              </Button>
            </form>

            {/* Error Message Display */}
            {formError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-500/90 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg backdrop-blur-md"
              >
                <AlertCircle size={18} />
                {formError}
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Recent Trips Section (Productivity Feature) */}
      <RecentTrips />

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Why Travel With AI?</h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">Experience a new era of travel planning where technology meets personalized luxury.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Hyper-Personalized</h3>
              <p className="text-stone-500 leading-relaxed">
                Our AI analyzes thousands of data points to craft an itinerary that perfectly matches your unique preferences and budget constraints.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center mb-6">
                <Compass size={28} />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Hidden Gems</h3>
              <p className="text-stone-500 leading-relaxed">
                Go beyond typical tourist traps. Discover secret local spots, exclusive restaurants, and authentic experiences curated just for you.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Time-Saving</h3>
              <p className="text-stone-500 leading-relaxed">
                Skip the 20 hours of research. Get a complete, optimized day-by-day plan instantly, so you can focus on packing and enjoying the journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 text-center border-t border-stone-800">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Compass className="w-6 h-6 text-stone-300" />
          <span className="text-xl font-serif text-stone-200 font-bold tracking-tight">Wander AI</span>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Wander AI. All rights reserved.</p>
      </footer>
    </div>
  );
}