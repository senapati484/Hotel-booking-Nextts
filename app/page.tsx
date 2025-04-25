import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, MapPin, Calendar, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { getFeaturedHotels } from "@/lib/firebase/hotels";
import Features from "@/components/features";

export default async function Home() {
  const featuredHotels = await getFeaturedHotels();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center bg-white dark:bg-black transition-colors">
        <div className="container relative px-4 md:px-6 flex flex-col items-center justify-center text-center mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-black dark:text-white mb-6 drop-shadow-lg">
            Find Your Next Luxury Stay
          </h1>
          <p className="text-lg md:text-2xl text-black/80 dark:text-white/80 mb-8 max-w-2xl mx-auto">
            Search and book the world’s most exquisite hotels and resorts. Enjoy exclusive deals, 24/7 concierge, and a seamless booking experience.
          </p>
          {/* Search Card */}
          <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-2xl mx-auto mb-8 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-1 flex flex-col items-center md:items-start">
                <label className="text-sm font-medium text-primary">Destination</label>
                <div className="flex items-center space-x-2 w-full">
                  <MapPin className="h-4 w-4 text-primary" />
                  <Input placeholder="Where to?" className="flex-1 border-primary focus:ring-primary" />
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-primary">Check-in / Check-out</label>
                <DatePickerWithRange className="w-full border-primary focus:ring-primary" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-primary">Guests</label>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <Select>
                    <SelectTrigger className="border-primary focus:ring-primary">
                      <SelectValue placeholder="Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                size="lg"
                className="w-full md:w-auto bg-primary text-white font-bold shadow-lg hover:bg-[#174ea6] transition-colors duration-200 flex items-center gap-2"
              >
                <Star className="h-5 w-5 text-yellow-300" />
                Search Hotels
              </Button>
            </div>
          </div>
          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link href="/hotels" className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-neutral-900 rounded-lg shadow hover:bg-white dark:hover:bg-neutral-800 transition-colors">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium text-primary">Find Hotels</span>
            </Link>
            <Link href="/offers" className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-lg shadow hover:bg-white">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-medium text-primary">View Offers</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-lg shadow hover:bg-white">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium text-primary">Contact Concierge</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="container px-4 md:px-6 py-12 md:py-24 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">
              Featured Luxury Stays
            </h2>
            <p className="text-muted-foreground mt-2">
              Explore our handpicked selection of extraordinary properties
            </p>
          </div>
          <Link href="/hotels" className="mt-4 md:mt-0">
            <Button variant="outline" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHotels.map((hotel) => (
            <Link href={`/hotels/${hotel.id}`} key={hotel.id}>
              <Card className="overflow-hidden group h-full">
                <div className="relative h-[200px] w-full overflow-hidden">
                  <Image
                    src={hotel.images[0] || "/placeholder.svg"}
                    alt={hotel.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium flex items-center">
                    <Star
                      className="h-4 w-4 text-yellow-400 mr-1"
                      fill="currentColor"
                    />
                    {hotel.rating}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{hotel.name}</h3>
                    <p className="font-bold text-lg">
                      ${hotel.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        /night
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {hotel.description}
                  </p>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-muted py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            The Luxurious Beauty Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Curated Selection</h3>
              <p className="text-muted-foreground">
                We handpick only the most exceptional properties that meet our
                strict standards for luxury and service.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">VIP Treatment</h3>
              <p className="text-muted-foreground">
                Enjoy exclusive perks, upgrades, and personalized service at all
                our partner properties.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Concierge Service</h3>
              <p className="text-muted-foreground">
                Our dedicated concierge team is available 24/7 to assist with
                any request, no matter how extravagant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Newsletter Section */}
      <section className="container px-4 md:px-6 py-12 md:py-24 mx-auto max-w-3xl">
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            Join Our Exclusive Club
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to receive VIP offers, travel inspiration, and exclusive
            perks available only to our members.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Input placeholder="Enter your email" className="sm:flex-1" />
            <Button className="rounded-full px-8">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
