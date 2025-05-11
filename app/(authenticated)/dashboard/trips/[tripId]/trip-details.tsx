"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import axios from "axios"
import { MapPin, Calendar, IndianRupee, Train, Bus, Plane, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


interface Trip {
    id: string;
    from: string;
    to: string;
    startDate: string | null;
    endDate: string | null;
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

const getTravelIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
        case 'flight':
            return <Plane className="h-4 w-4" />;
        case 'train + bus':
            return <Train className="h-4 w-4" />;
        default:
            return <Bus className="h-4 w-4" />;
    }
};

export function TripDetails({ tripId }: { tripId: string }) {
    const [trip, setTrip] = useState<Trip | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        async function fetchTripDetails() {
            if (!session?.user?.id) {
                setError('User not authenticated');
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trips/${tripId}?userId=${session.user.id}`);
                if (response.status === 200) {
                    setTrip(response.data);
                } else {
                    setError('Failed to fetch trip details');
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data?.error || 'Failed to fetch trip details');
                } else {
                    setError('Failed to fetch trip details');
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchTripDetails();
    }, [tripId, session?.user?.id]);

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="text-center py-8 text-destructive">
                    <p>{error || 'Trip not found'}</p>
                    <Button
                        variant="link"
                        onClick={() => router.back()}
                        className="mt-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Trips
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-4"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Trips
                </Button>
                <h1 className="text-3xl font-bold">Trip Details</h1>
            </div>

            <div className="grid gap-6">
                {/* Trip Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            Trip Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{trip.from} → {trip.to}</h3>
                                <div className="space-y-2 text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {trip.startDate && trip.endDate 
                                                ? `${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}`
                                                : 'Dates not set'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getTravelIcon(trip.details.mode)}
                                        <span>{trip.details.mode}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IndianRupee className="h-4 w-4" />
                                        <span>{trip.details.budget}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="space-y-2">
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
                                        <p>{trip.details.duration}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                            trip.status === "Upcoming" 
                                                ? "bg-green-100 text-green-700" 
                                                : "bg-blue-100 text-blue-700"
                                        }`}>
                                            {trip.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Activities */}
                <Card>
                    <CardHeader>
                        <CardTitle>Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-6 space-y-2">
                            {trip.details.activities.map((activity, index) => (
                                <li key={index} className="text-muted-foreground">
                                    {activity}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Notes */}
                {trip.details.notes && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap">{trip.details.notes}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Itinerary */}
                {trip.itinerary.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Itinerary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {trip.itinerary.map((day) => (
                                    <div key={day.id} className="border-b last:border-0 pb-6 last:pb-0">
                                        <div className="flex items-center gap-2 mb-4">
                                            <h3 className="text-lg font-semibold">Day {day.day}</h3>
                                            <span className="text-sm text-muted-foreground">
                                                {day.date}
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Activities</h4>
                                                <ul className="list-disc pl-6 space-y-1">
                                                    {day.activities.map((activity, index) => (
                                                        <li key={index} className="text-sm text-muted-foreground">
                                                            {activity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {day.notes && (
                                                <div>
                                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Notes</h4>
                                                    <p className="text-sm whitespace-pre-wrap">{day.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    );
} 