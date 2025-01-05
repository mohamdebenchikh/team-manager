import { AppSidebar } from "@/Components/app-sidebar";
import { Separator } from "@/Components/ui/separator";
import { Toaster } from "@/Components/ui/toaster";


import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { DarkModeToggle } from "@/Components/DarkModeToggle";


export default function AuthenticatedLayout({
    children,
    header,
}: {
    children: React.ReactNode,
    header?: React.ReactNode
}) {


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center px-4 justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        {header}
                    </div>
                    <div className="flex items-center gap-2">
                        <DarkModeToggle />
                    </div>
                </header>
                <main>
                    {children}
                    <Toaster />
                </main>

            </SidebarInset>
        </SidebarProvider>
    )
}
