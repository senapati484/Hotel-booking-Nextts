import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 py-12 mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tighter mb-8 text-center">About StayEase</h1>
      <p className="text-muted-foreground mb-8">
        StayEase is a premier hotel booking platform dedicated to providing travelers with exceptional accommodation
        options worldwide.
      </p>

      <div className="relative h-[300px] w-full mb-8 rounded-lg overflow-hidden">
        <Image src="/placeholder.svg?height=300&width=800" alt="Our team" fill className="object-cover" />
      </div>

      <h2 className="text-2xl font-bold mb-4">Our Story</h2>
      <p className="mb-6">
        Founded in 2020, StayEase was born from a passion for travel and a desire to simplify the hotel booking
        process. Our founders, avid travelers themselves, recognized the need for a platform that not only offered a
        wide selection of accommodations but also provided a seamless booking experience.
      </p>

      <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
      <p className="mb-6">
        At StayEase, our mission is to connect travelers with their ideal accommodations, making the booking process
        as effortless as possible. We strive to offer a diverse range of hotels, from luxury resorts to cozy boutique
        stays, ensuring that every traveler finds their perfect match.
      </p>

      <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li>Curated Selection: We handpick each property in our collection to ensure quality and value.</li>
        <li>Transparent Pricing: No hidden fees or surprise charges – what you see is what you pay.</li>
        <li>24/7 Support: Our dedicated customer service team is always ready to assist you.</li>
        <li>
          Secure Booking: Your personal and payment information is protected with state-of-the-art security measures.
        </li>
        <li>Rewards Program: Earn points with every booking and enjoy exclusive benefits as a loyal customer.</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Our Team</h2>
      <p className="mb-8">
        Our diverse team of travel enthusiasts, tech experts, and customer service professionals works tirelessly to
        bring you the best hotel booking experience. With backgrounds spanning across the globe, we bring a wealth of
        knowledge and perspectives to help you navigate your travel journey.
      </p>

      <div className="flex justify-center">
        <Button size="lg">Join Our Team</Button>
      </div>
    </div>
  )
}
