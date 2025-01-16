import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Notification } from "@/types";
import DefaultNotification from "@/Components/notification/DefaultNotification";
import TeamInvitationNotification from "@/Components/notification/TeamInvitation";
import { Button } from "@/Components/ui/button";
import { Head, router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

export default function Notifications({
    unreadNotifications,
    readNotificcations
}: {
    unreadNotifications: Notification[],
    readNotificcations: Notification[]
}) {
    const renderNotification = (notification: Notification) => {
        if (notification.type === "App\\Notifications\\TeamInvitationNotification") {
            return <TeamInvitationNotification notification={notification} />;
        }
        return <DefaultNotification notification={notification} />;
    };

    const { toast } = useToast();


    const markAllAsRead = () => {
        router.post(route('notifications.mark-all-as-read'), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast({
                    title: "Notifications Marked as Read",
                    description: "All notifications have been marked as read"
                })
            }
        })
    }

    const markAsRead = (notification: Notification) => {
        router.post(route('notifications.mark-as-read', notification.id), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast({
                    title: "Notification Marked as Read",
                    description: "Notification has been marked as read"
                })
            }
        })
    }


    const deleteNotification = (notification: Notification) => {
        router.delete(route('notifications.destroy', notification.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast({
                    title: "Notification Deleted",
                    description: "Notification has been deleted"
                })
            }
        })
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-primary">Notifications</h2>}

        >

            <Head title="Notifications" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {unreadNotifications.length === 0 && readNotificcations.length === 0 && (
                        <div>
                            <h3 className="font-semibold text-lg text-primary mb-3">No Notifications</h3>
                        </div>
                    )}

                    {unreadNotifications.length > 0 && <div>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-semibold text-lg text-primary mb-3">Unread Notifications</h3>


                            <Button variant={'outline'} onClick={markAllAsRead}>
                                Mark all as read
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {unreadNotifications.map(notification => (
                                <div key={notification.id} className="border rounded-lg p-4">
                                    {renderNotification(notification)}
                                    <div className="flex mt-2 gap-2">
                                        <Button variant={'outline'} size={'sm'} onClick={() => markAsRead(notification)}>
                                            Mark as read
                                        </Button>
                                        <Button variant={'destructive'} onClick={() => deleteNotification(notification)} size={'sm'}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}

                    {readNotificcations.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold text-lg text-primary mb-3">Read Notifications</h3>
                            <div className="space-y-4">
                                {readNotificcations.map(notification => (
                                    <div key={notification.id} className="border rounded-lg p-4" >
                                        {renderNotification(notification)}
                                        <div className="flex mt-2 gap-2">

                                            <Button variant={'destructive'} onClick={() => deleteNotification(notification)} size={'sm'}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
