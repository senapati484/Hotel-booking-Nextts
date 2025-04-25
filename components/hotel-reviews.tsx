"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { getHotelReviews, addReview } from "@/lib/firebase/reviews"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import type { Review } from "@/lib/types"

interface HotelReviewsProps {
  hotelId: string
}

export function HotelReviews({ hotelId }: HotelReviewsProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getHotelReviews(hotelId)
        setReviews(reviewsData)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [hotelId])

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to submit a review",
        variant: "destructive",
      })
      return
    }

    if (!newReview.trim()) {
      toast({
        title: "Review required",
        description: "Please enter your review",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      const newReviewData = {
        hotelId,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userAvatar: user.photoURL || "",
        rating,
        comment: newReview,
        createdAt: new Date().toISOString(),
      }

      await addReview(newReviewData)

      // Add the new review to the list
      setReviews([newReviewData, ...reviews])
      setNewReview("")
      setRating(5)

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {user && (
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-medium">Write a Review</h3>
          <div className="flex items-center space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                <Star className={`h-6 w-6 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Share your experience at this hotel..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            rows={4}
          />
          <Button onClick={handleSubmitReview} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading reviews...</div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.userAvatar || ""} alt={review.userName} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{review.userName}</h4>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center mt-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No reviews yet. Be the first to share your experience!
        </div>
      )}
    </div>
  )
}
