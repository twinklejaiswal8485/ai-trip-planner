// // // // export async function generateItinerary(formData: FormData) {
// // // //   // your logic here
// // // // }

// // // // app/actions.ts
// // // "use server";
// // // import { prisma } from "@/lib/prisma"; // IMPORT THE BRIDGE!
// // // import { OpenAI } from "openai";
// // // import { redirect } from "next/navigation";
// // // import { TRIP_PROMPT } from "@/lib/openai-prompt";

// // // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // // export async function generateItinerary(formData: FormData) {
// // //   let newTripId: string | null = null;

// // //   try {
// // //     // 1. Get data from the form
// // //     const destination = formData.get("destination") as string;
// // //     const duration = Number(formData.get("duration"));
// // //     const budget = formData.get("budget") as string;
// // //     const members = Number(formData.get("members"));

// // //     // 2. Ask OpenAI for the itinerary
// // //     const response = await openai.chat.completions.create({
// // //       model: "gpt-4o-mini",
// // //       messages: [
// // //         { role: "system", content: "You are a chic travel planner." },
// // //         { role: "user", content: TRIP_PROMPT(destination, duration, budget, members) },
// // //       ],
// // //       response_format: { type: "json_object" },
// // //     });

// // //     const itineraryJson = JSON.parse(response.choices[0].message.content || "{}");

// // //     // 3. THIS IS HOW YOU CONNECT TO SUPABASE
// // //     // We are telling Prisma to INSERT a new row into the "Trip" table
// // //     const newTrip = await prisma.trip.create({
// // //       data: {
// // //         destination: destination, // maps to your 'text' column
// // //         duration: duration,       // maps to your 'int4' column
// // //         budget: budget,           // maps to your 'text' column
// // //         members: members,         // maps to your 'int4' column
// // //         itinerary: itineraryJson, // maps to your 'jsonb' column
// // //         // imageUrl is optional (Nullable), so we can leave it out for now!
// // //       },
// // //     });

// // //     // 4. Grab the database ID (e.g., clp123abc) that Supabase just generated
// // //     newTripId = newTrip.id;

// // //   } catch (error) {
// // //     console.error("Database or AI Error:", error);
// // //     throw new Error("Failed");
// // //   }

// // //   // 5. Send the user to their new custom URL
// // //   if (newTripId) {
// // //     redirect(`/trip/${newTripId}`);
// // //   }
// // // }

// "use server";
// import { prisma } from "@/lib/prisma";
// import { redirect } from "next/navigation";
// import { TRIP_PROMPT } from "@/lib/openai-prompt";
// // NEW: Import Google Gemini
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini with your new key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// // app/actions.ts

// // ... (previous imports)

// // app/actions.ts

// // ... (previous imports)

// export async function generateItinerary(formData: FormData) {
//   let newTripId: string | null = null;

//   try {
//     const destination = formData.get("destination") as string;
//     const budget = formData.get("budget") as string;
//     const duration = Number(formData.get("duration")) || 0;
//     const members = Number(formData.get("members")) || 1;

//     // First, let's try to list available models to debug
//     console.log("🔍 Debugging: API Key exists?", !!process.env.GEMINI_API_KEY);
//     console.log("🔍 Debugging: API Key length:", process.env.GEMINI_API_KEY?.length || 0);

//     // Try to list models first
//     try {
//       const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
//       const modelsData = await modelsResponse.json();
//       console.log("🔍 Available models:", JSON.stringify(modelsData, null, 2));
//     } catch (listError: any) {
//       console.log("🔍 Could not list models:", listError.message);
//     }

//     // Try the standard model name format
//     const model = genAI.getGenerativeModel({
//       model: 'gemini-2.5-flash'
//     });

//     const fullPrompt = `
//       Return a JSON object for a ${duration}-day trip to ${destination} for ${members} people with a budget of ${budget}.
//       Use this structure: { "trip_name": "string", "itinerary": [{ "day": 1, "theme": "string", "activities": [{ "time": "string", "description": "string", "location": "string", "est_cost_in_inr": "string" }] }] }
//       Return ONLY the JSON.
//     `;

//     const result = await model.generateContent(fullPrompt);
//     const response = await result.response;
//     const text = response.text();

//     // Safety check: sometimes Gemini wraps JSON in ```json blocks
//     const cleanText = text.replace(/```json|```/g, "").trim();
//     const itineraryJson = JSON.parse(cleanText);

//     const newTrip = await prisma.trip.create({
//       data: {
//         destination,
//         duration,
//         budget,
//         members,
//         itinerary: itineraryJson,
//       },
//     });

//     newTripId = newTrip.id;

//   } catch (error: any) {
//     console.error("❌ THE REAL ERROR IS HERE:", error);
//     throw new Error(error.message || "Failed to generate trip");
//   }

//   if (newTripId) {
//     redirect(`/trip/${newTripId}`);
//   }
//  }

// // 'use server'

// // import { GoogleGenAI } from '@google/genai';

// // // Initialize the client.
// // // It will automatically pick up the GEMINI_API_KEY from your .env.local
// // const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // export async function generateAIResponse(prompt: string) {
// //   try {
// //     const response = await ai.models.generateContent({
// //       model: 'gemini-3.1-pro', // You can also use 'gemini-2.5-flash' for faster, lighter tasks
// //       contents: prompt,
// //     });

// //     return {
// //         success: true,
// //         text: response.text
// //     };
// //   } catch (error) {
// //     console.error("Gemini API Error:", error);
// //     return {
// //         success: false,
// //         text: "Failed to generate content. Check your server logs."
// //     };
// //   }
// // }

"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
// Import the WORKING library
import { GoogleGenAI } from "@google/genai";

// Initialize using the working syntax
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateItinerary(formData: FormData) {
  let newTripId: string | null = null;

  try {
    const destination = formData.get("destination") as string;
    const budget = formData.get("budget") as string;
    const duration = Number(formData.get("duration")) || 0;
    const members = Number(formData.get("members")) || 1;

    // Call the model using the working syntax from your 2nd snippet
    // Note: If 'gemini-3.1-pro' gives a 429 error again, change to 'gemini-2.5-flash'
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a ${duration}-day trip itinerary for ${destination} for ${members} people with a budget of ${budget}.`,
      config: {
        // This forces Gemini to return valid JSON so you don't need .replace() regex
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            trip_name: { type: "string" },
            itinerary: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: { type: "number" },
                  theme: { type: "string" },
                  activities: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        time: { type: "string" },
                        description: { type: "string" },
                        location: { type: "string" },
                        est_cost_in_inr: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    // Get the parsed JSON directly// ✅ CORRECT
    const itineraryText = result.text;

    // Safety check just in case the API returns empty
    if (!itineraryText) {
      throw new Error("Gemini returned an empty response.");
    }

    // Parse the string into a valid JavaScript object
    const itineraryJson = JSON.parse(itineraryText);

    // Create the record in Prisma
    const newTrip = await prisma.trip.create({
      data: {
        destination,
        duration,
        budget,
        members,
        itinerary: itineraryJson as any, // Cast as any if your Prisma type is Json
      },
    });

    newTripId = newTrip.id;
  } catch (error: any) {
    console.error("❌ Gemini/Prisma Error:", error);
    throw new Error(error.message || "Failed to generate trip");
  }

  // Redirect must happen outside the try/catch block for Next.js 15+
  if (newTripId) {
    redirect(`/trip/${newTripId}`);
  }
}
