"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession()

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/auth/login")
        }
    }, [session, isPending, router])

    if (isPending) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!session) {
        return null
    }

    return <>{children}</>
}