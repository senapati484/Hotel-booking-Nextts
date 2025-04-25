/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container px-4 md:px-6 py-12 mx-auto max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground mb-8">
            Have questions or need assistance? We're here to help. Fill out the
            form below or use our contact information to get in touch with our
            team.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-bold">Email Us</h3>
                <p className="text-muted-foreground">support@hotel.com</p>
                <p className="text-muted-foreground">
                  For general inquiries: info@hotel.com
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-bold">Call Us</h3>
                <p className="text-muted-foreground">
                  Customer Support: +91 8653420095
                </p>
                <p className="text-muted-foreground">
                  Booking Assistance: +91 8653420095
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-bold">Visit Us</h3>
                <p className="text-muted-foreground">123 Booking Street</p>
                <p className="text-muted-foreground">Suite 456</p>
                <p className="text-muted-foreground">San Francisco, CA 94103</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Office Hours</h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h3 className="font-medium">Monday - Friday</h3>
                <p className="text-muted-foreground">9:00 AM - 6:00 PM EST</p>
              </div>
              <div>
                <h3 className="font-medium">Saturday</h3>
                <p className="text-muted-foreground">10:00 AM - 4:00 PM EST</p>
              </div>
              <div>
                <h3 className="font-medium">Sunday</h3>
                <p className="text-muted-foreground">Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number (Optional)
                  </label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Select>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking">Booking Inquiry</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="partnership">
                        Partnership Opportunity
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your inquiry..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
