"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Calendar, Car, Train, Plane, Bus, History, Plus, IndianRupee } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/date-range-picker/date-range-picker"
import { DateRange } from "react-day-picker"
import { Combobox } from "@/components/combbox/combbox"
import Link from "next/link"

// Indian cities for autocomplete
const indianCities = [
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" },
    { value: "pune", label: "Pune" },
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "jaipur", label: "Jaipur" },
    { value: "lucknow", label: "Lucknow" },
    { value: "kochi", label: "Kochi" },
    { value: "goa", label: "Goa" },
    { value: "varanasi", label: "Varanasi" },
    { value: "agra", label: "Agra" },
    { value: "udaipur", label: "Udaipur" },
    { value: "jodhpur", label: "Jodhpur" },
    { value: "shimla", label: "Shimla" },
    { value: "manali", label: "Manali" },
    { value: "darjeeling", label: "Darjeeling" },
    { value: "mysore", label: "Mysore" },
    { value: "pondicherry", label: "Pondicherry" },
    { value: "amritsar", label: "Amritsar" },
    { value: "rishikesh", label: "Rishikesh" },
    { value: "kerala", label: "Kerala" },
    { value: "ladakh", label: "Ladakh" },
    { value: "andaman", label: "Andaman" },
    { value: "sikkim", label: "Sikkim" }
]

// Define the form schema
const searchFormSchema = z.object({
    currentLocation: z.string().min(2, {
        message: "Current location must be at least 2 characters.",
    }),
    destination: z.string().min(2, {
        message: "Destination must be at least 2 characters.",
    }),
    budget: z.string().optional(),
    dateRange: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }).optional(),
    modeOfTravel: z.string().optional(),
})

type SearchFormValues = z.infer<typeof searchFormSchema>

// Mock data for saved searches with Indian destinations
const savedSearches = [
    {
        id: "1",
        currentLocation: "Mumbai",
        destination: "Goa",
        budget: "₹25,000",
        numberOfDays: "5",
        modeOfTravel: "train",
        date: "2024-03-15",
    },
    {
        id: "2",
        currentLocation: "Delhi",
        destination: "Manali",
        budget: "₹15,000",
        numberOfDays: "4",
        modeOfTravel: "bus",
        date: "2024-03-10",
    },
    {
        id: "3",
        currentLocation: "Bangalore",
        destination: "Kerala",
        budget: "₹30,000",
        numberOfDays: "7",
        modeOfTravel: "plane",
        date: "2024-03-05",
    },
]

const travelModes = [
    { value: "plane", label: "Plane" },
    { value: "train", label: "Train" },
    { value: "car", label: "Car" },
    { value: "bus", label: "Bus" },
    { value: "bike", label: "Bike" },
]

export default function SearchPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [dateRange, setDateRange] = useState<DateRange | undefined>()

    const form = useForm<SearchFormValues>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
            currentLocation: "",
            destination: "",
            budget: "",
            dateRange: undefined,
            modeOfTravel: "",
        },
    })

    async function onSubmit(data: SearchFormValues) {
        setIsLoading(true)
        try {
            // TODO: Implement API call to search trips
            console.log(data)
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getTravelIcon = (mode: string) => {
        switch (mode) {
            case "plane":
                return <Plane className="h-4 w-4" />
            case "train":
                return <Train className="h-4 w-4" />
            case "car":
                return <Car className="h-4 w-4" />
            case "bus":
                return <Bus className="h-4 w-4" />
            default:
                return null
        }
    }

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
            {/* Search Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Plan Your Indian Adventure</CardTitle>
                    <CardDescription>
                        Discover the beauty of India with personalized travel recommendations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="currentLocation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Location</FormLabel>
                                            <FormControl>
                                                <Combobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={indianCities}
                                                    placeholder="Where are you now?"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="destination"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Destination</FormLabel>
                                            <FormControl>
                                                <Combobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={indianCities}
                                                    placeholder="Where do you want to go?"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="budget"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Budget (Optional)</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                                    <Input placeholder="Your budget in INR" className="pl-10" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Enter your total budget for the trip in Indian Rupees
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="dateRange"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Travel Dates (Optional)</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <DateRangePicker
                                                        date={dateRange}
                                                        onSelect={(range) => {
                                                            setDateRange(range)
                                                            field.onChange(range)
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Select your travel dates
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="modeOfTravel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mode of Travel (Optional)</FormLabel>
                                            <FormControl>
                                                <Combobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={travelModes}
                                                    placeholder="Select travel mode"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Choose your preferred mode of transportation
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <Search className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Search className="mr-2 h-4 w-4" />
                                )}
                                Search Trips
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Saved Searches */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Saved Searches</CardTitle>
                            <CardDescription>
                                Your previous Indian travel searches
                            </CardDescription>
                        </div>
                        <Link href="/dashboard/search/all">
                            <Button variant="outline" size="sm">
                                <History className="mr-2 h-4 w-4" />
                                View All
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {savedSearches.map((search) => (
                            <Card key={search.id} className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold">{search.currentLocation}</h4>
                                            <span>→</span>
                                            <h4 className="font-semibold">{search.destination}</h4>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {search.numberOfDays} days
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <IndianRupee className="h-3 w-3" />
                                                {search.budget}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                {getTravelIcon(search.modeOfTravel)}
                                                {search.modeOfTravel}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary">{search.date}</Badge>
                                        <Link href={`/dashboard/search/${search.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 