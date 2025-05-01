"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { PaymentForm } from "@/components/payment-form";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { addBooking } from "@/lib/firebase/bookings";
import type { Hotel, Booking } from "@/lib/types";

interface BookingFormProps {
  hotel: Hotel;
}

export function BookingForm({ hotel }: BookingFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [guests, setGuests] = useState("2");
  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0]?.id || "");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedRoomData = hotel.rooms.find((room) => room.id === selectedRoom);
  const nights = 3; // Default to 3 nights for now

  const handleBookNow = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to book a room",
        variant: "destructive",
      });
      return;
    }
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = async () => {
    setIsProcessing(true);
    try {
      const bookingData: Omit<Booking, "id"> = {
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomId: selectedRoom,
        roomName: selectedRoomData?.name || "",
        userId: user?.uid || "",
        userName: user?.displayName || "",
        userEmail: user?.email || "",
        guests: Number.parseInt(guests),
        price: selectedRoomData?.price || hotel.price,
        status: "confirmed" as const,
        createdAt: new Date().toISOString(),
      };

      await addBooking(bookingData);
      setIsPaymentOpen(false);
      toast({
        title: "Booking confirmed!",
        description: "Your reservation has been successfully processed.",
      });
      router.push("/profile");
    } catch (err) {
      console.error("Booking failed:", err);
      toast({
        title: "Booking failed",
        description:
          "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    const roomPrice = selectedRoomData?.price || hotel.price;
    const subtotal = roomPrice * nights;
    const taxes = subtotal * 0.12;
    const total = subtotal + taxes;
    return { subtotal, taxes, total };
  };

  const { subtotal, taxes, total } = calculateTotal();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">
            ${selectedRoomData?.price || hotel.price}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              /night
            </span>
          </div>
          {selectedRoomData?.originalPrice && (
            <div className="text-sm text-muted-foreground line-through">
              ${selectedRoomData.originalPrice}/night
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
          <span className="font-medium">{hotel.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({hotel.reviewCount} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <DatePickerWithRange className="[&_.date-range-trigger]:w-full [&_.date-range-trigger]:justify-start [&_.date-range-trigger]:h-12 [&_.date-range-trigger]:px-4 [&_.date-range-trigger]:border-2" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Guests</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="h-12 border-2">
                <SelectValue placeholder="Select guests" />
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

          <div className="space-y-2">
            <Label>Room Type</Label>
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger className="h-12 border-2">
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                {hotel.rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>
            ${selectedRoomData?.price || hotel.price} × {nights} nights
          </span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Taxes & fees</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button className="w-full h-12 text-base" onClick={handleBookNow}>
        Reserve now
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        You won&apos;t be charged yet
      </p>

      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-background z-10 pb-4 border-b">
            <DialogTitle className="text-xl">Complete Your Booking</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <PaymentForm
              hotelName={hotel.name}
              roomName={selectedRoomData?.name || ""}
              total={total}
              onSuccess={handlePaymentSuccess}
              isProcessing={isProcessing}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
