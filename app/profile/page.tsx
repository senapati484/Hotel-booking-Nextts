/* eslint-disable prefer-const */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import {
  getUserProfile,
  updateUserProfile,
  setUserProfile,
} from "@/lib/firebase/users";
import { getUserBookings } from "@/lib/firebase/bookings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  CreditCard,
  LogOut,
  MapPin,
  Settings,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  savedHotels: string[];
  provider: string;
  id: string;
}

interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  roomId: string;
  roomName: string;
  userId: string;
  userName: string;
  userEmail: string;
  guests: number;
  price: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Immediately show auth data while loading Firestore data
        let tempUser = {
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          avatar:
            firebaseUser.photoURL || "/placeholder.svg?height=100&width=100",
          memberSince: new Date(
            firebaseUser.metadata.creationTime || Date.now()
          ).toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
          savedHotels: [],
          provider: firebaseUser.providerData?.[0]?.providerId || "google",
          id: firebaseUser.uid,
        };

        setUser(tempUser);
        // console.log('User data after login:', tempUser);
        // Try to fetch user profile from Firestore
        let profile = await getUserProfile(firebaseUser.uid);
        if (!profile) {
          // Set user data in Firestore if not present
          await setUserProfile(firebaseUser.uid, tempUser);
        } else {
          // If Firestore data exists, prefer it
          tempUser = { ...profile, id: firebaseUser.uid };
          // Ensure savedHotels is always an array
          if (!Array.isArray(tempUser.savedHotels)) {
            tempUser.savedHotels = [];
          }
          setUser(tempUser);
          console.log("Full Firestore user profile after login:", tempUser);
        }
        // Fetch bookings
        const userBookings = await getUserBookings(firebaseUser.uid);
        setBookings(userBookings);
        setLoading(false);
      } else {
        setUser(null);
        setBookings([]);
        setLoading(false);
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading profile...</span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container px-4 md:px-6 py-12 mx-auto min-h-screen max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        {/* profile leftbar */}
        <div className="md:w-1/3">
          <Card className="sticky top-22">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Manage your account settings
                  </CardDescription>
                </div>
                <Button variant="outline" size="icon" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Logout</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback>
                    {user && user.name ? user.name.charAt(0) : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-bold text-xl">
                    {user?.name || "No Name"}
                  </h3>
                  <p className="text-muted-foreground">
                    {user?.email || "No Email"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Member since {user?.memberSince || "Unknown"}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Personal Information
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Bookings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="bookings">
            <TabsList className="mb-6">
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Your Bookings</CardTitle>
                  <CardDescription>
                    View and manage your hotel reservations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold">{booking.hotelName}</h3>
                              <p className="text-sm">{booking.roomName}</p>
                              <div className="flex items-center text-muted-foreground text-sm mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {booking.hotelName}
                              </div>
                            </div>
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "default"
                                  : booking.status === "cancelled"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="mt-4 text-sm space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center text-muted-foreground">
                                <User className="h-3 w-3 mr-1" />
                                {booking.guests}{" "}
                                {booking.guests === 1 ? "Guest" : "Guests"}
                              </div>
                              <div className="font-medium">
                                ${booking.price.toLocaleString()}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-muted-foreground">
                                <Calendar className="h-3 w-3 inline mr-1" />
                                {new Date(booking.createdAt).toLocaleDateString(
                                  undefined,
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </div>
                              <div className="text-muted-foreground">
                                {booking.userEmail}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                router.push(`/hotels/${booking.hotelId}`)
                              }
                            >
                              View Hotel
                            </Button>
                            {booking.status === "confirmed" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                              >
                                Cancel Booking
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You don't have any bookings yet.
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => router.push("/hotels")}
                      >
                        Find Hotels
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Update your profile information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const name = formData.get("name") as string;
                      const avatar = formData.get("avatar") as string;
                      try {
                        await updateUserProfile(user.id, { name, avatar });
                        if (auth.currentUser) {
                          await import("firebase/auth").then(
                            ({ updateProfile }) =>
                              updateProfile(auth.currentUser!, {
                                displayName: name,
                                photoURL: avatar,
                              })
                          );
                        }
                        toast({
                          title: "Profile updated!",
                          description:
                            "Your profile information has been updated.",
                        });
                        setUser({ ...user, name, avatar });
                      } catch (err) {
                        toast({
                          title: "Update failed",
                          description: "Could not update profile.",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" defaultValue={user.name} />
                    </div>
                    <div>
                      <Label htmlFor="avatar">Avatar URL</Label>
                      <Input
                        id="avatar"
                        name="avatar"
                        defaultValue={user.avatar}
                      />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
