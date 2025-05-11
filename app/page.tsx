'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/image.png"
                        alt="India Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/30" />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-6xl font-bold text-white mb-6">
                        Your Indian Journey,
                        <br />
                        <span className="text-amber-400">Optimized</span>
                    </h1>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Build, personalize, and optimize your Indian adventures with our free AI trip planner.
                        Designed for spiritual journeys, cultural explorations, and everyday discoveries.
                    </p>
                    <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold" onClick={() => router.push('/auth/login')}>
                        Create a new trip
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Your AI-Powered Indian Experience</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="border-amber-200/50 hover:border-amber-300 transition-colors">
                            <CardHeader>
                                <div className="w-12 h-12 bg-amber-100 rounded-lg mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <CardTitle className="text-amber-600">The Most Optimal</CardTitle>
                                <CardDescription>
                                    Craft your perfect Indian itinerary with our advanced algorithms.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    We consider your preferences for temples, local cuisine, and cultural experiences.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-rose-200/50 hover:border-rose-300 transition-colors">
                            <CardHeader>
                                <div className="w-12 h-12 bg-rose-100 rounded-lg mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <CardTitle className="text-rose-600">Get Inspired</CardTitle>
                                <CardDescription>
                                    Discover hidden gems from Instagram reels and local insights.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Explore authentic Indian experiences and include them in your adventure.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-emerald-200/50 hover:border-emerald-300 transition-colors">
                            <CardHeader>
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <CardTitle className="text-emerald-600">Local Wisdom</CardTitle>
                                <CardDescription>
                                    Access local knowledge and cultural insights.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Experience India like a local with our AI-powered recommendations.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Don't Take Our Word For It</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="border-amber-200/50">
                            <CardContent className="pt-6">
                                <div className="flex items-center mb-4">
                                    <Avatar className="border-2 border-amber-200">
                                        <AvatarImage src="/images/avatar-1.jpg" alt="Priya Sharma" />
                                        <AvatarFallback className="bg-amber-100 text-amber-600">PS</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-amber-600">Priya Sharma</h4>
                                        <p className="text-sm text-muted-foreground">Spiritual Traveler</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    "This app transformed my spiritual journey across India. The temple recommendations were spot on!"
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-rose-200/50">
                            <CardContent className="pt-6">
                                <div className="flex items-center mb-4">
                                    <Avatar className="border-2 border-rose-200">
                                        <AvatarImage src="/images/avatar-2.jpg" alt="Raj Patel" />
                                        <AvatarFallback className="bg-rose-100 text-rose-600">RP</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-rose-600">Raj Patel</h4>
                                        <p className="text-sm text-muted-foreground">Food Explorer</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    "The local cuisine recommendations helped me discover authentic Indian flavors I never knew existed!"
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-emerald-200/50">
                            <CardContent className="pt-6">
                                <div className="flex items-center mb-4">
                                    <Avatar className="border-2 border-emerald-200">
                                        <AvatarImage src="/images/avatar-3.jpg" alt="Meera Kapoor" />
                                        <AvatarFallback className="bg-emerald-100 text-emerald-600">MK</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-emerald-600">Meera Kapoor</h4>
                                        <p className="text-sm text-muted-foreground">Cultural Enthusiast</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    "Planning my cultural tour of India has never been easier. The AI suggestions were perfect!"
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Customized Itineraries Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Customized Itineraries for Every Travel Dream</h2>
                    <p className="text-xl text-center mb-16 max-w-3xl mx-auto text-muted-foreground">
                        Itinera is your ultimate companion for any travel scenario. Whether it's a solo adventure,
                        a family vacation, or a group expedition, our app tailors every aspect of your journey.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="border-amber-200/50 hover:border-amber-300 transition-colors">
                            <CardHeader>
                                <div className="w-12 h-12 bg-amber-100 rounded-lg mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                </div>
                                <CardTitle className="text-amber-600">AI-Powered Route Optimization</CardTitle>
                                <CardDescription>
                                    Utilize AI for optimal travel routes across India
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Our app ensures a seamless journey, calculating the best paths, travel times, and distances for city tours or cross-country road trips.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-rose-200/50 hover:border-rose-300 transition-colors">
                            <CardHeader>
                                <div className="w-12 h-12 bg-rose-100 rounded-lg mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <CardTitle className="text-rose-600">All-in-One Travel Organizer</CardTitle>
                                <CardDescription>
                                    Simplify your travel planning experience
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Itinera consolidates hotel and flight details, manages bookings, and imports tips and guides. Organize all trip details in one place.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-emerald-200/50 hover:border-emerald-300 transition-colors">
                            <CardHeader>
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <CardTitle className="text-emerald-600">Collaborative Group Planning</CardTitle>
                                <CardDescription>
                                    Plan together with friends and family
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Collaborate on itineraries with companions. Our real-time feature makes group travel planning effortless.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background border-t">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-bold mb-4 text-amber-600">Itinera</h3>
                            <p className="text-muted-foreground mb-4">
                                Turn your next Indian journey into a hassle-free experience with Itinera.
                            </p>
                            <div className="flex space-x-4">
                                <Button variant="ghost" size="icon" className="text-amber-600 hover:text-amber-700">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </Button>
                                <Button variant="ghost" size="icon" className="text-rose-600 hover:text-rose-700">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </Button>
                                <Button variant="ghost" size="icon" className="text-emerald-600 hover:text-emerald-700">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-amber-600">Company</h4>
                            <ul className="space-y-2">
                                <li><Link href="/about" className="text-muted-foreground hover:text-amber-600">About Us</Link></li>
                                <li><Link href="/careers" className="text-muted-foreground hover:text-amber-600">Careers</Link></li>
                                <li><Link href="/blog" className="text-muted-foreground hover:text-amber-600">Blog</Link></li>
                                <li><Link href="/press" className="text-muted-foreground hover:text-amber-600">Press</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-amber-600">Resources</h4>
                            <ul className="space-y-2">
                                <li><Link href="/itineraries" className="text-muted-foreground hover:text-amber-600">Itineraries</Link></li>
                                <li><Link href="/community" className="text-muted-foreground hover:text-amber-600">Community Trips</Link></li>
                                <li><Link href="/destinations" className="text-muted-foreground hover:text-amber-600">Find Destinations</Link></li>
                                <li><Link href="/support" className="text-muted-foreground hover:text-amber-600">Support</Link></li>
                            </ul>
                        </div>
                    </div>
                    <Separator className="my-8" />
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-muted-foreground text-sm">
                            © {new Date().getFullYear()} Itinera. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6 mt-4 md:mt-0">
                            <Link href="/terms" className="text-muted-foreground text-sm hover:text-amber-600">Terms and Conditions</Link>
                            <Link href="/privacy" className="text-muted-foreground text-sm hover:text-amber-600">Privacy Policy</Link>
                            <Link href="/contact" className="text-muted-foreground text-sm hover:text-amber-600">Contact Us</Link>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-muted-foreground text-sm flex items-center justify-center">
                            Made with <Heart className="w-4 h-4 mx-1 text-rose-500" /> by kartikmouli
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
} 