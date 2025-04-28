"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, IndianRupee, MapPin, Plane, Train, Car, Bus, Bike, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { TripCompletionSheet } from "@/components/trip-completion/trip-completion-sheet"

// Mock data for trip details
const tripDetails = {
    id: "1",
    from: "Mumbai",
    to: "Goa",
    date: "15-20 March 2024",
    status: "Upcoming",
    details: {
        budget: "₹25,000",
        mode: "Flight",
        duration: "5 days",
        activities: ["Beach visit", "Water sports", "Local sightseeing"]
    },
    itinerary: [
        {
            day: 1,
            date: "15 March 2024",
            activities: [
                "Flight to Goa",
                "Check-in at hotel",
                "Beach visit",
                "Dinner at local restaurant"
            ]
        },
        {
            day: 2,
            date: "16 March 2024",
            activities: [
                "Water sports",
                "Local sightseeing",
                "Shopping"
            ]
        }
    ]
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

export default function TripDetailsPage() {
    const params = useParams()
    const tripId = params.id as string

    const handleCompleteTrip = async (rating: number, review: string) => {
        // Here you would typically make an API call to update the trip status
        console.log("Completing trip with rating:", rating, "and review:", review)
        // After successful completion, redirect to history page
        window.location.href = "/dashboard/history"
    }

    return (
        <div className="container mx-auto py-4 px-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Trip Details</h1>
                    <p className="text-sm text-muted-foreground">{tripDetails.from} → {tripDetails.to}</p>
                </div>
                <Link 
                    href="/dashboard/trips" 
                    className="text-sm text-primary hover:underline"
                >
                    ← Back to Trips
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="rounded-md border bg-card p-4">
                        <h2 className="font-medium mb-4">Trip Overview</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <MapPin className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Route</p>
                                    <p className="text-sm font-medium">{tripDetails.from} → {tripDetails.to}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <Calendar className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Date</p>
                                    <p className="text-sm font-medium">{tripDetails.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <IndianRupee className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Budget</p>
                                    <p className="text-sm font-medium">{tripDetails.details.budget}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-primary/10">
                                    {getTravelIcon(tripDetails.details.mode)}
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Mode</p>
                                    <p className="text-sm font-medium">{tripDetails.details.mode}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border bg-card p-4">
                        <h2 className="font-medium mb-4">Itinerary</h2>
                        <div className="space-y-4">
                            {tripDetails.itinerary.map((day) => (
                                <div key={day.day} className="border-l-2 border-primary pl-4">
                                    <h3 className="font-medium">Day {day.day}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">{day.date}</p>
                                    <ul className="space-y-2">
                                        {day.activities.map((activity, index) => (
                                            <li key={index} className="text-sm flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                {activity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {tripDetails.status === "Upcoming" && (
                        <div className="rounded-md border bg-card p-4">
                            <TripCompletionSheet 
                                tripId={tripDetails.id}
                                onComplete={handleCompleteTrip}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 