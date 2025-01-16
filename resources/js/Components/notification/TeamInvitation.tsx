import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { router } from "@inertiajs/react";


const TeamInvitationNotification = ({ notification }: { notification: any }) => {

    const { toast } = useToast();

    const acceptInvitation = () => {
        router.get(route('teams.invitations.accept', notification.data.accept_token), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast({
                    title: "Invitation Accepted",
                    description: "You have been invited to join team " + notification.data.team.name
                })
            }
        })
    }

    const declineInvitation = () => {
        router.get(route('teams.invitations.decline', notification.data.decline_token), {}, {
            onSuccess: () => {
                toast({
                    title: "Invitation Declined",
                    description: "You have declined the invitation to join team " + notification.data.team.name
                })
            }
        })
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <strong className="text-primary font-semibold">Team Invitation</strong>
                <small className="text-muted-foreground text-xs">{formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}</small>
            </div>
            <p className="text-sm text-muted-foreground">{notification.data.message}</p>
            <div className="flex items-center gap-2 mt-2">
                <Button onClick={acceptInvitation} size={'sm'} variant={'default'} className="w-full">
                    Accept
                </Button>
                <Button onClick={declineInvitation} size={'sm'} variant={'destructive'} className="w-full">
                    Decline
                </Button>
            </div>
        </div >
    )
}


export default TeamInvitationNotification;