"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, IndianRupee, Compass, Calendar, Users, Wallet, Minus, Printer } from "lucide-react";
import Link from "next/link";

export default function InteractiveItinerary({ trip }: { trip: any }) {
  const [itineraryData, setItineraryData] = useState(trip.itinerary);
  
  // Save to LocalStorage for Productivity feature
  useEffect(() => {
    try {
      const savedTripsStr = localStorage.getItem("recentTrips");
      const savedTrips = savedTripsStr ? JSON.parse(savedTripsStr) : [];
      
      const newTrip = {
        id: trip.id,
        destination: trip.destination,
        date: new Date().toLocaleDateString(),
      };
      
      // Check if it already exists
      if (!savedTrips.find((t: any) => t.id === trip.id)) {
        savedTrips.unshift(newTrip);
        // Keep only top 5
        localStorage.setItem("recentTrips", JSON.stringify(savedTrips.slice(0, 5)));
      }
    } catch (error) {
      console.error("Error saving trip to local storage", error);
    }
  }, [trip]);

  const removeActivity = (dayIndex: number, actIndex: number) => {
    const newData = { ...itineraryData };
    newData.itinerary[dayIndex].activities.splice(actIndex, 1);
    setItineraryData(newData);
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-24 print:bg-white print:pb-0">
      {/* Header Bar */}
      <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex justify-between items-center print:hidden">
        <Link href="/" className="flex items-center gap-2 group">
          <Compass className="w-6 h-6 text-stone-900 group-hover:text-emerald-700 transition-colors" />
          <span className="text-xl font-serif text-stone-900 font-bold tracking-tight">Wander AI</span>
        </Link>
      </header>

      {/* Hero Banner */}
      <div 
        className="relative h-[40vh] min-h-[300px] w-full bg-stone-900 flex flex-col justify-end px-6 lg:px-12 pb-12 overflow-hidden print:h-auto print:bg-white print:py-8"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent print:hidden"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <Badge className="bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30 mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm border border-emerald-500/30 print:hidden">
            Itinerary Ready
          </Badge>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-2 leading-tight drop-shadow-md print:text-black print:drop-shadow-none">
            {trip.destination}
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light print:text-stone-600">
            {itineraryData?.trip_name || "Your carefully curated journey."}
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 lg:px-12 mt-[-30px] relative z-20 print:mt-4">
        
        {/* Glassmorphic Summary Bar */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 p-6 md:p-8 flex flex-wrap gap-8 md:gap-16 justify-center md:justify-start mb-12 print:shadow-none print:border-stone-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center print:bg-transparent print:text-black print:border print:border-stone-200">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-0.5">Duration</p>
              <p className="text-lg font-semibold text-stone-900">{trip.duration} Days</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-stone-200"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center print:bg-transparent print:text-black print:border print:border-stone-200">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-0.5">Travelers</p>
              <p className="text-lg font-semibold text-stone-900">{trip.members} People</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-stone-200"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center print:bg-transparent print:text-black print:border print:border-stone-200">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-0.5">Budget</p>
              <p className="text-lg font-semibold text-stone-900">{trip.budget}</p>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Timeline */}
          <div className="flex-1 space-y-16 print:space-y-8">
            {itineraryData?.itinerary?.map((day: any, dayIndex: number) => (
              <div key={dayIndex} className="relative print:break-inside-avoid">
                
                {/* Timeline vertical line */}
                {dayIndex !== itineraryData.itinerary.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-[-4rem] w-px bg-stone-200 hidden md:block print:hidden"></div>
                )}
                
                <div className="flex gap-8">
                  {/* Day Indicator (Desktop) */}
                  <div className="hidden md:flex flex-col items-center shrink-0 w-12 pt-2">
                    <div className="w-12 h-12 rounded-full bg-stone-900 text-white flex flex-col items-center justify-center shadow-lg z-10 relative print:bg-stone-100 print:text-stone-900 print:border print:border-stone-300 print:shadow-none">
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Day</span>
                      <span className="text-xl font-serif leading-none">{day.day}</span>
                    </div>
                  </div>

                  {/* Day Content */}
                  <div className="flex-1">
                    <div className="mb-6 flex items-center md:items-start gap-4 md:gap-0">
                      {/* Mobile Day Indicator */}
                      <div className="md:hidden w-12 h-12 rounded-full bg-stone-900 text-white flex flex-col items-center justify-center shrink-0">
                         <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Day</span>
                         <span className="text-lg font-serif leading-none">{day.day}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-serif text-stone-900 mb-1">{day.theme}</h2>
                        <p className="text-stone-500">A day curated for unforgettable moments.</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {day.activities?.map((activity: any, actIndex: number) => (
                        <Card 
                          key={actIndex} 
                          className="relative border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl overflow-hidden group print:shadow-none print:border print:border-stone-200 print:break-inside-avoid"
                        >
                          <CardContent className="p-0 flex flex-col sm:flex-row">
                            
                            {/* Time Section */}
                            <div className="bg-stone-50 border-b sm:border-b-0 sm:border-r border-stone-100 p-6 sm:w-40 shrink-0 flex flex-col justify-center items-start sm:items-center text-stone-500 print:bg-transparent">
                              <Clock size={20} className="mb-2 text-stone-400 group-hover:text-emerald-600 transition-colors print:text-stone-800" />
                              <span className="font-semibold text-stone-900">{activity.time}</span>
                            </div>
                            
                            {/* Activity Details */}
                            <div className="p-6 flex-1 pr-12">
                              <p className="text-stone-700 text-lg leading-relaxed mb-4">
                                {activity.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-3">
                                <span className="inline-flex items-center gap-1.5 text-sm text-stone-600 bg-stone-100/80 px-3 py-1.5 rounded-lg border border-stone-200/50 print:bg-transparent print:border-stone-300">
                                  <MapPin size={14} className="text-stone-400 print:text-stone-600" /> 
                                  {activity.location}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 font-medium print:bg-transparent print:border-stone-300">
                                  <IndianRupee size={14} className="opacity-80" /> 
                                  {activity.est_cost_in_inr}
                                </span>
                              </div>
                            </div>
                            
                            {/* Remove Activity Button */}
                            <button
                                onClick={() => removeActivity(dayIndex, actIndex)}
                                className="absolute top-4 right-4 text-stone-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 print:hidden"
                                title="Remove activity"
                            >
                                <Minus size={18} />
                            </button>

                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Right Column: Sticky Overview */}
          <div className="lg:w-[350px] shrink-0 print:hidden">
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 p-8">
              <h3 className="text-xl font-serif text-stone-900 mb-6 flex items-center gap-2">
                <Compass className="text-emerald-600" /> Trip Overview
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-stone-500 mb-1">Destination</p>
                  <p className="font-medium text-stone-900 text-lg">{trip.destination}</p>
                </div>
                
                <div className="w-full h-px bg-stone-100"></div>
                
                <div>
                  <p className="text-sm text-stone-500 mb-1">Total Activities</p>
                  <p className="font-medium text-stone-900 text-lg">
                    {itineraryData?.itinerary?.reduce((acc: number, day: any) => acc + (day.activities?.length || 0), 0) || 0}
                  </p>
                </div>
                
                <div className="w-full h-px bg-stone-100"></div>

                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                  <p className="text-emerald-800 text-sm font-medium mb-2">Ready to go offline?</p>
                  <p className="text-emerald-600/80 text-xs leading-relaxed mb-4">
                    Save a PDF copy of your itinerary so you have it on your phone without internet access.
                  </p>
                  
                  <div className="flex flex-col gap-3">
                      <button 
                        onClick={exportPDF}
                        className="flex justify-center items-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
                      >
                        <Printer size={16} /> Export as PDF
                      </button>
                      
                      <Link 
                        href="/"
                        className="flex justify-center items-center gap-2 w-full py-2.5 bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold transition-colors"
                      >
                        Plan Another Trip
                      </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
