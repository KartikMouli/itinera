import { MapPin, ChevronDown, Calendar, IndianRupee, Train, Bus, Plane, CheckCircle2 } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"

// Mock data for past trips
const pastTrips = [
    {
        id: "1",
        from: "Mumbai",
        to: "Goa",
        date: "15-20 March 2023",
        status: "Completed",
        rating: 4.5,
        details: {
            budget: "₹25,000",
            mode: "Flight",
            duration: "5 days",
            activities: ["Beach visit", "Water sports", "Local sightseeing"]
        }
    },
    {
        id: "2",
        from: "Delhi",
        to: "Manali",
        date: "1-7 April 2023",
        status: "Completed",
        rating: 4.0,
        details: {
            budget: "₹35,000",
            mode: "Train + Bus",
            duration: "7 days",
            activities: ["Trekking", "Skiing", "Local markets"]
        }
    },
    {
        id: "3",
        from: "Bangalore",
        to: "Kerala",
        date: "10-15 May 2023",
        status: "Completed",
        rating: 4.8,
        details: {
            budget: "₹30,000",
            mode: "Flight",
            duration: "6 days",
            activities: ["Backwaters", "Ayurveda", "Wildlife safari"]
        }
    }
]

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

export default function TripHistoryPage() {
    return (
        <div className="container mx-auto py-4 px-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Trip History</h1>
                    <p className="text-sm text-muted-foreground">Your completed trips</p>
                </div>
            </div>

            <div className="space-y-3">
                {pastTrips.map((trip) => (
                    <Collapsible key={trip.id} className="group/collapsible">
                        <div className="rounded-md border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                            <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-accent/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-primary/10">
                                        <MapPin className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-base">{trip.from} → {trip.to}</h3>
                                        <div className="flex items-center gap-1.5 mt-0.5 text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            <span className="text-xs">{trip.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                        <span className="text-xs font-medium text-green-700">{trip.rating}/5</span>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="p-3 border-t bg-muted/50">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-full bg-primary/10">
                                                <IndianRupee className="h-3 w-3 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Budget</p>
                                                <p className="text-sm font-medium">{trip.details.budget}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-full bg-primary/10">
                                                {getTravelIcon(trip.details.mode)}
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Mode</p>
                                                <p className="text-sm font-medium">{trip.details.mode}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-full bg-primary/10">
                                                <Calendar className="h-3 w-3 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Duration</p>
                                                <p className="text-sm font-medium">{trip.details.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-full bg-primary/10">
                                                <MapPin className="h-3 w-3 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Activities</p>
                                                <p className="text-sm font-medium">{trip.details.activities.join(", ")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex justify-end">
                                        <Link 
                                            href={`/dashboard/search/${trip.id}`}
                                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                        >
                                            View Details
                                            <ChevronDown className="h-3 w-3 rotate-90" />
                                        </Link>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </div>
                    </Collapsible>
                ))}
            </div>
        </div>
    )
} 