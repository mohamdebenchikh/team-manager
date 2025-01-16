import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Invite, PageProps, Team, User } from "@/types";
import { Head, usePage, router } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/Components/ui/dialog";
import { Label } from '@/Components/ui/label';
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import InputError from "@/Components/InputError";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { set } from "date-fns";


export default function TeamMembers({ team }: {
    team: Team
    & { users: User[], invites: Invite[] }
}) {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
    const [leaveTeamDialog, setLeaveTeamDialog] = useState(false);
    const [removeMemeberId, setRemoveMemberId] = useState('');

    const { user: currentUser } = usePage<PageProps>().props.auth;
    const { toast } = useToast();

    const isOwner = (team: Team) => {
        return team.owner_id === currentUser.id
    }

    const handleInviteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (email) {
            router.post(route('teams.invitations.store', team.id), { email }, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setEmail('')
                    setOpenDialog(false);
                    toast({
                        title: "Invitation Sent",
                        description: "Invitation has been sent to " + email
                    })
                },
                onError: (errors) => {
                    setError(errors.email);
                }
            });
        }
    }

    const resendInvite = (invite: Invite) => {
        router.get(route('teams.invitations.resend', invite.id), {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Invitation Sent",
                    description: "Invitation has been sent to " + invite.email
                })
            },
        });
    }

    const cancelInvite = (invite: Invite) => {
        router.delete(route('teams.invitations.destroy', {
            inviteId: invite.id,
            teamId: team.id
        }), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Invitation Cancelled",
                    description: "Invitation has been cancelled for " + invite.email
                })
            },
        });
    }

    const confirmRemoveMember = (user: User) => {
        setRemoveMemberId(user.id.toString());
        setOpenRemoveDialog(true);
    }

    const removeTeamMember = () => {
        router.delete(route('teams.members.destroy', {
            userId: removeMemeberId,
            teamId: team.id
        }), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const successMessage = page.props.flash.success
                toast({
                    title: "Member Removed",
                    description: successMessage ? successMessage : "Member has been removed"
                })
            },
        });
    }

    const leaveTeam = () => {
        router.delete(route('teams.leave', team.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const successMessage = page.props.flash.success
                const errorMessage = page.props.flash.error;

                if (errorMessage) {
                    toast({
                        title: "Error",
                        description: errorMessage
                    })
                    return
                }

                toast({
                    title: "Team Left",
                    description: successMessage ? successMessage : "You have left the team"
                })
            }
        });
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight">{team.name} Members</h2>}
        >
            <Head title="Members" />


            <Dialog onOpenChange={setLeaveTeamDialog} open={leaveTeamDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Leave Team</DialogTitle>
                        <DialogDescription>
                            {team.owner_id === currentUser.id ? 'Are you sure you want to leave this team? You will no longer be able to manage it.' : 'Are you sure you want to leave this team?'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'outline'}>Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={() => leaveTeam()}>Yes i'am sure </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog onOpenChange={setOpenRemoveDialog} open={openRemoveDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove Member</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to remove this member?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'outline'}>Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={() => removeTeamMember()}>Remove</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="py-8 px-4 space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl font-semibold">Team Members</CardTitle>
                        <div>
                            {isOwner(team) && (
                                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                    <DialogTrigger asChild>
                                        <Button variant={'default'}>Invite User</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <form onSubmit={handleInviteSubmit} >
                                            <DialogHeader>
                                                <DialogTitle>Invite User</DialogTitle>
                                                <DialogDescription>
                                                    Invite a user to the team
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-2 py-4">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter user email" />
                                                <InputError message={error} />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button type="button" variant={'outline'}>
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button type="submit">Invite</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="flex flex-col gap-4">
                            {team.users.map((user) => (
                                <li key={user.id} className="flex border rounded-md p-4 items-center justify-between ">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={user.photo_url} alt={user.name} />
                                            <AvatarFallback delayMs={600}>{user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col leading-tight">

                                            <div className="flex items-center space-x-1">
                                                <h3 className="font-semibold">{user.name}</h3>
                                                <span className="text-xs px-2 py-0.5 rounded-full border text-muted-foreground">{user.id === team.owner_id ? 'Owner' : 'Member'}</span>
                                            </div>

                                            <span className="text-sm text-muted-foreground">{user.email}</span>
                                        </div>
                                    </div>
                                    <div>
                                        {isOwner(team) && user.id !== currentUser.id && (
                                            <>
                                                <Button size={"sm"} onClick={() => confirmRemoveMember(user)} variant={'destructive'}>
                                                    Remove
                                                </Button>
                                            </>
                                        )}

                                        {user.id === currentUser.id && (
                                            <Button onClick={() => setLeaveTeamDialog(true)} size={"sm"} variant={'destructive'}>
                                                Leave
                                            </Button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                {isOwner(team) && (<Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Pending Invitations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="flex flex-col gap-4">
                            {team.invites.map((invite) => (
                                <li key={invite.id} className="flex border rounded-md p-4 items-center justify-between ">
                                    <div className="">
                                        <span className="text-primary">{invite.email}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size={"sm"} onClick={() => resendInvite(invite)}>
                                            Resend Invitation
                                        </Button>
                                        <Button onClick={() => cancelInvite(invite)} size={"sm"} variant={'destructive'}>
                                            Cancel
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>)}
            </div>
        </AuthenticatedLayout>
    );
}
