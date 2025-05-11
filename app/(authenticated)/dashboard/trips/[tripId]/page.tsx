import { use } from "react"
import { TripDetails } from "./trip-details"

interface Trip {
    id: string;
    from: string;
    to: string;
    date: string;
    status: string;
    details: {
        budget: string;
        mode: string;
        duration: string;
        activities: string[];
        notes?: string;
    };
    itinerary: Array<{
        id: string;
        day: number;
        date: string;
        activities: string[];
        notes?: string;
    }>;
}

export default function TripDetailsPage({ params }: { params: Promise<{ tripId: string }> }) {
    const { tripId } = use(params);
    return <TripDetails tripId={tripId} />;
} 