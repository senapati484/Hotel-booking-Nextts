"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Star,
  Building2,
  Palmtree,
  Home,
  House,
  Trees,
  Users,
  Wifi,
  Coffee,
  Waves,
  Car,
  Dumbbell,
  HeartPulse,
  Utensils,
  PawPrint,
  Umbrella,
  Wine,
} from "lucide-react";

interface Filters {
  priceRange: number[];
  rating: number[];
  propertyType: string[];
  amenities: string[];
}

export function HotelFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [50, 500],
    rating: [],
    propertyType: [],
    amenities: [],
  });

  // Initialize filters from URL params
  useEffect(() => {
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const rating = searchParams.get("rating")?.split(",").map(Number);
    const propertyType = searchParams.get("propertyType")?.split(",");
    const amenities = searchParams.get("amenities")?.split(",");

    setFilters({
      priceRange: [
        priceMin ? parseInt(priceMin) : 50,
        priceMax ? parseInt(priceMax) : 500,
      ],
      rating: rating || [],
      propertyType: propertyType || [],
      amenities: amenities || [],
    });
  }, [searchParams]);

  const handleApplyFilters = () => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Update price range
    currentParams.set("priceMin", filters.priceRange[0].toString());
    currentParams.set("priceMax", filters.priceRange[1].toString());

    // Update rating
    if (filters.rating.length > 0) {
      currentParams.set("rating", filters.rating.join(","));
    } else {
      currentParams.delete("rating");
    }

    // Update property type
    if (filters.propertyType.length > 0) {
      currentParams.set("propertyType", filters.propertyType.join(","));
    } else {
      currentParams.delete("propertyType");
    }

    // Update amenities
    if (filters.amenities.length > 0) {
      currentParams.set("amenities", filters.amenities.join(","));
    } else {
      currentParams.delete("amenities");
    }

    router.push(`/hotels?${currentParams.toString()}`);
  };

  const handleResetFilters = () => {
    setFilters({
      priceRange: [50, 500],
      rating: [],
      propertyType: [],
      amenities: [],
    });

    const currentParams = new URLSearchParams(searchParams.toString());
    ["priceMin", "priceMax", "rating", "propertyType", "amenities"].forEach(
      (param) => currentParams.delete(param)
    );

    router.push(`/hotels?${currentParams.toString()}`);
  };

  const toggleRating = (rating: number) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating.includes(rating)
        ? prev.rating.filter((r) => r !== rating)
        : [...prev.rating, rating],
    }));
  };

  const togglePropertyType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type],
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <Card className="sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Filters</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="text-muted-foreground hover:text-foreground"
        >
          {showFilters ? "Hide" : "Show"}
        </Button>
      </CardHeader>
      <CardContent className={cn("space-y-6", !showFilters && "hidden")}>
        {/* Price Range */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Price Range</h3>
            <div className="text-sm text-muted-foreground">per night</div>
          </div>
          <Slider
            defaultValue={filters.priceRange}
            value={filters.priceRange}
            min={0}
            max={10000}
            step={100}
            minStepsBetweenThumbs={1}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, priceRange: value as number[] }))
            }
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-primary"
          />
          <div className="flex items-center justify-between">
            <div className="rounded-md border px-3 py-1.5 text-sm">
              ₹{filters.priceRange[0]}
            </div>
            <div className="text-muted-foreground">—</div>
            <div className="rounded-md border px-3 py-1.5 text-sm">
              ₹{filters.priceRange[1]}
            </div>
          </div>
        </div>

        <Separator />

        {/* Star Rating */}
        <div className="space-y-4">
          <h3 className="font-medium">Star Rating</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className="flex items-center space-x-2 rounded-lg hover:bg-accent p-2 transition-colors"
              >
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating.includes(rating)}
                  onCheckedChange={() => toggleRating(rating)}
                />
                <Label
                  htmlFor={`rating-${rating}`}
                  className="flex flex-1 items-center justify-between text-sm"
                >
                  <div className="flex items-center">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                    {Array.from({ length: 5 - rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-muted" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">& up</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Property Type */}
        <div className="space-y-4">
          <h3 className="font-medium">Property Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "hotel", label: "Hotels", icon: Building2 },
              { id: "resort", label: "Resorts", icon: Palmtree },
              { id: "apartment", label: "Apartments", icon: Home },
              { id: "villa", label: "Villas", icon: House },
              { id: "cabin", label: "Cabins", icon: Trees },
              { id: "hostel", label: "Hostels", icon: Users },
            ].map((type) => (
              <div
                key={type.id}
                className={cn(
                  "group rounded-xl border-2 p-4 transition-colors cursor-pointer",
                  filters.propertyType.includes(type.id)
                    ? "border-primary"
                    : "border-muted hover:border-primary"
                )}
                onClick={() => togglePropertyType(type.id)}
              >
                <type.icon
                  className={cn(
                    "h-6 w-6 mb-2 transition-colors",
                    filters.propertyType.includes(type.id)
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-primary"
                  )}
                />
                <div className="text-sm font-medium">{type.label}</div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Amenities */}
        <div className="space-y-4">
          <h3 className="font-medium">Popular Amenities</h3>
          <div className="space-y-3">
            {[
              { id: "wifi", label: "Free WiFi", icon: Wifi },
              { id: "breakfast", label: "Breakfast Included", icon: Coffee },
              { id: "pool", label: "Swimming Pool", icon: Waves },
              { id: "parking", label: "Free Parking", icon: Car },
              { id: "gym", label: "Fitness Center", icon: Dumbbell },
              { id: "spa", label: "Spa Services", icon: HeartPulse },
              { id: "restaurant", label: "Restaurant", icon: Utensils },
              { id: "pet-friendly", label: "Pet Friendly", icon: PawPrint },
              { id: "beach", label: "Beach Access", icon: Umbrella },
              { id: "bar", label: "Bar/Lounge", icon: Wine },
            ].map((amenity) => (
              <div
                key={amenity.id}
                className="flex items-center space-x-2 rounded-lg hover:bg-accent p-2 transition-colors"
              >
                <Checkbox
                  id={amenity.id}
                  checked={filters.amenities.includes(amenity.id)}
                  onCheckedChange={() => toggleAmenity(amenity.id)}
                />
                <Label
                  htmlFor={amenity.id}
                  className="flex flex-1 items-center space-x-2 text-sm cursor-pointer"
                >
                  <amenity.icon className="h-4 w-4 text-muted-foreground" />
                  <span>{amenity.label}</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex gap-2">
          <Button className="flex-1 h-10" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="h-10"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
