import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Get last 5 trips ordered by start date
        const recentTrips = await prisma.trip.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                from: true,
                to: true,
                startDate: true,
                endDate: true,
                status: true
            },
            orderBy: {
                startDate: 'desc'
            },
            take: 5
        });

        // Format the response
        const formattedTrips = recentTrips.map(trip => ({
            id: trip.id,
            from: trip.from,
            to: trip.to,
            date: trip.startDate && trip.endDate 
                ? `${trip.startDate.toLocaleDateString()} - ${trip.endDate.toLocaleDateString()}`
                : 'Dates not set',
            status: trip.status
        }));

        return NextResponse.json(formattedTrips);

    } catch (error) {
        console.error('Error fetching recent trips:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 