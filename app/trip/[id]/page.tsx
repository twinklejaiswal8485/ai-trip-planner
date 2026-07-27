import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InteractiveItinerary from "@/components/InteractiveItinerary";

export default async function TripResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const trip = await prisma.trip.findUnique({
    where: { id },
  });

  if (!trip) {
    return notFound();
  }

  return <InteractiveItinerary trip={trip} />;
}
