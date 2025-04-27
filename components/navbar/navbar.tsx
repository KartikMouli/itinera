import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur">
            <div className="flex h-16 items-center px-3 rounded-full">
                <div className="flex items-center gap-4 ml-auto">
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
                                <Link href="/auth/signout" className="flex items-center gap-2">
                                    <LogOut className="size-4" />
                                    Sign Out
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar