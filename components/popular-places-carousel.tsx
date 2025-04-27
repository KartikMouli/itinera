"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const popularPlaces = [
    {
        name: "Taj Mahal",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        region: "North India",
    },
    {
        name: "Kerala Backwaters",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        region: "South India",
    },
    {
        name: "Jaipur Palace",
        image: "https://images.unsplash.com/photo-1661924326425-c14a6426d989?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        region: "North India",
    },
    {
        name: "Goa Beaches",
        image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        region: "West India",
    },
    {
        name: "Darjeeling",
        image: "https://images.unsplash.com/photo-1637737118663-f1a53ee1d5a7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        region: "East India",
    },
]

export function PopularPlacesCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % popularPlaces.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + popularPlaces.length) % popularPlaces.length)
    }

    useEffect(() => {
        const timer = setInterval(nextSlide, 3000)
        return () => clearInterval(timer)
    }, [])

    return (
        <Card className="relative overflow-hidden p-2">
            <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
                <div
                    className="flex h-full transition-transform duration-900 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {popularPlaces.map((place) => (
                        <div
                            key={place.name}
                            className="relative h-full min-w-full"
                        >
                            <div className="relative h-full w-full">
                                <div className="absolute inset-0 bg-black/20" />
                                <Image
                                    src={place.image}
                                    alt={place.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 flex flex-col justify-end p-2 text-white">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="size-3" />
                                        <span className="text-[10px]">{place.region}</span>
                                    </div>
                                    <h3 className="text-sm font-bold">{place.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {popularPlaces.map((_, index) => (
                    <button
                        key={index}
                        className={`size-1 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-gray-300"
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevSlide}
            >
                <ChevronLeft className="size-3" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextSlide}
            >
                <ChevronRight className="size-3" />
            </Button>
        </Card>
    )
} 