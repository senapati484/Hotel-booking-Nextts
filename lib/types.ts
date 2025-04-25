export interface Hotel {
  id: string
  name: string
  location: string
  description: string
  price: number
  originalPrice: number | null
  discount: number | null
  rating: number
  reviewCount: number
  images: string[]
  amenities: string[]
  rooms: Room[]
  featured: boolean
}

export interface Room {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number | null
  discount: number | null
  capacity: number
  bedType: string
  size: number
  view: string
  image: string
}

export interface Review {
  id: string
  hotelId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  createdAt: string
}

export interface Booking {
  id: string
  hotelId: string
  hotelName: string
  roomId: string
  roomName: string
  userId: string
  userName: string
  userEmail: string
  guests: number
  price: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: string
}
