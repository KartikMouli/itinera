import { AppSidebar } from "@/components/common/app-sidebar/app-sidebar"
import Navbar from "@/components/navbar/navbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { cookies } from "next/headers"
import Footer from "@/components/footer/footer"
import { ProtectedRoute } from "@/components/protected-route/protected-route"

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <ProtectedRoute>
                <div className="flex min-h-screen w-full text-foreground">
                    <AppSidebar />
                    <div className="flex-1 flex flex-col">
                        <div className="flex w-full justify-between items-center px-12">
                            <SidebarTrigger className="hover:cursor-pointer" />
                            <Navbar />
                        </div>
                        <main className="flex-1 px-12">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </div>
            </ProtectedRoute>
        </SidebarProvider>
    )
} 