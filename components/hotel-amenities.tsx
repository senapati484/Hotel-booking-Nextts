import type React from "react"
import {
  Wifi,
  Coffee,
  Utensils,
  Dumbbell,
  Car,
  Snowflake,
  Tv,
  Waves,
  ShowerHeadIcon as SwimmingPool,
  SpadeIcon as Spa,
  CoffeeIcon as Cocktail,
  Baby,
  PawPrint,
  ShipWheelIcon as Wheelchair,
  ShieldCheck,
  Leaf,
} from "lucide-react"

interface HotelAmenitiesProps {
  amenities: string[]
}

export function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="h-5 w-5" />,
    breakfast: <Coffee className="h-5 w-5" />,
    restaurant: <Utensils className="h-5 w-5" />,
    gym: <Dumbbell className="h-5 w-5" />,
    parking: <Car className="h-5 w-5" />,
    "air-conditioning": <Snowflake className="h-5 w-5" />,
    tv: <Tv className="h-5 w-5" />,
    "beach-access": <Waves className="h-5 w-5" />,
    pool: <SwimmingPool className="h-5 w-5" />,
    spa: <Spa className="h-5 w-5" />,
    bar: <Cocktail className="h-5 w-5" />,
    "family-friendly": <Baby className="h-5 w-5" />,
    "pet-friendly": <PawPrint className="h-5 w-5" />,
    "wheelchair-accessible": <Wheelchair className="h-5 w-5" />,
    security: <ShieldCheck className="h-5 w-5" />,
    "eco-friendly": <Leaf className="h-5 w-5" />,
  }

  const amenityLabels: Record<string, string> = {
    wifi: "Free WiFi",
    breakfast: "Breakfast Included",
    restaurant: "Restaurant",
    gym: "Fitness Center",
    parking: "Free Parking",
    "air-conditioning": "Air Conditioning",
    tv: "Flat-screen TV",
    "beach-access": "Beach Access",
    pool: "Swimming Pool",
    spa: "Spa Services",
    bar: "Bar/Lounge",
    "family-friendly": "Family Friendly",
    "pet-friendly": "Pet Friendly",
    "wheelchair-accessible": "Wheelchair Accessible",
    security: "24/7 Security",
    "eco-friendly": "Eco-Friendly",
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {amenities.map((amenity) => (
        <div key={amenity} className="flex items-center gap-2">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            {amenityIcons[amenity] || <div className="h-5 w-5" />}
          </div>
          <span>{amenityLabels[amenity] || amenity}</span>
        </div>
      ))}
    </div>
  )
}
