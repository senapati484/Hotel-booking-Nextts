"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"

export function HotelFilters() {
  const [priceRange, setPriceRange] = useState([50, 500])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="font-medium">Price Range</h3>
            <Slider
              defaultValue={priceRange}
              min={0}
              max={1000}
              step={10}
              onValueChange={(value) => setPriceRange(value as number[])}
            />
            <div className="flex items-center justify-between">
              <div className="border rounded-md px-3 py-1">${priceRange[0]}</div>
              <div className="border rounded-md px-3 py-1">${priceRange[1]}</div>
            </div>
          </div>

          {/* Star Rating */}
          <div className="space-y-4">
            <h3 className="font-medium">Star Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    ))}
                    {Array.from({ length: 5 - rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-muted" />
                    ))}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="font-medium">Amenities</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="wifi" />
                <Label htmlFor="wifi">Free WiFi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="breakfast" />
                <Label htmlFor="breakfast">Breakfast Included</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pool" />
                <Label htmlFor="pool">Swimming Pool</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="parking" />
                <Label htmlFor="parking">Free Parking</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="gym" />
                <Label htmlFor="gym">Fitness Center</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="spa" />
                <Label htmlFor="spa">Spa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="restaurant" />
                <Label htmlFor="restaurant">Restaurant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pet-friendly" />
                <Label htmlFor="pet-friendly">Pet Friendly</Label>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-4">
            <h3 className="font-medium">Property Type</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="hotel" />
                <Label htmlFor="hotel">Hotel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="resort" />
                <Label htmlFor="resort">Resort</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="apartment" />
                <Label htmlFor="apartment">Apartment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="villa" />
                <Label htmlFor="villa">Villa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hostel" />
                <Label htmlFor="hostel">Hostel</Label>
              </div>
            </div>
          </div>

          {/* Guest Rating */}
          <div className="space-y-4">
            <h3 className="font-medium">Guest Rating</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="excellent" />
                <Label htmlFor="excellent">Excellent (9+)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="very-good" />
                <Label htmlFor="very-good">Very Good (8+)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="good" />
                <Label htmlFor="good">Good (7+)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="fair" />
                <Label htmlFor="fair">Fair (6+)</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button className="flex-1">Apply Filters</Button>
        <Button variant="outline">Reset</Button>
      </div>
    </div>
  )
}
