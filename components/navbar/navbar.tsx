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


const Navbar = () => {
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const userImage = session?.user?.image || null
    const userName = session?.user?.name || "User"

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/")
                },
            },
        })
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
                                {userImage ? (
                                    <AvatarImage src={userImage} alt={userName} />
                                ) : (
                                    <AvatarFallback>
                                        {userName.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={10}>
                        <DropdownMenuItem>
                            <Link href={`/dashboard/profile`} className="flex items-center gap-2 w-full">
                                <User className="size-4" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/" onClick={handleSignOut} className="flex items-center gap-2 w-full">
                                <LogOut className="size-4" />
                                Sign Out
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <Link href="/" className="flex items-center gap-2 w-full">
                                <Info className="size-4" />
                                About
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/" className="flex items-center gap-2 w-full">
                                <Mail className="size-4" />
                                Contact
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/" className="flex items-center gap-2 w-full">
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