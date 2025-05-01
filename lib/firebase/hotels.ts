import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  orderBy,
  limit,
} from "firebase/firestore"
import { db } from "./config"
import type { Hotel } from "@/lib/types"

// Collection reference
const hotelsCollection = collection(db, "hotels")

// Get all hotels
export async function getAllHotels(): Promise<Hotel[]> {
  try {
    const snapshot = await getDocs(query(hotelsCollection, orderBy("name")))
    return snapshot.docs.map((doc) => {
      const data = doc.data()
      // Convert Timestamps to ISO strings
      const createdAt = data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      const updatedAt = data.updatedAt?.toDate?.()?.toISOString() || createdAt

      return {
        id: doc.id,
        ...data,
        createdAt,
        updatedAt,
      } as Hotel
    })
  } catch (error) {
    console.error("Error getting hotels:", error)
    return []
  }
}

// Get featured hotels
export async function getFeaturedHotels(): Promise<Hotel[]> {
  try {
    const snapshot = await getDocs(
      query(hotelsCollection, where("featured", "==", true), orderBy("rating", "desc"), limit(3)),
    )
    return snapshot.docs.map((doc) => {
      const data = doc.data()
      // Convert Timestamps to ISO strings
      const createdAt = data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      const updatedAt = data.updatedAt?.toDate?.()?.toISOString() || createdAt

      return {
        id: doc.id,
        ...data,
        createdAt,
        updatedAt,
      } as Hotel
    })
  } catch (error) {
    console.error("Error getting featured hotels:", error)
    return []
  }
}

// Get hotel by ID
export async function getHotelById(id: string): Promise<Hotel | null> {
  try {
    const docRef = doc(db, "hotels", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      // Convert Timestamps to ISO strings
      const createdAt = data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      const updatedAt = data.updatedAt?.toDate?.()?.toISOString() || createdAt

      return {
        id: docSnap.id,
        ...data,
        createdAt,
        updatedAt,
      } as Hotel
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting hotel:", error)
    return null
  }
}

// Add a new hotel
export async function addHotel(hotelData: Omit<Hotel, "id">): Promise<Hotel> {
  try {
    const docRef = await addDoc(hotelsCollection, {
      ...hotelData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return {
      id: docRef.id,
      ...hotelData,
    }
  } catch (error) {
    console.error("Error adding hotel:", error)
    throw error
  }
}

// Update a hotel
export async function updateHotel(id: string, hotelData: Partial<Hotel>): Promise<Hotel> {
  try {
    const docRef = doc(db, "hotels", id)
    await updateDoc(docRef, {
      ...hotelData,
      updatedAt: serverTimestamp(),
    })

    return {
      id,
      ...hotelData,
    } as Hotel
  } catch (error) {
    console.error("Error updating hotel:", error)
    throw error
  }
}

// Delete a hotel
export async function deleteHotel(id: string): Promise<void> {
  try {
    const docRef = doc(db, "hotels", id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting hotel:", error)
    throw error
  }
}
