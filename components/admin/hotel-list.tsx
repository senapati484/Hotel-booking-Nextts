"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Edit, Trash2, ExternalLink } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Hotel } from "@/lib/types"

interface AdminHotelListProps {
  hotels: Hotel[]
  onEdit: (hotel: Hotel) => void
  onDelete: (id: string) => void
}

export function AdminHotelList({ hotels, onEdit, onDelete }: AdminHotelListProps) {
  return (
    <div className="space-y-4">
      {hotels.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No hotels found. Add your first hotel to get started.
        </div>
      ) : (
        hotels.map((hotel) => (
          <div key={hotel.id} className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4">
              <div className="relative h-[150px]">
                <Image src={hotel.images[0] || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                {hotel.featured && <Badge className="absolute top-2 left-2">Featured</Badge>}
              </div>
              <div className="p-4 md:p-0 md:py-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{hotel.name}</h3>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1">{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{hotel.location}</p>
                <p className="text-sm mt-2 line-clamp-2">{hotel.description}</p>
                <div className="mt-2">
                  <span className="font-medium">${hotel.price}</span>
                  <span className="text-sm text-muted-foreground"> / night</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">{hotel.rooms.length} room types • </span>
                  <span className="text-muted-foreground">{hotel.amenities.length} amenities</span>
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-2 p-4 md:py-4 md:pr-4 justify-end">
                <Link href={`/hotels/${hotel.id}`} target="_blank">
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="w-full" onClick={() => onEdit(hotel)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-destructive border-destructive/50 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the hotel and all associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(hotel.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
