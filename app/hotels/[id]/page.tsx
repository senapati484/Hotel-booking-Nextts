import { notFound } from "next/navigation";
import Image from "next/image";
import { getHotelById } from "@/lib/firebase/hotels";
import { HotelAmenities } from "@/components/hotel-amenities";
import { HotelReviews } from "@/components/hotel-reviews";
import { BookingForm } from "@/components/booking-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Share,
  Heart,
  Users,
  Square,
  Bed,
  Mountain,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HotelDetailsPage(props: Props) {
  // Await the incoming params promise
  const { id } = await props.params;

  // (Optional) If you need query filters:
  // const query = props.searchParams ? await props.searchParams : {};

  const hotel = await getHotelById(id);
  if (!hotel) notFound();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={hotel.images[0] || "/placeholder.svg"}
          alt={hotel.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {hotel.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{hotel.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <span className="font-medium">{hotel.rating}</span>
                <span className="text-white/80">
                  ({hotel.reviewCount} reviews)
                </span>
              </div>
              <div className="flex gap-2 ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                >
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Save to favorites</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                >
                  <Share className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-8">
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-4">
              {hotel.images.slice(1, 5).map((image, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${hotel.name} view ${idx + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>

            {/* About */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About this hotel</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {hotel.description}
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                What this place offers
              </h2>
              <HotelAmenities amenities={hotel.amenities} />
            </div>

            <Separator />

            {/* Rooms */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
              <div className="grid gap-6">
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="group border rounded-xl p-6 hover:border-primary transition-colors"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_auto] gap-6">
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                        <Image
                          src={room.image || "/placeholder.svg"}
                          alt={room.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold">{room.name}</h3>
                          {room.discount && (
                            <Badge variant="secondary">
                              {room.discount}% OFF
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" /> Up to {room.capacity}{" "}
                            guests
                          </div>
                          <div className="flex items-center gap-2">
                            <Square className="h-4 w-4" /> {room.size} sqft
                          </div>
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4" /> {room.bedType}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mountain className="h-4 w-4" /> {room.view} view
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
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
                            <div className="text-sm line-through">
                              ₹{room.originalPrice}
                            </div>
                          )}
                        </div>
                        <Button>Select Room</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
              <HotelReviews hotelId={id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="border-2">
              <CardContent className="p-6">
                <BookingForm hotel={hotel} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
