"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

const popularPlaces = [
  {
    region: "North India",
    places: [
      {
        name: "Delhi",
        description: "Capital city with rich history, Red Fort, and diverse cuisine",
        popularFor: "Historical monuments, Street food, Shopping",
      },
      {
        name: "Jaipur",
        description: "The Pink City, known for its palaces and vibrant culture",
        popularFor: "Amber Fort, City Palace, Local markets",
      },
      {
        name: "Agra",
        description: "Home to the iconic Taj Mahal and Mughal architecture",
        popularFor: "Taj Mahal, Agra Fort, Fatehpur Sikri",
      },
    ],
  },
  {
    region: "South India",
    places: [
      {
        name: "Kerala",
        description: "God's Own Country with backwaters and lush greenery",
        popularFor: "Backwaters, Ayurveda, Beaches",
      },
      {
        name: "Tamil Nadu",
        description: "Land of ancient temples and rich cultural heritage",
        popularFor: "Temples, Classical dance, Traditional cuisine",
      },
      {
        name: "Karnataka",
        description: "Mix of ancient and modern with diverse landscapes",
        popularFor: "Hampi, Mysore Palace, Tech hubs",
      },
    ],
  },
  {
    region: "East India",
    places: [
      {
        name: "West Bengal",
        description: "Cultural hub with colonial architecture and artistic heritage",
        popularFor: "Kolkata, Darjeeling, Sundarbans",
      },
      {
        name: "Odisha",
        description: "Ancient temples and pristine beaches",
        popularFor: "Konark Temple, Puri Beach, Tribal culture",
      },
      {
        name: "Sikkim",
        description: "Himalayan paradise with stunning landscapes",
        popularFor: "Gangtok, Nathu La Pass, Buddhist monasteries",
      },
    ],
  },
  {
    region: "West India",
    places: [
      {
        name: "Maharashtra",
        description: "Financial capital and diverse cultural experiences",
        popularFor: "Mumbai, Ajanta-Ellora caves, Hill stations",
      },
      {
        name: "Gujarat",
        description: "Business hub with rich heritage and wildlife",
        popularFor: "Rann of Kutch, Gir Forest, Temples",
      },
      {
        name: "Goa",
        description: "Beach paradise with Portuguese influence",
        popularFor: "Beaches, Nightlife, Seafood",
      },
    ],
  },
]

export function PopularPlacesAccordion() {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Popular Places in India</h2>
      <Accordion type="single" collapsible className="w-full">
        {popularPlaces.map((region) => (
          <AccordionItem key={region.region} value={region.region}>
            <AccordionTrigger className="text-lg font-semibold">
              {region.region}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 pt-4">
                {region.places.map((place) => (
                  <div
                    key={place.name}
                    className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 size-5 text-primary" />
                      <div className="space-y-1">
                        <h3 className="font-semibold">{place.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {place.description}
                        </p>
                        <div className="mt-2">
                          <span className="text-sm font-medium">Popular for: </span>
                          <span className="text-sm text-muted-foreground">
                            {place.popularFor}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  )
} 