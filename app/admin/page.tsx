"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { getAllHotels, deleteHotel } from "@/lib/firebase/hotels";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HotelForm } from "@/components/admin/hotel-form";
import { AdminHotelList } from "@/components/admin/hotel-list";
import { Loader2, Plus } from "lucide-react";
import type { Hotel } from "@/lib/types";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsData = await getAllHotels();
        setHotels(hotelsData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const handleDeleteHotel = async (id: string) => {
    try {
      await deleteHotel(id);
      setHotels(hotels.filter((hotel) => hotel.id !== id));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const handleHotelSaved = (savedHotel: Hotel) => {
    if (selectedHotel) {
      // Update existing hotel in the list
      setHotels(hotels.map((h) => (h.id === savedHotel.id ? savedHotel : h)));
    } else {
      // Add new hotel to the list
      setHotels([...hotels, savedHotel]);
    }
    setSelectedHotel(null);
  };

  if (loading || (!user && !loading)) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-6 py-8 mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <Tabs defaultValue="hotels">
        <TabsList className="mb-6">
          <TabsTrigger value="hotels">Manage Hotels</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="hotels">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Hotels</CardTitle>
                    <CardDescription>
                      Manage your hotel listings
                    </CardDescription>
                  </div>
                  <Button onClick={() => setSelectedHotel(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Hotel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <AdminHotelList
                    hotels={hotels}
                    onEdit={handleEditHotel}
                    onDelete={handleDeleteHotel}
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedHotel ? "Edit Hotel" : "Add New Hotel"}
                </CardTitle>
                <CardDescription>
                  {selectedHotel
                    ? `Editing ${selectedHotel.name}`
                    : "Fill in the details to add a new hotel"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HotelForm
                  hotel={selectedHotel}
                  onSave={handleHotelSaved}
                  onCancel={() => setSelectedHotel(null)}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
              <CardDescription>Manage customer bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground py-8 text-center">
                Booking management functionality coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground py-8 text-center">
                User management functionality coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
