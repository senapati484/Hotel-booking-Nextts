"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { PaymentForm } from "@/components/payment-form"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import { addBooking } from "@/lib/firebase/bookings"
import type { Hotel } from "@/lib/types"

interface BookingFormProps {
  hotel: Hotel
}

export function BookingForm({ hotel }: BookingFormProps) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [guests, setGuests] = useState("2")
  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0]?.id || "")
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const selectedRoomData = hotel.rooms.find((room) => room.id === selectedRoom)

  const handleBookNow = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to book a room",
        variant: "destructive",
      })
      return
    }

    setIsPaymentOpen(true)
  }

  const handlePaymentSuccess = async () => {
    setIsProcessing(true)

    try {
      // Create booking in Firebase
      const bookingData = {
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomId: selectedRoom,
        roomName: selectedRoomData?.name || "",
        userId: user?.uid || "",
        userName: user?.displayName || "",
        userEmail: user?.email || "",
        guests: Number.parseInt(guests),
        price: selectedRoomData?.price || 0,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      }

      await addBooking(bookingData)

      setIsPaymentOpen(false)

      toast({
        title: "Booking confirmed!",
        description: "Your reservation has been successfully processed.",
      })

      // Redirect to profile page
      router.push("/profile")
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const calculateTotal = () => {
    const roomPrice = selectedRoomData?.price || hotel.price
    const nights = 3 // Default to 3 nights
    const subtotal = roomPrice * nights
    const taxes = subtotal * 0.12
    const total = subtotal + taxes

    return { subtotal, taxes, total }
  }

  const { subtotal, taxes, total } = calculateTotal()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Book Your Stay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-2xl font-bold">
            ${selectedRoomData?.price || hotel.price}
            <span className="text-sm font-normal text-muted-foreground">/night</span>
          </div>

          <DatePickerWithRange className="w-full" />

          <div className="space-y-2">
            <label className="text-sm font-medium">Guests</label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger>
                <SelectValue placeholder="Select number of guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5 Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Room Type</label>
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                {hotel.rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name} - ${room.price}/night
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Price for 3 nights</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & fees</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" onClick={handleBookNow}>
            Book Now
          </Button>
        </CardFooter>
      </Card>

      <Drawer open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DrawerTrigger className="hidden">Open Payment</DrawerTrigger>
        <DrawerContent className="max-h-[90vh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Complete Your Booking</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <PaymentForm
              hotelName={hotel.name}
              roomName={selectedRoomData?.name || ""}
              total={total}
              onSuccess={handlePaymentSuccess}
              isProcessing={isProcessing}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
