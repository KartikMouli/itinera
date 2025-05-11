export type TravelMode = "FLIGHT" | "TRAIN" | "BUS" | "CAR" | "BIKE" | "WALK"

export interface TripRecommendation {
    duration: number
    budgetBreakdown: {
        accommodation: number
        transportation: number
        activities: number
        food: number
        miscellaneous: number
    }
    modeOfTravel: TravelMode
    activities: string[]
    itinerary: Array<{
        day: number
        activities: string[]
        notes: string
    }>
    tips: string[]
}

export type SearchResult = {
    trip: {
        id: string
        from: string
        to: string
        budget: number
        modeOfTravel: TravelMode
        duration: number
        activities: string[]
        description: string
        startDate: string | null
        endDate: string | null
    }
    recommendation: {
        duration: number
        budgetBreakdown: {
            accommodation: number
            transportation: number
            activities: number
            food: number
            miscellaneous: number
        }
        modeOfTravel: string
        activities: string[]
        itinerary: Array<{
            day: number
            activities: string[]
            notes: string
            date?: string
        }>
        tips: string[]
    }
} 