import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ tripId: string }> }
) {
    try {
        const tripId = (await params).tripId;
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Get trip with all itinerary days
        const trip = await prisma.trip.findFirst({
            where: {
                id: tripId,
                userId: userId
            },
            include: {
                itinerary: {
                    orderBy: {
                        dayNumber: 'asc'
                    }
                }
            }
        });

        if (!trip) {
            return NextResponse.json(
                { error: "Trip not found" },
                { status: 404 }
            );
        }

        // Format the response to match the frontend requirements
        const formattedTrip = {
            id: trip.id,
            from: trip.from,
            to: trip.to,
            startDate: trip.startDate ? trip.startDate.toISOString().split('T')[0] : null,
            endDate: trip.endDate ? trip.endDate.toISOString().split('T')[0] : null,
            status: trip.status,
            details: {
                budget: trip.budget ? `₹${trip.budget.toLocaleString()}` : "",
                mode: trip.modeOfTravel || "",
                duration: trip.duration ? `${trip.duration} days` : "",
                activities: trip.activities || [],
                notes: trip.description || ""
            },
            itinerary: trip.itinerary.map(day => ({
                id: day.id,
                day: day.dayNumber,
                date: day.date.toISOString().split('T')[0],
                activities: day.activities || [],
                notes: day.notes || ""
            }))
        };

        return NextResponse.json(formattedTrip);

    } catch (error) {
        console.error('Trip API Error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 