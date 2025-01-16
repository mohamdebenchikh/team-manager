import * as React from "react"
import {
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  ListCheck,
  WorkflowIcon,
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
import ApplicationLogo from "./ApplicationLogo"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { user } = usePage<PageProps>().props.auth;


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"} className="flex items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ">
              <div>
                <ApplicationLogo className="text-primary fill-current size-8" />

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
            <SidebarGroup >
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <div className='space-y-1'>
                <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={route().current("dashboard")}>
                  <Link href={route("dashboard")}>
                    <LayoutDashboardIcon size={24} />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={route().current("teams.*")}>
                  <Link href={route("teams.index")}>
                    <WorkflowIcon size={24} />
                    Teams
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive={route().current("tasks.*")}>
                  <Link href={route("tasks.index")}>
                    <ListCheck size={24} />
                    Tasks
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              </div>
              
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
