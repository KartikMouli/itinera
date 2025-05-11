import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { z } from "zod"
import { TravelMode } from "@/lib/types"

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

// Define valid travel modes
const VALID_TRAVEL_MODES = ["FLIGHT", "TRAIN", "BUS", "CAR", "BIKE", "WALK"] as const

// Input validation schema
const searchSchema = z.object({
    currentLocation: z.string().min(2),
    destination: z.string().min(2),
    budget: z.string().optional(),
    dateRange: z.object({
        from: z.string().optional().transform(str => str ? new Date(str) : undefined),
        to: z.string().optional().transform(str => str ? new Date(str) : undefined),
    }).optional(),
    modeOfTravel: z.string().optional().transform(val => {
        if (!val) return undefined
        // Convert to uppercase to match enum
        const upperVal = val.toUpperCase()
        // Validate against valid travel modes
        if (VALID_TRAVEL_MODES.includes(upperVal as typeof VALID_TRAVEL_MODES[number])) {
            return upperVal as TravelMode
        }
        return undefined
    }),
    userId: z.string().min(1),
})

// Gemini prompt template for trip recommendations
const TRIP_RECOMMENDATION_PROMPT = `You are a travel expert specializing in Indian destinations. 
Given the following travel details, provide a detailed trip recommendation:

Current Location: {currentLocation}
Destination: {destination}
Budget: {budget}
Travel Dates: {dateRange}
Mode of Travel: {modeOfTravel}

Please provide a response in the following JSON format:
{
    "tripRecommendation": {
        "duration": number, // in days
        "budgetBreakdown": {
            "accommodation": number,
            "transportation": number,
            "activities": number,
            "food": number,
            "miscellaneous": number
        },
        "modeOfTravel": string,
        "activities": string[],
        "itinerary": [
            {
                "day": number,
                "activities": string[],
                "notes": string
            }
        ],
        "tips": string[]
    }
}

Focus on practical, realistic recommendations that consider:
1. Local culture and customs
2. Weather conditions
3. Transportation options
4. Popular attractions
5. Budget constraints
6. Safety considerations

IMPORTANT: Respond ONLY with the JSON object, no additional text.`

export async function POST(req: Request) {
    try {
        // Parse and validate request body
        const body = await req.json()
        
        
        try {
            const validatedData = searchSchema.parse(body)


            // Verify user exists
            const user = await prisma.user.findUnique({
                where: { id: validatedData.userId }
            })

            if (!user) {
                return NextResponse.json(
                    { error: "User not found" },
                    { status: 404 }
                )
            }

          

            // Prepare prompt for Gemini
            const prompt = TRIP_RECOMMENDATION_PROMPT
                .replace("{currentLocation}", validatedData.currentLocation)
                .replace("{destination}", validatedData.destination)
                .replace("{budget}", validatedData.budget || "Not specified")
                .replace("{dateRange}", validatedData.dateRange 
                    ? `${validatedData.dateRange.from?.toLocaleDateString()} to ${validatedData.dateRange.to?.toLocaleDateString()}`
                    : "Not specified")
                .replace("{modeOfTravel}", validatedData.modeOfTravel || "Not specified")

            // Get trip recommendation from Gemini
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
            const result = await model.generateContent(prompt)
            const response = await result.response
            const content = response.text()

            if (!content) {
                throw new Error("No response from Gemini")
            }

            // Clean the response content by removing markdown code block formatting
            const jsonContent = content.replace(/```json\n?|\n?```/g, '').trim()

            // Parse the recommendation
            const recommendation = JSON.parse(jsonContent)

              // Save the search to history
            const savedSearch = await prisma.savedSearch.create({
                data: {
                    id: crypto.randomUUID(),
                    userId: validatedData.userId,
                    currentLocation: validatedData.currentLocation,
                    destination: validatedData.destination,
                    budget: validatedData.budget ? parseFloat(validatedData.budget) : null,
                    startDate: validatedData.dateRange?.from || null,
                    endDate: validatedData.dateRange?.to || null,
                    modeOfTravel: validatedData.modeOfTravel as any || null,
                    numberOfDays: validatedData.dateRange?.from && validatedData.dateRange?.to 
                        ? Math.ceil((validatedData.dateRange.to.getTime() - validatedData.dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
                        : null,
                }
            })

            // Create a new trip from the recommendation
            const trip = await prisma.trip.create({
                data: {
                    id: crypto.randomUUID(),
                    userId: validatedData.userId,
                    from: validatedData.currentLocation,
                    to: validatedData.destination,
                    startDate: validatedData.dateRange?.from || null,
                    endDate: validatedData.dateRange?.to || null,
                    budget: recommendation.tripRecommendation.budgetBreakdown.accommodation + 
                            recommendation.tripRecommendation.budgetBreakdown.transportation +
                            recommendation.tripRecommendation.budgetBreakdown.activities +
                            recommendation.tripRecommendation.budgetBreakdown.food +
                            recommendation.tripRecommendation.budgetBreakdown.miscellaneous,
                    modeOfTravel: validatedData.modeOfTravel || recommendation.tripRecommendation.modeOfTravel.toUpperCase() as TravelMode,
                    duration: recommendation.tripRecommendation.duration,
                    activities: recommendation.tripRecommendation.activities,
                    description: recommendation.tripRecommendation.tips.join("\n"),
                    savedSearch: {
                        connect: { id: savedSearch.id }
                    },
                    itinerary: {
                        create: recommendation.tripRecommendation.itinerary.map((day: any) => ({
                            id: crypto.randomUUID(),
                            dayNumber: day.day,
                            date: validatedData.dateRange?.from 
                                ? new Date(validatedData.dateRange.from.getTime() + (day.day - 1) * 24 * 60 * 60 * 1000)
                                : new Date(),
                            activities: day.activities,
                            notes: day.notes
                        }))
                    }
                },
                include: {
                    itinerary: true
                }
            })

            // Update saved search with trip ID
            await prisma.savedSearch.update({
                where: { id: savedSearch.id },
                data: { tripId: trip.id }
            })

            return NextResponse.json({
                trip,
                recommendation: recommendation.tripRecommendation
            })

        } catch (error) {
            console.error('Validation error:', error)
            if (error instanceof z.ZodError) {
                return NextResponse.json(
                    { error: "Invalid input", details: error.errors },
                    { status: 400 }
                )
            }
            throw error
        }

    } catch (error) {
        console.error('Trip search error:', error)
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid input", details: error.errors },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { error: "Failed to search trips" },
            { status: 500 }
        )
    }
} 