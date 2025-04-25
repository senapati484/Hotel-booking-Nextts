"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, CreditCard, Calendar, Lock } from "lucide-react"

interface PaymentFormProps {
  hotelName: string
  roomName: string
  total: number
  onSuccess: () => void
  isProcessing: boolean
}

export function PaymentForm({ hotelName, roomName, total, onSuccess, isProcessing }: PaymentFormProps) {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  })
  const [billingDetails, setBillingDetails] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  })
  const [sameAsGuest, setSameAsGuest] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would process the payment here
    onSuccess()
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">Booking Summary</h3>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Hotel:</span> {hotelName}
          </p>
          <p>
            <span className="font-medium">Room:</span> {roomName}
          </p>
          <p>
            <span className="font-medium">Dates:</span> May 15 - May 18, 2023 (3 nights)
          </p>
          <p>
            <span className="font-medium">Guests:</span> 2 adults
          </p>
          <Separator className="my-2" />
          <p className="font-bold">Total: ${total.toFixed(2)}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="font-medium mb-4">Payment Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-name">Name on Card</Label>
              <Input
                id="card-name"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                placeholder="John Doe"
                required
                disabled={isProcessing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <div className="relative">
                <Input
                  id="card-number"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                  required
                  disabled={isProcessing}
                />
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <div className="relative">
                  <Input
                    id="expiry"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    placeholder="MM/YY"
                    required
                    disabled={isProcessing}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <div className="relative">
                  <Input
                    id="cvc"
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                    placeholder="123"
                    required
                    disabled={isProcessing}
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Billing Address</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="same-as-guest"
                checked={sameAsGuest}
                onCheckedChange={(checked) => setSameAsGuest(checked as boolean)}
                disabled={isProcessing}
              />
              <Label htmlFor="same-as-guest" className="text-sm">
                Same as guest information
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={billingDetails.address}
                onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })}
                placeholder="123 Main St"
                required
                disabled={isProcessing || sameAsGuest}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={billingDetails.city}
                  onChange={(e) => setBillingDetails({ ...billingDetails, city: e.target.value })}
                  placeholder="New York"
                  required
                  disabled={isProcessing || sameAsGuest}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={billingDetails.state}
                  onChange={(e) => setBillingDetails({ ...billingDetails, state: e.target.value })}
                  placeholder="NY"
                  required
                  disabled={isProcessing || sameAsGuest}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  value={billingDetails.zip}
                  onChange={(e) => setBillingDetails({ ...billingDetails, zip: e.target.value })}
                  placeholder="10001"
                  required
                  disabled={isProcessing || sameAsGuest}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <select
                  id="country"
                  value={billingDetails.country}
                  onChange={(e) => setBillingDetails({ ...billingDetails, country: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isProcessing || sameAsGuest}
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${total.toFixed(2)}`
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            By clicking the button, you agree to our Terms and Conditions and Privacy Policy.
          </p>
        </div>
      </form>
    </div>
  )
}
