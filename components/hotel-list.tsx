import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Wifi, Coffee, Utensils, Dumbbell, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Hotel } from "@/lib/types"

interface HotelListProps {
  hotels: Hotel[]
}

export function HotelList({ hotels }: HotelListProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hotels ({hotels.length})</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select className="text-sm border rounded-md px-2 py-1">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
                <div className="relative h-[200px] md:h-full">
                  <Image src={hotel.images[0] || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                  >
                    <Heart className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Save to favorites</span>
                  </Button>
                  {hotel.discount && <Badge className="absolute bottom-2 left-2">{hotel.discount}% OFF</Badge>}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-xl font-bold">{hotel.name}</h2>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-primary/10 px-2 py-1 rounded-md">
                      <Star className="h-4 w-4 text-primary mr-1" fill="currentColor" />
                      <span className="font-medium">{hotel.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">{hotel.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.includes("wifi") && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Wifi className="h-3 w-3" />
                        <span>Free WiFi</span>
                      </Badge>
                    )}
                    {hotel.amenities.includes("breakfast") && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Coffee className="h-3 w-3" />
                        <span>Breakfast</span>
                      </Badge>
                    )}
                    {hotel.amenities.includes("restaurant") && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Utensils className="h-3 w-3" />
                        <span>Restaurant</span>
                      </Badge>
                    )}
                    {hotel.amenities.includes("gym") && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Dumbbell className="h-3 w-3" />
                        <span>Fitness Center</span>
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-2xl font-bold">
                        ${hotel.price}
                        <span className="text-sm font-normal text-muted-foreground">/night</span>
                      </div>
                      {hotel.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">${hotel.originalPrice}</div>
                      )}
                    </div>
                    <Link href={`/hotels/${hotel.id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
