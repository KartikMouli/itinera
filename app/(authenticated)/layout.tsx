import { AppSidebar } from "@/components/app-sidebar/app-sidebar"
import Navbar from "@/components/navbar/navbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { cookies } from "next/headers"

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                    <div className="flex w-full justify-between items-center px-8">
                        <SidebarTrigger />
                        <Navbar />
                    </div>
                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
} 