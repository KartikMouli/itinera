import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Trip } from "@/app/generated/prisma";


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        
        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const trips = await prisma.trip.findMany({
            where: {
                userId: userId
            },
            include: {
                itinerary: {
                    orderBy: {
                        dayNumber: 'asc'
                    }
                }
            },
            orderBy: {
                startDate: 'desc'
            }
        });

        // Transform the data to match the frontend format
        const formattedTrips = trips.map((trip: Trip) => ({
            id: trip.id,
            from: trip.from,
            to: trip.to,
            date: trip.startDate && trip.endDate 
                ? `${trip.startDate.toLocaleDateString()} - ${trip.endDate.toLocaleDateString()}`
                : 'Dates not set',
            status: trip.status,
            details: {
                budget: trip.budget ? `₹${trip.budget.toLocaleString()}` : 'Not set',
                mode: trip.modeOfTravel || 'Not specified',
                duration: trip.duration ? `${trip.duration} days` : 'Not set',
                activities: trip.activities || []
            }
        }));

        return NextResponse.json(formattedTrips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 