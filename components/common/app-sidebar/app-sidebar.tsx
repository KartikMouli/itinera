"use client"

import { Home, Search, MapPin, Settings, History, User, LogOut, Inbox, Calendar, ChevronUp, User2, ChevronDown } from "lucide-react"

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
    },
    {
        title: "Trip History",
        url: "/dashboard/history",
        icon: History,
    },
]

export function AppSidebar() {
    const router = useRouter()

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/login");
                },
            },
        });
    }

    const {data:session}=authClient.useSession();
    const username = session?.user?.name;


    // User navigation items
    const userItems = [
        {
            title: "Profile",
            url: "/dashboard/profile",
            icon: User,
            onClick:()=>{
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
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="/dashboard/search/1" className="flex items-center gap-2">
                                                <MapPin className="size-5" />
                                                <span>Mumbai → Goa</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="/dashboard/search/2" className="flex items-center gap-2">
                                                <MapPin className="size-5" />
                                                <span>Delhi → Manali</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="/dashboard/search/3" className="flex items-center gap-2">
                                                <MapPin className="size-5" />
                                                <span>Bangalore → Kerala</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
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
                                    <DropdownMenuItem key={item.title} className="flex items-center gap-2" onClick={item.onClick}>
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
