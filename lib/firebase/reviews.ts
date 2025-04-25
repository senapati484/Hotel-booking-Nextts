import { collection, doc, getDocs, addDoc, deleteDoc, query, where, serverTimestamp, orderBy } from "firebase/firestore"
import { db } from "./config"
import type { Review } from "@/lib/types"

// Collection reference
const reviewsCollection = collection(db, "reviews")

// Get reviews for a hotel
export async function getHotelReviews(hotelId: string): Promise<Review[]> {
  try {
    const snapshot = await getDocs(
      query(reviewsCollection, where("hotelId", "==", hotelId), orderBy("createdAt", "desc")),
    )
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[]
  } catch (error) {
    console.error("Error getting reviews:", error)
    return []
  }
}

// Add a new review
export async function addReview(reviewData: Omit<Review, "id">): Promise<Review> {
  try {
    const docRef = await addDoc(reviewsCollection, {
      ...reviewData,
      createdAt: serverTimestamp(),
    })

    return {
      id: docRef.id,
      ...reviewData,
    } as Review
  } catch (error) {
    console.error("Error adding review:", error)
    throw error
  }
}

// Delete a review
export async function deleteReview(id: string): Promise<void> {
  try {
    const docRef = doc(db, "reviews", id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting review:", error)
    throw error
  }
}
