import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Clock, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PopularPlacesCarousel } from "@/components/common/popular-places-carousel/popular-places-carousel"

export default function DashboardPage() {
  return (
    <div className="w-full space-y-4 md:space-y-6 pb-16">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold md:text-3xl">Welcome back!</h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Discover the best of India's travel destinations.
        </p>
      </div>

      <div className="w-full">
        <PopularPlacesCarousel />
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="w-full border-border/50 bg-card shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Searches</CardTitle>
            <Search className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold md:text-2xl">8</div>
            <p className="text-xs text-muted-foreground">
              +3 from last week
            </p>
          </CardContent>
        </Card>
        <Card className="w-full border-border/50 bg-card shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Trips</CardTitle>
            <MapPin className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold md:text-2xl">5</div>
            <p className="text-xs text-muted-foreground">
              +2 new trips
            </p>
          </CardContent>
        </Card>
        <Card className="w-full border-border/50 bg-card shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Routes</CardTitle>
            <History className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold md:text-2xl">12</div>
            <p className="text-xs text-muted-foreground">
              Based on your history
            </p>
          </CardContent>
        </Card>
        <Card className="w-full border-border/50 bg-card shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Search</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/search">Search Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-1 lg:grid-cols-7">
        <Card className="w-full lg:col-span-4 border-border/50 bg-card shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Recent Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { from: "Delhi", to: "Jaipur", date: "June 15, 2024" },
                { from: "Mumbai", to: "Goa", date: "July 20, 2024" },
                { from: "Kolkata", to: "Darjeeling", date: "August 5, 2024" },
              ].map((trip, i) => (
                <div
                  key={i}
                  className="flex w-full flex-col gap-2 rounded-lg border border-border/50 bg-card/80 p-3 sm:flex-row sm:items-center sm:justify-between hover:bg-card/90 transition-colors"
                >
                  <div className="space-y-1 ">
                    <p className="text-sm font-medium ">
                      {trip.from} → {trip.to}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {trip.date}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" asChild className="w-full sm:w-auto">
                    <Link href="/dashboard/search">View Again</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="w-full lg:col-span-3 border-border/50 bg-card shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Popular Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { city: "Jaipur", state: "Rajasthan", searches: "2.5k" },
                { city: "Goa", state: "Goa", searches: "2.1k" },
                { city: "Kerala", state: "Kerala", searches: "1.8k" },
              ].map((destination, i) => (
                <div 
                  key={i} 
                  className="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-between p-2 rounded-lg bg-card/80 hover:bg-card/90 transition-colors"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{destination.city}</p>
                    <p className="text-xs text-muted-foreground">
                      {destination.state}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {destination.searches} searches
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 