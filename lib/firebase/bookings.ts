import { collection, doc, getDocs, addDoc, updateDoc, query, where, serverTimestamp, orderBy } from "firebase/firestore"
import { db } from "./config"
import type { Booking } from "@/lib/types"

// Collection reference
const bookingsCollection = collection(db, "bookings")

// Get bookings for a user
export async function getUserBookings(userId: string): Promise<Booking[]> {
  try {
    const snapshot = await getDocs(
      query(bookingsCollection, where("userId", "==", userId), orderBy("createdAt", "desc")),
    )
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[]
  } catch (error) {
    console.error("Error getting bookings:", error)
    return []
  }
}

// Add a new booking
export async function addBooking(bookingData: Omit<Booking, "id">): Promise<Booking> {
  try {
    const docRef = await addDoc(bookingsCollection, {
      ...bookingData,
      createdAt: serverTimestamp(),
    })

    return {
      id: docRef.id,
      ...bookingData,
    } as Booking
  } catch (error) {
    console.error("Error adding booking:", error)
    throw error
  }
}

// Update a booking
export async function updateBooking(id: string, bookingData: Partial<Booking>): Promise<Booking> {
  try {
    const docRef = doc(db, "bookings", id)
    await updateDoc(docRef, {
      ...bookingData,
      updatedAt: serverTimestamp(),
    })

    return {
      id,
      ...bookingData,
    } as Booking
  } catch (error) {
    console.error("Error updating booking:", error)
    throw error
  }
}

// Cancel a booking
export async function cancelBooking(id: string): Promise<void> {
  try {
    const docRef = doc(db, "bookings", id)
    await updateDoc(docRef, {
      status: "cancelled",
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error cancelling booking:", error)
    throw error
  }
}
