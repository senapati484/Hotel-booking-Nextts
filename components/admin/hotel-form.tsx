"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { addHotel, updateHotel } from "@/lib/firebase/hotels"
import { useToast } from "@/hooks/use-toast"
import type { Hotel, Room } from "@/lib/types"

interface HotelFormProps {
  hotel: Hotel | null
  onSave: (hotel: Hotel) => void
  onCancel: () => void
}

export function HotelForm({ hotel, onSave, onCancel }: HotelFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Hotel>>({
    name: "",
    location: "",
    description: "",
    price: 0,
    originalPrice: null,
    discount: null,
    rating: 0,
    reviewCount: 0,
    images: [""],
    amenities: [],
    rooms: [],
    featured: false,
  })

  useEffect(() => {
    if (hotel) {
      setFormData(hotel)
    } else {
      // Initialize with empty room
      setFormData({
        name: "",
        location: "",
        description: "",
        price: 0,
        originalPrice: null,
        discount: null,
        rating: 0,
        reviewCount: 0,
        images: [""],
        amenities: [],
        rooms: [
          {
            id: `room-${Date.now()}`,
            name: "",
            description: "",
            price: 0,
            originalPrice: null,
            discount: null,
            capacity: 2,
            bedType: "",
            size: 0,
            view: "",
            image: "",
          },
        ],
        featured: false,
      })
    }
  }, [hotel])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (
      name === "price" ||
      name === "originalPrice" ||
      name === "discount" ||
      name === "rating" ||
      name === "reviewCount"
    ) {
      setFormData({ ...formData, [name]: Number.parseFloat(value) || 0 })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...(formData.images || [])]
    updatedImages[index] = value
    setFormData({ ...formData, images: updatedImages })
  }

  const addImageField = () => {
    setFormData({ ...formData, images: [...(formData.images || []), ""] })
  }

  const removeImageField = (index: number) => {
    const updatedImages = [...(formData.images || [])]
    updatedImages.splice(index, 1)
    setFormData({ ...formData, images: updatedImages })
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const updatedAmenities = [...(formData.amenities || [])]

    if (checked) {
      updatedAmenities.push(amenity)
    } else {
      const index = updatedAmenities.indexOf(amenity)
      if (index !== -1) {
        updatedAmenities.splice(index, 1)
      }
    }

    setFormData({ ...formData, amenities: updatedAmenities })
  }

  const handleRoomChange = (index: number, field: keyof Room, value: Room[keyof Room]) => {
    const updatedRooms = [...(formData.rooms || [])]
    updatedRooms[index] = { ...updatedRooms[index], [field]: value }
    setFormData({ ...formData, rooms: updatedRooms })
  }

  const addRoomField = () => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: "",
      description: "",
      price: 0,
      originalPrice: null,
      discount: null,
      capacity: 2,
      bedType: "",
      size: 0,
      view: "",
      image: "",
    }

    setFormData({ ...formData, rooms: [...(formData.rooms || []), newRoom] })
  }

  const removeRoomField = (index: number) => {
    const updatedRooms = [...(formData.rooms || [])]
    updatedRooms.splice(index, 1)
    setFormData({ ...formData, rooms: updatedRooms })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let savedHotel: Hotel

      if (hotel) {
        // Update existing hotel
        savedHotel = await updateHotel(hotel.id, formData as Hotel)
        toast({
          title: "Hotel updated",
          description: "The hotel has been updated successfully.",
        })
      } else {
        // Add new hotel
        savedHotel = await addHotel(formData as Hotel)
        toast({
          title: "Hotel added",
          description: "The hotel has been added successfully.",
        })
      }

      onSave(savedHotel)
    } catch (error) {
      console.error("Error saving hotel:", error)
      toast({
        title: "Error",
        description: "There was an error saving the hotel. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const amenityOptions = [
    { id: "wifi", label: "Free WiFi" },
    { id: "breakfast", label: "Breakfast Included" },
    { id: "restaurant", label: "Restaurant" },
    { id: "gym", label: "Fitness Center" },
    { id: "parking", label: "Free Parking" },
    { id: "air-conditioning", label: "Air Conditioning" },
    { id: "pool", label: "Swimming Pool" },
    { id: "spa", label: "Spa Services" },
    { id: "bar", label: "Bar/Lounge" },
    { id: "beach-access", label: "Beach Access" },
    { id: "pet-friendly", label: "Pet Friendly" },
    { id: "wheelchair-accessible", label: "Wheelchair Accessible" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Hotel Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Base Price (per night)</Label>
              <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price (optional)</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                value={formData.originalPrice || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Discount % (optional)</Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                value={formData.discount || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating (0-5)</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviewCount">Review Count</Label>
            <Input
              id="reviewCount"
              name="reviewCount"
              type="number"
              value={formData.reviewCount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
            />
            <Label htmlFor="featured">Featured Hotel</Label>
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <div className="space-y-4">
            {formData.images?.map((image, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Image URL"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeImageField(index)}
                  disabled={formData.images?.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addImageField} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {amenityOptions.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity.id}`}
                  checked={formData.amenities?.includes(amenity.id)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity.id, !!checked)}
                />
                <Label htmlFor={`amenity-${amenity.id}`}>{amenity.label}</Label>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-6">
          {formData.rooms?.map((room, index) => (
            <div key={room.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Room {index + 1}</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeRoomField(index)}
                  disabled={formData.rooms?.length === 1}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`room-${index}-name`}>Room Name</Label>
                <Input
                  id={`room-${index}-name`}
                  value={room.name}
                  onChange={(e) => handleRoomChange(index, "name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`room-${index}-description`}>Description</Label>
                <Textarea
                  id={`room-${index}-description`}
                  value={room.description}
                  onChange={(e) => handleRoomChange(index, "description", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`room-${index}-price`}>Price (per night)</Label>
                  <Input
                    id={`room-${index}-price`}
                    type="number"
                    value={room.price}
                    onChange={(e) => handleRoomChange(index, "price", Number.parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`room-${index}-originalPrice`}>Original Price (optional)</Label>
                  <Input
                    id={`room-${index}-originalPrice`}
                    type="number"
                    value={room.originalPrice || ""}
                    onChange={(e) =>
                      handleRoomChange(
                        index,
                        "originalPrice",
                        e.target.value ? Number.parseFloat(e.target.value) : null,
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`room-${index}-capacity`}>Capacity</Label>
                  <Input
                    id={`room-${index}-capacity`}
                    type="number"
                    value={room.capacity}
                    onChange={(e) => handleRoomChange(index, "capacity", Number.parseInt(e.target.value) || 1)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`room-${index}-bedType`}>Bed Type</Label>
                  <Input
                    id={`room-${index}-bedType`}
                    value={room.bedType}
                    onChange={(e) => handleRoomChange(index, "bedType", e.target.value)}
                    placeholder="King, Queen, Twin, etc."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`room-${index}-size`}>Room Size (sqft)</Label>
                  <Input
                    id={`room-${index}-size`}
                    type="number"
                    value={room.size}
                    onChange={(e) => handleRoomChange(index, "size", Number.parseInt(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`room-${index}-view`}>View</Label>
                  <Input
                    id={`room-${index}-view`}
                    value={room.view}
                    onChange={(e) => handleRoomChange(index, "view", e.target.value)}
                    placeholder="Ocean, City, Garden, etc."
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`room-${index}-image`}>Image URL</Label>
                <Input
                  id={`room-${index}-image`}
                  value={room.image}
                  onChange={(e) => handleRoomChange(index, "image", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`room-${index}-discount`}>Discount % (optional)</Label>
                <Input
                  id={`room-${index}-discount`}
                  type="number"
                  value={room.discount || ""}
                  onChange={(e) =>
                    handleRoomChange(index, "discount", e.target.value ? Number.parseInt(e.target.value) : null)
                  }
                />
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addRoomField} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Room
          </Button>
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {hotel ? "Update Hotel" : "Add Hotel"}
        </Button>
      </div>
    </form>
  )
}
