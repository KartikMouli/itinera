"use client"

import { User, LogOut, Info, Mail, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ThemeToggle } from "../theme-toggle.tsx/theme-toggle"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Navbar = () => {
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


    return (
        <nav className="flex h-16 items-center rounded-full gap-4">
            <Link href="/dashboard">
                <span className="hover:underline">Dashboard</span>
            </Link>
            <ThemeToggle />
            <div className="flex items-center ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:cursor-pointer rounded-full">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <User className="size-5" />
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={10}>
                        <DropdownMenuItem>
                            <Link href="/dashboard/profile" className="flex items-center gap-2">
                                <User className="size-4" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="#" onClick={handleSignOut} className="flex items-center gap-2">
                                <LogOut className="size-4" />
                                Sign Out
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <Link href="/dashboard/profile" className="flex items-center gap-2">
                                <Info className="size-4" />
                                About
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="#" className="flex items-center gap-2">
                                <Mail className="size-4" />
                                Contact
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="#" className="flex items-center gap-2">
                                <FileText className="size-4" />
                                Terms and Conditions
                            </Link>
                        </DropdownMenuItem>

                    </DropdownMenuContent>

                </DropdownMenu>
            </div>
        </nav>

    )
}

export default Navbar