"use client"

// React and Next.js imports
import { useEffect, useState } from "react"

// Form handling
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// UI Components
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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Loader, Loader2 } from "lucide-react"

// Auth and API
import { authClient } from "@/lib/auth-client"
import axios from "axios"
import { toast } from "sonner"

// Types
const profileFormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    fullName: z.string().min(2, {
        message: "Full name must be at least 2 characters.",
    }),
    bio: z.string().max(160).optional(),
    location: z.string().optional(),
    website: z.string().url().optional().or(z.literal("")),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileData {
    username: string
    email: string
    name: string
    bio?: string
    location?: string
    website?: string
    image?: string
}

// Constants
const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']

export default function ProfilePage() {
    // State
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [tempImageFile, setTempImageFile] = useState<File | null>(null)

    // Auth
    const { data: session } = authClient.useSession()
    const userId = session?.user?.id

    // Form setup
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: "",
            email: "",
            fullName: "",
            bio: "",
            location: "",
            website: "",
        },
    })

    // Fetch profile data
    const fetchProfile = async () => {
        if (!userId) return
        
        try {
            const response = await axios.get<{ userProfile: { user: ProfileData, bio?: string, location?: string, website?: string } }>('/api/profile', {
                params: { userId }
            })
            
            if (response.status !== 200) {
                toast.error('Failed to fetch profile')
                return
            }
            
            const { userProfile } = response.data
            if (userProfile) {
                updateFormWithProfileData(userProfile)
            }
        } catch (error) {
            console.error('Error fetching profile:', error)
            toast.error('Failed to load profile')
        } finally {
            setIsFetching(false)
        }
    }

    // Update form with profile data
    const updateFormWithProfileData = (profile: { user: ProfileData, bio?: string, location?: string, website?: string }) => {
        form.reset({
            username: profile.user.username || "",
            email: profile.user.email || "",
            fullName: profile.user.name || "",
            bio: profile.bio || "",
            location: profile.location || "",
            website: profile.website || "",
        })
        setAvatarUrl(profile.user.image || null)
    }

    // Handle image selection
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            toast.error('Please upload a valid image file (JPEG, PNG, or GIF)')
            return
        }

        if (file.size > MAX_FILE_SIZE) {
            toast.error('Image size should be less than 1MB')
            return
        }

        // Create preview
        const tempUrl = URL.createObjectURL(file)
        setAvatarUrl(tempUrl)
        setTempImageFile(file)
    }

    // Handle form submission
    const onSubmit = async (data: ProfileFormValues) => {
        if (!userId) {
            toast.error('User not authenticated')
            return
        }

        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('userId', userId)
            
            // Add form fields
            Object.entries(data).forEach(([key, value]) => {
                if (value) formData.append(key, value)
            })

            // Add image if changed
            if (tempImageFile) {
                formData.append('file', tempImageFile)
            }

            const response = await axios.post<{ userProfile: { user: ProfileData, bio?: string, location?: string, website?: string } }>(
                '/api/profile', 
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )

            if (response.status !== 200) throw new Error('Failed to update profile')

            const { userProfile } = response.data
            if (userProfile) {
                updateFormWithProfileData(userProfile)
                setTempImageFile(null)
                toast.success('Profile updated successfully')
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error('Failed to update profile')
        } finally {
            setIsLoading(false)
        }
    }

    // Load profile on mount
    useEffect(() => {
        fetchProfile()
    }, [userId])

    // Loading state
    if (isFetching) {
        return (
            <div className="container max-w-2xl mx-auto py-8 px-4 flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <Loader className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="container max-w-2xl mx-auto py-8 px-4">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                        Update your profile information and settings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative">
                            <Avatar className="w-24 h-24">
                                {avatarUrl ? (
                                    <AvatarImage 
                                        src={avatarUrl}
                                        alt={form.getValues("fullName") || "User"} 
                                    />
                                ) : (
                                    <AvatarFallback>
                                        {(form.getValues("fullName") || "U").charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <label
                                htmlFor="avatar-upload"
                                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90"
                            >
                                <Camera className="h-4 w-4" />
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept={ALLOWED_FILE_TYPES.join(',')}
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                    disabled={isLoading}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="johndoe" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Your email address.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Your full name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little bit about yourself"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Brief description for your profile.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="New York, USA" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Where are you located?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Your personal website or blog.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Update Profile
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
} 