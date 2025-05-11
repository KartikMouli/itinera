"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, MapPin, Calendar, IndianRupee,  Info } from "lucide-react"
import { toast } from "sonner"
import { SearchResult } from "@/lib/types"
import { authClient } from "@/lib/auth-client"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import { Combobox } from "@/components/common/combbox/combbox"

const searchSchema = z.object({
    currentLocation: z.string().min(2, "Current location is required"),
    destination: z.string().min(2, "Destination is required"),
    budget: z.string().optional(),
    dateRange: z.object({
        from: z.string().optional(),
        to: z.string().optional(),
    }).optional(),
    modeOfTravel: z.string().optional(),
})

type SearchFormData = z.infer<typeof searchSchema>

// Define travel modes as options for combobox
const TRAVEL_MODE_OPTIONS = [
    { value: "FLIGHT", label: "Flight" },
    { value: "TRAIN", label: "Train" },
    { value: "BUS", label: "Bus" },
    { value: "CAR", label: "Car" },
    { value: "BIKE", label: "Bike" },
]

interface ItineraryDay {
    day: number;
    date?: string;
    activities: string[];
    notes?: string;
}

export default function SearchPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
    const { data: sessionData } = authClient.useSession()

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SearchFormData>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            currentLocation: "",
            destination: "",
            budget: "",
            modeOfTravel: undefined,
            dateRange: {
                from: "",
                to: ""
            }
        }
    })

    const dateRange = watch("dateRange") || { from: "", to: "" }

    const onSubmit = async (data: SearchFormData) => {
        try {
            if (!sessionData?.user?.id) {
                toast.error("Please sign in to search trips")
                return
            }

            setIsLoading(true)
            // Convert string dates to Date objects for the API
            const formattedData = {
                ...data,
                userId: sessionData.user.id,
                dateRange: data.dateRange ? {
                    from: data.dateRange.from ? new Date(data.dateRange.from) : undefined,
                    to: data.dateRange.to ? new Date(data.dateRange.to) : undefined
                } : undefined
            }



            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/trips/search`, formattedData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionData.session.token}`
                },
            })

            if (response.status !== 200) {
                const error = response.data
                console.error('Server error response:', error)
                throw new Error(error.error || "Failed to search trips")
            }

            const result = response.data
            setSearchResult(result)
            toast.success("Trip recommendations generated!")
        } catch (error) {
            console.error("Search error:", error)
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Failed to search trips")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-6 space-y-6 min-h-screen">
            <div className="max-w-full md:max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Plan Your Trip</CardTitle>
                        <CardDescription>
                            Enter your travel details to get personalized trip recommendations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="currentLocation" className="text-sm">Current Location</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="currentLocation"
                                            placeholder="e.g., Mumbai"
                                            className="pl-8 h-9"
                                            {...register("currentLocation")}
                                        />
                                    </div>
                                    {errors.currentLocation && (
                                        <p className="text-xs text-red-500">{errors.currentLocation.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="destination" className="text-sm">Destination</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="destination"
                                            placeholder="e.g., Goa"
                                            className="pl-8 h-9"
                                            {...register("destination")}
                                        />
                                    </div>
                                    {errors.destination && (
                                        <p className="text-xs text-red-500">{errors.destination.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="budget" className="text-sm">Budget (₹)</Label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="budget"
                                            type="number"
                                            placeholder="e.g., 50000"
                                            className="pl-8 h-9"
                                            {...register("budget")}
                                        />
                                    </div>
                                </div>

                                <div className="w-full space-y-1.5">
                                    <Label htmlFor="modeOfTravel" className="text-sm">Mode of Travel</Label>
                                    <Combobox
                                        value={watch("modeOfTravel")}
                                        onChange={(value) => setValue("modeOfTravel", value)}
                                        options={TRAVEL_MODE_OPTIONS}
                                        placeholder="Select mode of travel"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="startDate" className="text-sm">Start Date</Label>
                                    <div className="relative">

                                        <Input
                                            id="startDate"
                                            type="date"
                                            className=" h-9 [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-datetime-edit]:text-foreground [&::-webkit-datetime-edit-fields-wrapper]:text-foreground"
                                            min={new Date().toISOString().split('T')[0]}
                                            {...register("dateRange.from")}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                setValue("dateRange.from", value)
                                                if (value && dateRange.to && value > dateRange.to) {
                                                    setValue("dateRange.to", value)
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="endDate" className="text-sm">End Date</Label>

                                    <Input
                                        id="endDate"
                                        type="date"
                                        className="h-9 [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-datetime-edit]:text-foreground [&::-webkit-datetime-edit-fields-wrapper]:text-foreground"
                                        min={dateRange.from || new Date().toISOString().split('T')[0]}
                                        {...register("dateRange.to")}
                                        onChange={(e) => setValue("dateRange.to", e.target.value)}
                                    />

                                </div>
                            </div>

                            <Button type="submit" className="w-full h-9" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating Recommendations...
                                    </>
                                ) : (
                                    "Search Trips"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {searchResult && (
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg">Trip Recommendations</CardTitle>
                                    <CardDescription className="mt-1">
                                        Your personalized trip plan from {searchResult.trip.from} to {searchResult.trip.to}
                                    </CardDescription>
                                </div>
                                <Badge variant="secondary" className="text-sm px-3 py-1">
                                    {searchResult.recommendation.duration} Days
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <IndianRupee className="h-4 w-4" />
                                            Budget Breakdown
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {Object.entries(searchResult.recommendation.budgetBreakdown).map(([category, amount]) => (
                                                <div key={category} className="flex justify-between items-center text-sm">
                                                    <span className="capitalize text-muted-foreground">{category}</span>
                                                    <span className="font-medium">₹{Number(amount).toLocaleString()}</span>
                                                </div>
                                            ))}
                                            <Separator className="my-2" />
                                            <div className="flex justify-between items-center text-sm font-semibold">
                                                <span>Total Budget</span>
                                                <span>₹{searchResult.trip.budget?.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Info className="h-4 w-4" />
                                            Trip Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground">Mode of Travel</span>
                                                <Badge variant="outline" className="capitalize text-xs">
                                                    {searchResult.recommendation.modeOfTravel.toLowerCase()}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground">Duration</span>
                                                <span className="font-medium">{searchResult.recommendation.duration} days</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground">Travel Dates</span>
                                                <span className="font-medium">
                                                    {searchResult.trip.startDate ? new Date(searchResult.trip.startDate).toLocaleDateString() : 'Not set'} - {searchResult.trip.endDate ? new Date(searchResult.trip.endDate).toLocaleDateString() : 'Not set'}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">Itinerary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[300px] pr-4">
                                        <div className="space-y-3">
                                            {searchResult.recommendation.itinerary.map((day: ItineraryDay) => (
                                                <Card key={day.day} className="border">
                                                    <CardHeader className="py-2">
                                                        <CardTitle className="text-sm flex items-center gap-2">
                                                            <Calendar className="h-4 w-4" />
                                                            Day {day.day}
                                                            {day.date && (
                                                                <span className="text-xs text-muted-foreground font-normal">
                                                                    ({new Date(day.date).toLocaleDateString()})
                                                                </span>
                                                            )}
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                                            {day.activities.map((activity: string, index: number) => (
                                                                <li key={index} className="text-muted-foreground">{activity}</li>
                                                            ))}
                                                        </ul>
                                                        {day.notes && (
                                                            <p className="mt-2 text-xs text-muted-foreground italic">{day.notes}</p>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Info className="h-4 w-4" />
                                        Travel Tips
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        {searchResult.recommendation.tips.map((tip: string, index: number) => (
                                            <li key={index} className="text-muted-foreground">{tip}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
} 