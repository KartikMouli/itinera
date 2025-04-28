import { useState } from "react"
import { Star, StarHalf, StarOff, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface TripCompletionProps {
    tripId: string
    onComplete: (rating: number, review: string) => void
}

export function TripCompletion({ tripId, onComplete }: TripCompletionProps) {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [review, setReview] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleRating = (value: number) => {
        setRating(value)
    }

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Please provide a rating")
            return
        }

        setIsSubmitting(true)
        try {
            // Here you would typically make an API call to update the trip status
            await onComplete(rating, review)
            toast.success("Trip marked as completed!")
        } catch (error) {
            toast.error("Failed to complete trip")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Complete Your Trip</h3>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">How was your trip?</p>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            className="p-1"
                            onClick={() => handleRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            {star <= (hoverRating || rating) ? (
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                            ) : (
                                <Star className="h-5 w-5 text-muted-foreground" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Share your experience (optional)</p>
                <Textarea
                    placeholder="Tell us about your trip..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="min-h-[100px]"
                />
            </div>

            <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full"
            >
                {isSubmitting ? "Completing..." : "Complete Trip"}
            </Button>
        </div>
    )
} 