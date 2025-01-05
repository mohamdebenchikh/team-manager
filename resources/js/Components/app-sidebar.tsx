import * as React from "react"
import {
  GalleryVerticalEnd,
  LayoutDashboardIcon,
} from "lucide-react"

import { NavUser } from "@/Components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/Components/ui/sidebar"
import { ScrollArea } from "./ui/scroll-area"
import { Link, usePage } from "@inertiajs/react"
import { PageProps } from "@/types";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { user } = usePage<PageProps>().props.auth;


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"} className="flex items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Acme Inc
                </span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarHeader>
      <SidebarContent>
        <ScrollArea>
          <SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={route().current("dashboard")}>
                  <Link href={route("dashboard")}>
                    <LayoutDashboardIcon size={24} />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroup>
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
