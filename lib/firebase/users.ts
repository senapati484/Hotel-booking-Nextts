/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./config"

// Get user role
export async function getUserRole(userId: string, profileData?: any): Promise<boolean> {
  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data().isAdmin || false
    } else {
      // Create full user document if it doesn't exist and profileData is provided
      if (profileData) {
        await setUserProfile(userId, profileData)
      } else {
        await setDoc(docRef, {
          isAdmin: false,
          createdAt: serverTimestamp(),
        })
      }
      return false
    }
  } catch (error) {
    console.error("Error getting user role:", error)
    return false
  }
}

// Set user profile (create or overwrite)
export async function setUserProfile(userId: string, profileData: any): Promise<void> {
  try {
    const docRef = doc(db, "users", userId)
    await setDoc(docRef, {
      ...profileData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true })
  } catch (error) {
    console.error("Error setting user profile:", error)
    throw error
  }
}

// Update user profile
export async function updateUserProfile(userId: string, profileData: any): Promise<void> {
  try {
    const docRef = doc(db, "users", userId)
    await updateDoc(docRef, {
      ...profileData,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

// Get user profile
export async function getUserProfile(userId: string): Promise<any | null> {
  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}
