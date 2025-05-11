import { use } from "react"
import { TripDetails } from "./trip-details"


export default function TripDetailsPage({ params }: { params: Promise<{ tripId: string }> }) {
    const { tripId } = use(params);
    return <TripDetails tripId={tripId} />;
} 