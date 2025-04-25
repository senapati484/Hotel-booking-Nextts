import { notFound } from "next/navigation";
import Image from "next/image";
import { getHotelById } from "@/lib/firebase/hotels";
import { HotelGallery } from "@/components/hotel-gallery";
import { HotelAmenities } from "@/components/hotel-amenities";
import { HotelReviews } from "@/components/hotel-reviews";
import { BookingForm } from "@/components/booking-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Share, Heart } from "lucide-react";

export default async function HotelDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const hotel = await getHotelById(params.id);

  if (!hotel) {
    notFound();
  }

  return (
    <div className="w-full flex justify-center px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6 w-full max-w-screen-lg">
        {/* Hotel Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{hotel.name}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{hotel.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-primary/10 px-3 py-1 rounded-md">
              <Star className="h-4 w-4 text-primary mr-1" fill="currentColor" />
              <span className="font-medium">{hotel.rating}</span>
              <span className="text-muted-foreground ml-1">
                ({hotel.reviewCount} reviews)
              </span>
            </div>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Save to favorites</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>

        {/* Hotel Gallery */}
        <HotelGallery images={hotel.images} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About this hotel</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {hotel.description}
              </p>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <HotelAmenities amenities={hotel.amenities} />
            </div>

            <Separator />

            {/* Rooms */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
              <div className="grid gap-4">
                {hotel.rooms.map((room) => (
                  <div key={room.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4">
                      <div className="relative h-[150px] rounded-md overflow-hidden">
                        <Image
                          src={room.image || "/placeholder.svg"}
                          alt={room.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold">{room.name}</h3>
                          {room.discount && (
                            <Badge
                              variant="outline"
                              className="text-green-600 border-green-600"
                            >
                              {room.discount}% OFF
                            </Badge>
                          )}
                        </div>
                        <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <li className="flex items-center">
                            <span className="mr-2">•</span>
                            Up to {room.capacity} guests
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">•</span>
                            {room.size} sqft
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">•</span>
                            {room.bedType}
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">•</span>
                            {room.view} view
                          </li>
                        </ul>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {room.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            ${room.price}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per night
                          </div>
                          {room.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ${room.originalPrice}
                            </div>
                          )}
                        </div>
                        <Button>Select</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>
              <HotelReviews hotelId={hotel.id} />
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm hotel={hotel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
