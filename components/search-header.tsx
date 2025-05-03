"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Users, Search, Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";

interface SearchHeaderProps {
  initialValues?: {
    location?: string;
    startDate?: string;
    endDate?: string;
    guests?: string;
  };
}

export function SearchHeader({ initialValues }: SearchHeaderProps = {}) {
  const [location, setLocation] = useState(initialValues?.location || "");
  const [guests, setGuests] = useState(
    initialValues?.guests ? parseInt(initialValues.guests) : 1
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialValues?.startDate && initialValues?.endDate
      ? {
          from: new Date(initialValues.startDate),
          to: new Date(initialValues.endDate),
        }
      : undefined
  );
  const router = useRouter();

  const handleSearch = () => {
    const query = new URLSearchParams({
      ...(location && { location }),
      ...(guests && { guests: guests.toString() }),
      ...(dateRange?.from && { startDate: dateRange.from.toISOString() }),
      ...(dateRange?.to && { endDate: dateRange.to.toISOString() }),
    }).toString();

    router.push(`/hotels${query ? `?${query}` : ""}`);
  };

  return (
    <div className="sticky top-0 z-50 w-full backdrop-blur-lg border-b bg-background/80">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="w-full md:w-[300px]">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Where are you going?"
                className="pl-10 h-12 bg-background"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 relative">
            <DatePickerWithRange
              align="start"
              className="[&_.date-range-trigger]:w-full [&_.date-range-trigger]:justify-start [&_.date-range-trigger]:h-12 [&_.date-range-trigger]:pl-10 relative"
              value={dateRange}
              onChange={(range) => setDateRange(range)}
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>

          <div className="w-full md:w-[200px]">
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select
                value={guests.toString()}
                onValueChange={(value) => setGuests(parseInt(value))}
              >
                <SelectTrigger className="w-full h-12 pl-10">
                  <SelectValue placeholder="Guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="h-12 px-8" size="lg" onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
