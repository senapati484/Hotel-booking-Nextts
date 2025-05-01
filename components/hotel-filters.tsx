"use client";

import { useState } from "react";
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

export function HotelFilters() {
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [showFilters, setShowFilters] = useState(true);

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
            defaultValue={priceRange}
            min={0}
            max={1000}
            step={10}
            onValueChange={(value) => setPriceRange(value as number[])}
            className="[&_.slider-thumb]:h-4 [&_.slider-thumb]:w-4 [&_.slider-thumb]:border-4"
          />
          <div className="flex items-center justify-between">
            <div className="rounded-md border px-3 py-1.5 text-sm">
              ${priceRange[0]}
            </div>
            <div className="text-muted-foreground">—</div>
            <div className="rounded-md border px-3 py-1.5 text-sm">
              ${priceRange[1]}
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
                <Checkbox id={`rating-${rating}`} />
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
                className="group rounded-xl border-2 border-muted p-4 hover:border-primary transition-colors cursor-pointer"
              >
                <type.icon className="h-6 w-6 mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
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
                <Checkbox id={amenity.id} />
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
          <Button className="flex-1 h-10">Apply Filters</Button>
          <Button variant="outline" className="h-10">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
