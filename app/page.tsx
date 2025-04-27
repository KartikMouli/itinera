import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  ArrowRight, 
  Globe, 
  Map, 
  IndianRupee, 
  Train, 
  Bus, 
  Plane,
  Calendar,
  Users,
  Star,
  User,
  Heart
} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <Image
            src="/hero-travel.jpg"
            alt="Indian Travel"
            fill
            priority
            className="object-cover"
            
          />
        </div>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg tracking-tight">
              Discover India
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 drop-shadow-md font-light">
              Let AI craft your perfect Indian adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 hover:cursor-pointer shadow-lg text-base px-6 py-4">
                Start Planning <ArrowRight className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white bg-transparent text-white hover:bg-white/20 hover:cursor-pointer text-base px-6 py-4 font-medium"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tight text-slate-900">Why Choose Itinera?</h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Your personal AI travel companion for exploring India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Map size={24} />,
                title: "Smart Itineraries",
                description: "AI-generated travel plans based on your preferences and budget"
              },
              {
                icon: <IndianRupee size={24} />,
                title: "Budget-Friendly",
                description: "Get personalized recommendations that match your budget"
              },
              {
                icon: <Globe size={24} />,
                title: "All of India",
                description: "From the Himalayas to the beaches of Goa, we've got you covered"
              }
            ].map((feature, index) => (
              <Card key={index} className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tight text-slate-900">How It Works</h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Plan your perfect Indian adventure in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and tell us about your travel preferences",
                icon: <Users size={24} />
              },
              {
                step: "02",
                title: "Enter Your Details",
                description: "Specify your source, destination, and optional preferences like duration, mode of travel, and budget",
                icon: <Calendar size={24} />
              },
              {
                step: "03",
                title: "Get Your Itinerary",
                description: "Receive a personalized AI-generated travel plan for your Indian adventure",
                icon: <Star size={24} />
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                {step.icon}
                <div className="text-4xl font-bold text-primary mb-4 tracking-tight">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{step.title}</h3>
                <p className="text-base text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Modes Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tight text-slate-900">Choose Your Travel Style</h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              We support all major modes of travel across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Train size={24} />,
                title: "Indian Railways",
                description: "Plan your journey across India's vast railway network"
              },
              {
                icon: <Bus size={24} />,
                title: "Road Trips",
                description: "Explore India's highways and scenic routes"
              },
              {
                icon: <Plane size={24} />,
                title: "Air Travel",
                description: "Quick connections between major Indian cities"
              }
            ].map((mode, index) => (
              <Card key={index} className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="text-primary mb-4">
                    {mode.icon}
                  </div>
                  <CardTitle className="text-xl text-slate-900">{mode.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-600">{mode.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tight text-slate-900">What Our Travelers Say</h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Hear from our satisfied travelers about their experiences
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Solo Traveler",
                    image: "/testimonial-1.jpg",
                    quote: "Itinera made planning my solo trip to India so easy! The AI suggestions were spot on."
                  },
                  {
                    name: "Rajesh Patel",
                    role: "Family Traveler",
                    image: "/testimonial-2.jpg",
                    quote: "Perfect for family trips! The budget-friendly options were exactly what we needed."
                  },
                  {
                    name: "Emma Chen",
                    role: "Adventure Seeker",
                    image: "/testimonial-3.jpg",
                    quote: "The off-the-beaten-path suggestions were amazing. Found hidden gems I never knew existed!"
                  }
                ].map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                            <p className="text-sm text-slate-600">{testimonial.role}</p>
                          </div>
                        </div>
                        <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-indigo-600 to-primary text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Ready to Explore India?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
              Let our AI create the perfect itinerary for your Indian adventure
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 shadow-lg text-base px-6 py-4">
              Start Planning Now <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 text-slate-600 py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-slate-900 text-lg font-semibold mb-3">Itinera</h3>
              <p className="text-sm text-slate-600 mb-4">
                Your AI-powered travel companion for exploring India
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 text-base font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-slate-900 transition-colors text-sm">About Us</a></li>
                <li><a href="/contact" className="hover:text-slate-900 transition-colors text-sm">Contact Us</a></li>
                <li><a href="/privacy" className="hover:text-slate-900 transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-slate-900 transition-colors text-sm">Terms and Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 text-base font-semibold mb-3">Reservations</h4>
              <ul className="space-y-2">
                <li><a href="/reservations" className="hover:text-slate-900 transition-colors text-sm">View/Cancel Reservation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 text-base font-semibold mb-3">Connect With Us</h4>
              <div className="flex space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="hover:text-slate-900 transition-colors">
                        <FaFacebook className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="hover:text-slate-900 transition-colors">
                        <FaTwitter className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="hover:text-slate-900 transition-colors">
                        <FaInstagram className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-6 text-center">
            <p className="text-sm text-slate-600">
              All rights reserved ©2025 Itinera.in
            </p>
            <p className="text-sm text-slate-500 mt-2 flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> by{" "}
              <a 
                href="https://github.com/kartikmouli" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                kartikmouli
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
