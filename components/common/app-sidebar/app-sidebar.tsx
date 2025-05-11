"use client"

import { Home, Search, MapPin, Settings, History, User, LogOut, Inbox, Calendar, ChevronUp, User2, ChevronDown, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

interface RecentTrip {
    id: string;
    from: string;
    to: string;
    date: string;
    status: string;
}

// Main navigation items
const mainItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Search Trips",
        url: "/dashboard/search",
        icon: Search,
    },
    {
        title: "My Trips",
        url: "/dashboard/trips",
        icon: MapPin,
    }
]

export function AppSidebar() {
    const router = useRouter()
    const [recentTrips, setRecentTrips] = useState<RecentTrip[]>([]);
    const [isLoadingTrips, setIsLoadingTrips] = useState(true);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        async function fetchRecentTrips() {
            if (!session?.user?.id) return;

            try {
                const response = await axios.get(`/api/trips/recent?userId=${session.user.id}`);
                if (response.status === 200) {
                    setRecentTrips(response.data);
                }
            } catch (error) {
                console.error('Error fetching recent trips:', error);
            } finally {
                setIsLoadingTrips(false);
            }
        }

        fetchRecentTrips();
    }, [session?.user?.id]);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/login");
                },
            },
        });
    }

    const username = session?.user?.name;

    // User navigation items
    const userItems = [
        {
            title: "Profile",
            url: "/dashboard/profile",
            icon: User,
            onClick: () => {
                router.push(`/dashboard/profile`);
            }
        },
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings,
        },
        {
            title: "Sign Out",
            url: "#",
            icon: LogOut,
            onClick: () => {
                handleSignOut()
            }
        },
    ]

    return (
        <Sidebar variant="floating">
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <MapPin className="size-5" />
                    <span className="text-sm font-semibold">Itinera</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="flex items-center gap-2">
                                            <item.icon className="size-5" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger className="flex w-full items-center justify-between">
                                <span>Recent Trips</span>
                                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {isLoadingTrips ? (
                                        <div className="flex items-center justify-center py-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    ) : recentTrips.length > 0 ? (
                                        recentTrips.map((trip) => (
                                            <div key={trip.id} className="mb-2">
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton asChild>
                                                        <a href={`/dashboard/trips/${trip.id}`} className="flex items-center gap-3">
                                                            <MapPin className="size-5" />
                                                            <div className="flex flex-col">
                                                                <span>{trip.from} → {trip.to}</span>
                                                                <span className="text-xs text-muted-foreground">{trip.date}</span>
                                                            </div>
                                                        </a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                            No recent trips
                                        </div>
                                    )}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>

            <SidebarFooter className="mt-auto">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="flex items-center gap-2 w-full">
                                    <User2 className="size-5" />
                                    <span>{username}</span>
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                align="start"
                                style={{
                                    width: "var(--radix-popper-anchor-width)",
                                }}
                            >
                                {userItems.map((item) => (
                                    <DropdownMenuItem key={item.title} className="flex items-center gap-2 w-full hover:cursor-pointer" onClick={item.onClick}>
                                        <item.icon className="size-4" />
                                        <span>{item.title}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
