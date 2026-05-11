// "use client"; // We need this to track the user's typing in real-time

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { generateItinerary } from "./actions";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   // State to track if all fields are filled
//   const [formData, setFormData] = useState({
//     destination: "",
//     budget: "",
//     days: "",
//     travelers: "",
//   });

//   // Check if every field has text in it
//   const isFormComplete = Object.values(formData).every((val) => val.trim() !== "");

//   return (
//     // Background Image & Overlay
//     <main 
//       className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
//       style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')" }}
//     >
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

//       {/* Animated Form Card */}
//       <motion.div 
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="relative z-10 w-full max-w-lg p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20"
//       >
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-serif text-slate-900 mb-2">Design Your Escape</h1>
//           <p className="text-slate-500 text-sm">Tell us your dream, AI will handle the details.</p>
//         </div>

//         <form action={generateItinerary} className="space-y-5">
//           <Input 
//             name="destination"
//             placeholder="Where to? (e.g., Manali, Paris)" 
//             className="h-12 text-lg rounded-xl bg-white/50 border-slate-200"
//             onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
//             required
//           />
          
//           <div className="grid grid-cols-2 gap-4">
//             <Input 
//               name="duration"
//               type="number"
//               placeholder="How many days?" 
//               className="h-12 text-lg rounded-xl bg-white/50 border-slate-200"
//               onChange={(e) => setFormData({ ...formData, days: e.target.value })}
//               required
//             />
//              <Input 
//               name="members"
//               type="number"
//               placeholder="Travelers?" 
//               className="h-12 text-lg rounded-xl bg-white/50 border-slate-200"
//               onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
//               required
//             />
//           </div>

//           <Input 
//             name="budget"
//             placeholder="Budget in Rupees (e.g., 20,000)" 
//             className="h-12 text-lg rounded-xl bg-white/50 border-slate-200"
//             onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
//             required
//           />

//           {/* The Smart Button */}
//           <Button 
//             type="submit" 
//             disabled={!isFormComplete}
//             className={`w-full h-14 text-lg rounded-xl transition-all duration-500 ${
//               isFormComplete 
//                 ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg" 
//                 : "bg-slate-200 text-slate-400 cursor-not-allowed"
//             }`}
//           >
//             {isFormComplete ? "Plan My Trip ✨" : "Complete details to start"}
//           </Button>
//         </form>
//       </motion.div>
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { generateItinerary } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({ destination: "", budget: "", days: "", travelers: "" });
  const [isLoading, setIsLoading] = useState(false); // NEW: Tracks the loading state

  const isFormComplete = Object.values(formData).every((val) => val.trim() !== "");

  // NEW: This function handles the submit, shows the loader, and catches errors
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevents the page from refreshing
    setIsLoading(true);     // Turns on the loading animation

    try {
      // Create the data object to send to your Server Action
      const submitData = new FormData(event.currentTarget);
      
      // Call the server action
      await generateItinerary(submitData);
      
      // Note: We don't need to set isLoading to false here because the Server Action 
      // will redirect the user to the next page automatically!
      
    } catch (error) {
      console.error("Form submission failed:", error);
      alert("Something went wrong! Please check your VS Code terminal for the exact error.");
      setIsLoading(false); // Turn off loading so they can try again
    }
  }

  return (
    <main 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-slate-900 mb-2">Design Your Escape</h1>
          <p className="text-slate-500 text-sm">Tell us your dream, AI will handle the details.</p>
        </div>

        {/* Notice we changed action={...} to onSubmit={handleSubmit} */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            name="destination"
            placeholder="Where to? (e.g., Manali, Paris)" 
            className="h-12 text-lg rounded-xl bg-white/50 border-slate-200"
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              name="duration"
              type="number"
              placeholder="How many days?" 
              className="h-12 text-lg rounded-xl bg-white/50 border-slate-200"
              onChange={(e) => setFormData({ ...formData, days: e.target.value })}
              required
            />
             <Input 
              name="members"
              type="number"
              placeholder="Travelers?" 
              className="h-12 text-lg rounded-xl bg-white/50 border-slate-200"
              onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
              required
            />
          </div>

          <Input 
            name="budget"
            placeholder="Budget in Rupees (e.g., 20,000)" 
            className="h-12 text-lg rounded-xl bg-white/50 border-slate-200"
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            required
          />

          <Button 
            type="submit" 
            disabled={!isFormComplete || isLoading}
            className={`w-full h-14 text-lg rounded-xl transition-all duration-500 flex items-center justify-center ${
              isFormComplete 
                ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {/* If isLoading is true, show the spinner. Otherwise, show the text. */}
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Itinerary...
              </>
            ) : (
              "Plan My Trip ✨"
            )}
          </Button>
        </form>
      </motion.div>
    </main>
  );
}