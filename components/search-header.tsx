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

export function SearchHeader() {
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
              />
            </div>
          </div>

          <div className="flex-1 relative">
            <DatePickerWithRange
              align="start"
              className="[&_.date-range-trigger]:w-full [&_.date-range-trigger]:justify-start [&_.date-range-trigger]:h-12 [&_.date-range-trigger]:pl-10 relative"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>

          <div className="w-full md:w-[200px]">
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select>
                <SelectTrigger className="w-full h-12 pl-10">
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

          <Button className="h-12 px-8" size="lg">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
