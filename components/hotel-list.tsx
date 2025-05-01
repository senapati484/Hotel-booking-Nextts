import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Users, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Hotel } from "@/lib/types";

interface HotelListProps {
  hotels: Hotel[];
}

export function HotelList({ hotels }: HotelListProps) {
  return (
    <div className="grid gap-6">
      {hotels.map((hotel) => (
        <Link key={hotel.id} href={`/hotels/${hotel.id}`} className="group">
          <Card className="overflow-hidden border-border/50 hover:border-border bg-card/50 hover:bg-card shadow-sm hover:shadow-md transition-all duration-200">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
              <div className="relative h-[200px] md:h-full overflow-hidden">
                <Image
                  src={hotel.images[0] || "/placeholder.svg"}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {hotel.discount && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Save {hotel.discount}%
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Star
                          className="h-4 w-4 text-primary mr-1"
                          fill="currentColor"
                        />
                        <span className="font-medium">{hotel.rating}</span>
                        <span className="text-muted-foreground ml-1">
                          ({hotel.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {hotel.maxGuests} guests
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${hotel.price}</div>
                    <div className="text-sm text-muted-foreground">
                      per night
                    </div>
                    {hotel.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        ${hotel.originalPrice}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {hotel.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities?.slice(0, 4).map((amenity, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-muted/50 text-muted-foreground hover:bg-muted"
                    >
                      {amenity}
                    </Badge>
                  ))}
                  {hotel.amenities?.length > 4 && (
                    <Badge
                      variant="secondary"
                      className="bg-muted/50 text-muted-foreground hover:bg-muted"
                    >
                      +{hotel.amenities.length - 4} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
