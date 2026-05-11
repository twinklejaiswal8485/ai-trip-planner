// export async function generateItinerary(formData: FormData) {
//   // your logic here
// }

// app/actions.ts
"use server";
import { prisma } from "@/lib/prisma"; // IMPORT THE BRIDGE!
import { OpenAI } from "openai";
import { redirect } from "next/navigation";
import { TRIP_PROMPT } from "@/lib/openai-prompt";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateItinerary(formData: FormData) {
  let newTripId: string | null = null;

  try {
    // 1. Get data from the form
    const destination = formData.get("destination") as string;
    const duration = Number(formData.get("duration"));
    const budget = formData.get("budget") as string;
    const members = Number(formData.get("members"));

    // 2. Ask OpenAI for the itinerary
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a chic travel planner." },
        { role: "user", content: TRIP_PROMPT(destination, duration, budget, members) },
      ],
      response_format: { type: "json_object" }, 
    });

    const itineraryJson = JSON.parse(response.choices[0].message.content || "{}");

    // 3. THIS IS HOW YOU CONNECT TO SUPABASE
    // We are telling Prisma to INSERT a new row into the "Trip" table
    const newTrip = await prisma.trip.create({
      data: {
        destination: destination, // maps to your 'text' column
        duration: duration,       // maps to your 'int4' column
        budget: budget,           // maps to your 'text' column
        members: members,         // maps to your 'int4' column
        itinerary: itineraryJson, // maps to your 'jsonb' column
        // imageUrl is optional (Nullable), so we can leave it out for now!
      },
    });

    // 4. Grab the database ID (e.g., clp123abc) that Supabase just generated
    newTripId = newTrip.id; 

  } catch (error) {
    console.error("Database or AI Error:", error);
    throw new Error("Failed");
  }

  // 5. Send the user to their new custom URL
  if (newTripId) {
    redirect(`/trip/${newTripId}`);
  }
}