import { z } from "zod"

// Enums
export const TripStatus = z.enum(["PLANNING", "UPCOMING", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
export const TravelMode = z.enum(["FLIGHT", "TRAIN", "BUS", "CAR", "BIKE", "WALK"])
export const UserRole = z.enum(["USER", "ADMIN"])
export const TripType = z.enum(["SOLO", "COUPLE", "FAMILY", "FRIENDS", "BUSINESS"])

// Base Schemas
export const BaseSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

// User Schema
export const UserSchema = BaseSchema.extend({
    email: z.string().email(),
    name: z.string(),
    role: UserRole,
    profileImage: z.string().url().optional(),
    preferences: z.object({
        theme: z.enum(["light", "dark"]),
        notifications: z.boolean(),
        language: z.string(),
    }),
    stats: z.object({
        totalTrips: z.number(),
        completedTrips: z.number(),
        totalDistance: z.number(),
    }),
})

// Location Schema
export const LocationSchema = BaseSchema.extend({
    name: z.string(),
    coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
    }),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    type: z.enum(["CITY", "LANDMARK", "HOTEL", "RESTAURANT", "OTHER"]),
})

// Trip Schema
export const TripSchema = BaseSchema.extend({
    userId: z.string(),
    title: z.string(),
    description: z.string().optional(),
    status: TripStatus,
    type: TripType,
    startDate: z.date(),
    endDate: z.date(),
    budget: z.number(),
    currency: z.string(),
    locations: z.array(z.object({
        locationId: z.string(),
        order: z.number(),
        arrivalDate: z.date(),
        departureDate: z.date(),
        notes: z.string().optional(),
    })),
    travelModes: z.array(TravelMode),
    participants: z.array(z.object({
        userId: z.string(),
        role: z.enum(["OWNER", "PARTICIPANT"]),
        status: z.enum(["INVITED", "ACCEPTED", "DECLINED"]),
    })),
    activities: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        locationId: z.string(),
        startTime: z.date(),
        endTime: z.date(),
        cost: z.number().optional(),
        status: z.enum(["PLANNED", "COMPLETED", "CANCELLED"]),
    })),
    expenses: z.array(z.object({
        id: z.string(),
        amount: z.number(),
        currency: z.string(),
        category: z.enum(["TRANSPORTATION", "ACCOMMODATION", "FOOD", "ACTIVITIES", "SHOPPING", "OTHER"]),
        description: z.string(),
        date: z.date(),
        paidBy: z.string(), // userId
        splitBetween: z.array(z.string()), // userIds
    })),
})

// Review Schema
export const ReviewSchema = BaseSchema.extend({
    tripId: z.string(),
    userId: z.string(),
    rating: z.number().min(1).max(5),
    title: z.string(),
    content: z.string(),
    photos: z.array(z.string().url()).optional(),
    likes: z.number(),
    comments: z.array(z.object({
        id: z.string(),
        userId: z.string(),
        content: z.string(),
        createdAt: z.date(),
    })),
})

// Notification Schema
export const NotificationSchema = BaseSchema.extend({
    userId: z.string(),
    type: z.enum(["TRIP_UPDATE", "INVITATION", "REMINDER", "SYSTEM"]),
    title: z.string(),
    message: z.string(),
    read: z.boolean(),
    data: z.record(z.any()).optional(),
})

// Trip Template Schema
export const TripTemplateSchema = BaseSchema.extend({
    name: z.string(),
    description: z.string(),
    locations: z.array(z.string()), // locationIds
    activities: z.array(z.object({
        title: z.string(),
        description: z.string(),
        duration: z.number(), // in hours
        category: z.string(),
    })),
    estimatedBudget: z.number(),
    tags: z.array(z.string()),
})

// Export Types
export type TripStatus = z.infer<typeof TripStatus>
export type TravelMode = z.infer<typeof TravelMode>
export type UserRole = z.infer<typeof UserRole>
export type TripType = z.infer<typeof TripType>
export type User = z.infer<typeof UserSchema>
export type Location = z.infer<typeof LocationSchema>
export type Trip = z.infer<typeof TripSchema>
export type Review = z.infer<typeof ReviewSchema>
export type Notification = z.infer<typeof NotificationSchema>
export type TripTemplate = z.infer<typeof TripTemplateSchema> 