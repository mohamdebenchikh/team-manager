import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { PageProps, Team } from "@/types";
import { Button } from "@/Components/ui/button";
import { Edit, Plus, TrashIcon, UsersIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import React from "react";
import { useToast } from "@/hooks/use-toast";

export default function TeamIndex({ teams }: {
    teams: Team[]
}) {

    const { toast } = useToast();

    const { user, currentTeam } = usePage<PageProps>().props.auth;
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
    const [deleteTeamId, setDeleteTeamId] = React.useState("");

    const swithTeam = (team: any) => {
        router.post(route('teams.switch', team.id), {}, {
            onSuccess: () => {

            }
        })
    }


    const isCurrentTeam = (team: any) => {
        return team.id === currentTeam?.id
    }

    const isOwner = (team: any) => {
        return team.owner_id === user.id
    }

    const deleteTeam = (team: any) => {
        setDeleteTeamId(team.id)
        setShowDeleteDialog(true)
    }

    const confirmDeleteTeam = () => {
        router.delete(route('teams.destroy', deleteTeamId), {
            onSuccess: () => {
                setShowDeleteDialog(false)
            }
        })
    }
    const closeDialog = () => {
        setShowDeleteDialog(false)
        setDeleteTeamId("")
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight">Teams</h2>}
        >
            <Head title="Teams" />
            <div className="py-8 ">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl text-primary font-medium">
                            All Teams
                        </h2>
                        <div>
                            <Button variant={'default'} asChild>
                                <Link href={route('teams.create')}>
                                    <Plus size={16} />
                                    Create Team
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {teams.map((team) => (
                            <div key={team.id} className="flex border flex-col gap-y-2 items-start rounded-md p-4 md:items-center md:flex-row justify-between ">
                                <div className="flex gap-2 items-center">
                                    <h3 className="text-lg text-primary">{team.name}</h3>
                                    <span className="text-muted-foreground px-2 py-1 text-xs rounded-full border">
                                        {isOwner(team) ? "Owner" : "Member"}
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center ">

                                    {isCurrentTeam(team) ? (
                                        <Button size={'sm'} variant={'ghost'} disabled>
                                            Current Team
                                        </Button>
                                    ) : (
                                        <Button onClick={() => swithTeam(team)} size={'sm'} variant={'outline'}>
                                            Switch
                                        </Button>
                                    )}

                                    <Button size={'sm'} variant={'outline'} asChild >
                                        <Link href={route('teams.members.show', team.id)}>
                                            <UsersIcon size={16} />
                                            Members
                                        </Link>

                                    </Button>

                                    {isOwner(team) && (
                                        <>
                                            <Button size={'sm'} variant={'outline'} asChild>
                                                <Link href={route('teams.edit', team.id)} >
                                                    <Edit size={16} />
                                                    Edit
                                                </Link>
                                            </Button>

                                            <Button size={'sm'} onClick={() => deleteTeam(team)} variant={'destructive'} >
                                                <TrashIcon size={16} />
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Team</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this team?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={closeDialog}>Cancel</Button>
                        <Button variant={'destructive'} onClick={confirmDeleteTeam}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}