import { AppSidebar } from "@/components/app-sidebar/app-sidebar"
import Navbar from "@/components/navbar/navbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { cookies } from "next/headers"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center px-5">
                        <SidebarTrigger />
                        <Navbar />
                    </div>
                    <main className="w-full">
                        {children}
                    </main>
                </div>
            </div>

        </SidebarProvider>
    )
}
