import { useState } from "react"
import { Star, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

interface TripCompletionSheetProps {
    onComplete: (rating: number, review: string) => void
}

export function TripCompletionSheet({ onComplete }: TripCompletionSheetProps) {
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
            await onComplete(rating, review)
            toast.success("Trip marked as completed!")
        } catch {
            toast.error("Failed to complete trip")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Complete Trip
                </Button>
            </SheetTrigger>
            <SheetContent className="p-6">
                <SheetHeader className="space-y-4">
                    <SheetTitle className="text-2xl">Complete Your Trip</SheetTitle>
                    <SheetDescription className="text-base">
                        Rate your experience and share your thoughts about the trip.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                    <div className="space-y-4">
                        <p className="text-base font-medium">How was your trip?</p>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    className="p-2 hover:scale-110 transition-transform"
                                    onClick={() => handleRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                >
                                    {star <= (hoverRating || rating) ? (
                                        <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                                    ) : (
                                        <Star className="h-6 w-6 text-muted-foreground" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-base font-medium">Share your experience (optional)</p>
                        <Textarea
                            placeholder="Tell us about your trip..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="min-h-[120px] text-base p-4"
                        />
                    </div>
                </div>
                <SheetFooter className="pt-4">
                    <SheetClose asChild>
                        <Button 
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full text-base"
                        >
                            {isSubmitting ? "Completing..." : "Complete Trip"}
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
} 