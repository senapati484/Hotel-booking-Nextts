import type { Hotel } from "@/lib/types"

export const featuredHotels: Hotel[] = [
  {
    id: "1",
    name: "Grand Plaza Hotel",
    location: "New York, NY",
    description:
      "Experience luxury in the heart of Manhattan with stunning views of Central Park and easy access to the city's top attractions.",
    price: 299,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "breakfast", "gym", "restaurant"],
    discount: null,
    originalPrice: null,
  },
  {
    id: "2",
    name: "Seaside Resort & Spa",
    location: "Miami, FL",
    description:
      "Relax in our beachfront resort featuring a world-class spa, multiple pools, and direct beach access for the ultimate vacation experience.",
    price: 349,
    originalPrice: 429,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "breakfast", "gym", "restaurant"],
    discount: 20,
  },
  {
    id: "3",
    name: "Mountain View Lodge",
    location: "Denver, CO",
    description:
      "Escape to the mountains in our rustic yet modern lodge. Perfect for outdoor enthusiasts with hiking, skiing, and breathtaking views.",
    price: 199,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "breakfast", "restaurant"],
    discount: null,
    originalPrice: null,
  },
]

export const hotels: Hotel[] = [
  ...featuredHotels,
  {
    id: "4",
    name: "Urban Boutique Hotel",
    location: "San Francisco, CA",
    description:
      "A stylish boutique hotel in the heart of San Francisco, offering unique rooms, artisanal dining, and a rooftop bar with city views.",
    price: 279,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "breakfast", "restaurant"],
    discount: null,
    originalPrice: null,
  },
  {
    id: "5",
    name: "Historic Downtown Inn",
    location: "Boston, MA",
    description:
      "Stay in a beautifully restored 19th-century building with modern amenities, located in Boston's historic district.",
    price: 229,
    originalPrice: 289,
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "breakfast"],
    discount: 15,
  },
  {
    id: "6",
    name: "Lakeside Retreat",
    location: "Chicago, IL",
    description:
      "Enjoy stunning lake views and a peaceful atmosphere just minutes from downtown Chicago's vibrant attractions and dining.",
    price: 249,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "gym", "restaurant"],
    discount: null,
    originalPrice: null,
  },
  {
    id: "7",
    name: "Desert Oasis Resort",
    location: "Phoenix, AZ",
    description:
      "An elegant desert retreat featuring multiple pools, a championship golf course, and spectacular mountain views.",
    price: 319,
    originalPrice: 399,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "breakfast", "gym", "restaurant"],
    discount: 20,
  },
  {
    id: "8",
    name: "Riverside Suites",
    location: "New Orleans, LA",
    description:
      "Spacious suites with balconies overlooking the Mississippi River, within walking distance to the French Quarter.",
    price: 189,
    rating: 4.3,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["wifi", "breakfast"],
    discount: null,
    originalPrice: null,
  },
]
