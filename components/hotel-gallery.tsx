"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"

interface HotelGalleryProps {
  images: string[]
}

export function HotelGallery({ images }: HotelGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index)
  }

  const handleFullscreen = () => {
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px] group">
        <Image src={images[selectedImage] || "/placeholder.svg"} alt="Hotel view" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/50 text-white ml-4"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/50 text-white mr-4"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 text-white"
          onClick={handleFullscreen}
        >
          <Maximize2 className="h-5 w-5" />
          <span className="sr-only">View fullscreen</span>
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative h-20 rounded-md overflow-hidden cursor-pointer transition-all ${
              selectedImage === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image src={image || "/placeholder.svg"} alt={`Hotel view ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-screen-lg p-0 bg-transparent border-none">
          <div className="relative h-[80vh] w-full">
            <Image src={images[selectedImage] || "/placeholder.svg"} alt="Hotel view" fill className="object-contain" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 text-white"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
            <div className="absolute inset-0 flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-black/50 text-white ml-4"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-black/50 text-white mr-4"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
