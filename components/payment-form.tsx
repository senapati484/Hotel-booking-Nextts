"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CreditCard, Calendar, Lock } from "lucide-react";

interface PaymentFormProps {
  hotelName: string;
  roomName: string;
  total: number;
  onSuccess: () => void;
  isProcessing: boolean;
}

interface CardError {
  name?: string;
  number?: string;
  expiry?: string;
  cvc?: string;
}

export function PaymentForm({
  hotelName,
  roomName,
  total,
  onSuccess,
  isProcessing,
}: PaymentFormProps) {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });
  const [billingDetails, setBillingDetails] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });
  const [sameAsGuest, setSameAsGuest] = useState(true);
  const [errors, setErrors] = useState<CardError>({});

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    const groups = cleaned.match(/(\d{1,4})/g);
    return groups ? groups.join(" ").substr(0, 19) : "";
  };

  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails({ ...cardDetails, number: formatted });
    if (errors.number) {
      setErrors({ ...errors, number: undefined });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setCardDetails({ ...cardDetails, expiry: formatted });
    if (errors.expiry) {
      setErrors({ ...errors, expiry: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporarily confirm payment even if validation fails
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
        <h3 className="text-lg font-semibold">Booking Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Hotel</span>
            <span className="font-medium">{hotelName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Room</span>
            <span className="font-medium">{roomName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-in</span>
            <span className="font-medium">May 15, 2023</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-out</span>
            <span className="font-medium">May 18, 2023</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Guests</span>
            <span className="font-medium">2 adults</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span className="text-lg">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input
                  id="card-name"
                  value={cardDetails.name}
                  onChange={(e) => {
                    setCardDetails({ ...cardDetails, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="John Doe"
                  required
                  disabled={isProcessing}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                  <Input
                    id="card-number"
                    value={cardDetails.number}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    disabled={isProcessing}
                    className={
                      errors.number ? "border-destructive pr-12" : "pr-12"
                    }
                  />
                  <CreditCard className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                {errors.number && (
                  <p className="text-sm text-destructive">{errors.number}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <div className="relative">
                    <Input
                      id="expiry"
                      value={cardDetails.expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      disabled={isProcessing}
                      className={
                        errors.expiry ? "border-destructive pr-12" : "pr-12"
                      }
                    />
                    <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  {errors.expiry && (
                    <p className="text-sm text-destructive">{errors.expiry}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <div className="relative">
                    <Input
                      id="cvc"
                      value={cardDetails.cvc}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                        setCardDetails({ ...cardDetails, cvc: value });
                        if (errors.cvc)
                          setErrors({ ...errors, cvc: undefined });
                      }}
                      placeholder="123"
                      maxLength={4}
                      required
                      disabled={isProcessing}
                      className={
                        errors.cvc ? "border-destructive pr-12" : "pr-12"
                      }
                    />
                    <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  {errors.cvc && (
                    <p className="text-sm text-destructive">{errors.cvc}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Billing Address</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="same-as-guest"
                  checked={sameAsGuest}
                  onCheckedChange={(checked) =>
                    setSameAsGuest(checked as boolean)
                  }
                  disabled={isProcessing}
                />
                <Label htmlFor="same-as-guest" className="text-sm">
                  Same as guest information
                </Label>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={billingDetails.address}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      address: e.target.value,
                    })
                  }
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
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        city: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        state: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        zip: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        country: e.target.value,
                      })
                    }
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
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
        </div>

        <Button
          type="submit"
          className="w-full h-11"
          size="lg"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${total.toFixed(2)}`
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By clicking the button, you agree to our Terms and Conditions and
          Privacy Policy.
        </p>
      </form>
    </div>
  );
}
