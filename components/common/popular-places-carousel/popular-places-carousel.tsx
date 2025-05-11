"use client"

import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import React from "react"
import Autoplay from "embla-carousel-autoplay"




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
    return (
        <Card className="relative overflow-hidden p-2">
            <Carousel
                className="w-full"
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
            >
                <CarouselContent>
                    {popularPlaces.map((place) => (
                        <CarouselItem key={place.name}>
                            <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
                                <Image
                                    src={place.image}
                                    alt={place.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 flex flex-col justify-end p-2">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="size-3" />
                                        <span className="text-[10px]">{place.region}</span>
                                    </div>
                                    <h3 className="text-sm font-bold">{place.name}</h3>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel>
        </Card>
    )
} 