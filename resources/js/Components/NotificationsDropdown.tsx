import { BellIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import React from "react";
import TeamInvitationNotification from "./notification/TeamInvitation";
import DefaultNotification from "./notification/DefaultNotification";



export default function NotificationsDropdown() {

    const { unreadNotifications } = usePage<PageProps>().props.auth;

    const notificationCount = unreadNotifications.length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative">
                    <Button size={'icon'} variant={'outline'}>
                        <BellIcon className="h-6 w-6" />
                    </Button>
                    {notificationCount > 0 && <span className="absolute top-0 right-1 h-4 w-4 flex items-center justify-center text-[8px] rounded-full bg-red-500 text-white">
                        {notificationCount}</span>}
                </div>

            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuGroup>
                    <div className="flex items-center justify-between">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <Link href={route('notifications.mark-all-as-read')} method="post" className="text-xs px-2 cursor-pointer text-muted-foreground underline hover:no-underline hover:text-primary">Mark all as read</Link>
                    </div>

                    {unreadNotifications.map((notification, index) => (
                        <React.Fragment key={notification.id}>
                            <DropdownMenuItem
                            >
                                {
                                    notification.type == "App\\Notifications\\TeamInvitationNotification" ?
                                        <TeamInvitationNotification notification={notification} /> :
                                        <DefaultNotification notification={notification} />
                                }
                            </DropdownMenuItem>
                            {index < unreadNotifications.length - 1 && <DropdownMenuSeparator />}
                        </React.Fragment>
                    ))}

                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild >
                    <Link href={route('notifications.index')} className="flex cursor-pointer justify-center items-center">
                        All notifications
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}