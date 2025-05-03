import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, MapPin, Users, Search } from "lucide-react";
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero-bg.jpg"
            alt="Luxury Hotel"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/90 dark:bg-background/95" />
        </div>

        <div className="container relative px-4 md:px-6 flex flex-col items-center justify-center text-center mx-auto max-w-4xl z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Discover Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience luxury and comfort in world-class hotels. Special rates
            and member benefits awaiting you.
          </p>

          {/* Search Card */}
          <div className="w-full max-w-3xl bg-card/80 dark:bg-card/90 backdrop-blur-md rounded-xl p-6 shadow-md border border-border">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4 space-y-2">
                <label className="text-sm font-medium text-primary block">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <Input
                    placeholder="Where to?"
                    className="pl-10 border-primary/20 focus:border-primary hover:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div className="md:col-span-5 space-y-2">
                <label className="text-sm font-medium text-primary block">
                  Check-in / Check-out
                </label>
                <DatePickerWithRange className="border-primary/20 focus:border-primary hover:border-primary/50 transition-colors" />
              </div>

              <div className="md:col-span-3 space-y-2">
                <label className="text-sm font-medium text-primary block">
                  Guests
                </label>
                <Select>
                  <SelectTrigger className="border-primary/20 focus:border-primary hover:border-primary/50 transition-colors">
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

            <div className="mt-6 flex justify-center">
              <Link href="/hotels" className="w-full md:w-auto">
                <Button
                  size="lg"
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm transition-all duration-200"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Available Hotels
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/hotels">
              <Button
                variant="secondary"
                className="bg-card/50 hover:bg-card/70 backdrop-blur-sm"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Browse All Hotels
              </Button>
            </Link>
            <Link href="/offers">
              <Button
                variant="secondary"
                className="bg-card/50 hover:bg-card/70 backdrop-blur-sm"
              >
                <Star className="mr-2 h-4 w-4" />
                Special Offers
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="secondary"
                className="bg-card/50 hover:bg-card/70 backdrop-blur-sm"
              >
                <Users className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Featured Luxury Stays
              </h2>
              <p className="text-muted-foreground text-lg">
                Handpicked premium properties for an unforgettable experience
              </p>
            </div>
            <Link href="/hotels" className="mt-6 md:mt-0">
              <Button
                variant="outline"
                className="border-primary/20 hover:border-primary"
              >
                View All Hotels
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <Link
                href={`/hotels/${hotel.id}`}
                key={hotel.id}
                className="group"
              >
                <Card className="overflow-hidden border-border/50 hover:border-border shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="relative h-[240px] w-full overflow-hidden">
                    <Image
                      src={hotel.images[0] || "/placeholder.svg"}
                      alt={hotel.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star
                        className="h-4 w-4 text-primary mr-1"
                        fill="currentColor"
                      />
                      {hotel.rating}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {hotel.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${hotel.price}</p>
                        <p className="text-sm text-muted-foreground">
                          per night
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 mb-4 text-sm">
                      {hotel.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Newsletter Section */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Join Our Exclusive Club
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Subscribe for VIP access to exclusive offers, luxury travel
            insights, and member-only perks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              type="email"
              className="bg-card border-border/50 focus:border-primary"
            />
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </section>
    </div>
  );
}
