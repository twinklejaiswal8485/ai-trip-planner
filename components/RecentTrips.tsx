"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Compass, MapPin, Calendar, ArrowRight } from "lucide-react";

export default function RecentTrips() {
  const [recentTrips, setRecentTrips] = useState<any[]>([]);

  useEffect(() => {
    try {
      const savedTripsStr = localStorage.getItem("recentTrips");
      if (savedTripsStr) {
        setRecentTrips(JSON.parse(savedTripsStr));
      }
    } catch (error) {
      console.error("Failed to load recent trips", error);
    }
  }, []);

  if (recentTrips.length === 0) {
    return null; // Don't render anything if there are no recent trips
  }

  return (
    <section className="py-16 px-6 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif text-stone-900 mb-2">Your Recent Journeys</h2>
            <p className="text-stone-500">Pick up right where you left off.</p>
          </div>
          <Compass className="text-stone-200 w-12 h-12 hidden sm:block" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTrips.map((trip: any) => (
            <Link 
              key={trip.id} 
              href={`/trip/${trip.id}`}
              className="group bg-stone-50 border border-stone-100 rounded-2xl p-6 hover:bg-stone-100 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-emerald-600 mb-4">
                  <MapPin size={18} />
                  <span className="font-medium">{trip.destination}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400 text-sm mb-6">
                  <Calendar size={14} />
                  <span>Generated on {trip.date}</span>
                </div>
              </div>
              <div className="flex items-center text-sm font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
                View Itinerary <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
