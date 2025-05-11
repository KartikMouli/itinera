"use client"
import { MapPin, ChevronDown, Plus, Calendar, IndianRupee, Train, Bus, Plane } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import axios from "axios"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

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
    itinerary?: {
        id: string;
        day: number;
        activities: string[];
        accommodation: string;
        meals: string[];
        transportation: string;
        notes?: string;
    } | null;
}

const getTravelIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
        case 'flight':
            return <Plane className="h-3 w-3" />;
        case 'train + bus':
            return <Train className="h-3 w-3" />;
        default:
            return <Bus className="h-3 w-3" />;
    }
};

function TripsList() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        async function fetchTrips() {
            if (!session?.user?.id) {
                setError('User not authenticated');
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(`/api/trips?userId=${session.user.id}`);
                if (response.status === 200) {
                    setTrips(response.data);
                } else {
                    setError('Failed to fetch trips');
                }
            } catch (err) {
                setError('Failed to fetch trips');
            } finally {
                setIsLoading(false);
            }
        }

        fetchTrips();
    }, [session?.user?.id]);

    const handleTripClick = (tripId: string) => {
        router.push(`/dashboard/trips/${tripId}`);
    };

    if (isLoading) {
        return <LoadingTrips />;
    }

    if (error) {
        return (
            <div className="text-center py-8 text-destructive">
                <p>{error}</p>
            </div>
        );
    }
    
    if (!trips.length) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                <p>No trips found</p>
                <Link 
                    href="/dashboard/search" 
                    className="inline-flex items-center gap-1.5 mt-2 text-primary hover:underline"
                >
                    <Plus className="h-3.5 w-3.5" />
                    Plan your first trip
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-3 min-h-screen">
            {trips.map((trip: Trip) => (
                <Collapsible key={trip.id} className="group/collapsible">
                    <div className="rounded-md border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                        <CollapsibleTrigger 
                            className="flex w-full items-center justify-between p-3 hover:bg-accent/50 transition-colors"
                            onDoubleClick={() => handleTripClick(trip.id)}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex-shrink-0 p-2 rounded-full bg-primary/10">
                                    <MapPin className="h-4 w-4 text-primary" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-medium text-base truncate">{trip.from} → {trip.to}</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5 text-muted-foreground">
                                        <Calendar className="h-3 w-3 flex-shrink-0" />
                                        <span className="text-xs truncate">{trip.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${
                                    trip.status === "Upcoming" 
                                        ? "bg-green-100 text-green-700" 
                                        : "bg-blue-100 text-blue-700"
                                }`}>
                                    {trip.status}
                                </span>
                                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-180 flex-shrink-0" />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="p-3 border-t bg-muted/50">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                                            <IndianRupee className="h-3 w-3 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Budget</p>
                                            <p className="text-sm font-medium truncate">{trip.details.budget}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                                            {getTravelIcon(trip.details.mode)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Mode</p>
                                            <p className="text-sm font-medium truncate">{trip.details.mode}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                                            <Calendar className="h-3 w-3 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Duration</p>
                                            <p className="text-sm font-medium truncate">{trip.details.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                                            <MapPin className="h-3 w-3 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Activities</p>
                                            <p className="text-sm font-medium truncate">{trip.details.activities.join(", ")}</p>
                                        </div>
                                    </div>
                                </div>
                                {trip.details.notes && (
                                    <div className="mt-3 text-sm text-muted-foreground">
                                        <p className="font-medium">Notes:</p>
                                        <p className="break-words">{trip.details.notes}</p>
                                    </div>
                                )}
                                <div className="mt-3 flex justify-end">
                                    <Link 
                                        href={`/dashboard/trips/${trip.id}`}
                                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                    >
                                        View Full Details
                                        <ChevronDown className="h-3 w-3 rotate-90" />
                                    </Link>
                                </div>
                            </div>
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            ))}
        </div>
    );
}

function LoadingTrips() {
    return (
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-md border bg-card p-3 animate-pulse">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                                <div className="h-4 w-32 bg-muted rounded" />
                                <div className="h-3 w-24 bg-muted rounded mt-2" />
                            </div>
                        </div>
                        <div className="h-4 w-20 bg-muted rounded flex-shrink-0 ml-2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function MyTripsPage() {
    return (
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Trips</h1>
                    <p className="text-sm text-muted-foreground">Manage your trips</p>
                </div>
                <Link 
                    href="/dashboard/search" 
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm w-full sm:w-auto"
                >
                    <Plus className="h-3.5 w-3.5" />
                    New Trip
                </Link>
            </div>

            <Suspense fallback={<LoadingTrips />}>
                <TripsList />
            </Suspense>
        </div>
    )
} 