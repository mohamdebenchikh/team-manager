import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Task } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/Components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { CircleCheck, EditIcon, MoreVertical, TrashIcon } from "lucide-react";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function Index({ tasks }: { tasks: Task[] }) {

    const { user: currentUser } = usePage<PageProps>().props.auth;
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [deleteTaskId, setDeleteTaskId] = React.useState(0);
    const { toast } = useToast();


    const showDeleteDialog = (id: number) => {
        setDeleteTaskId(id);
        setOpenDeleteDialog(true);
    }

    const confirmDeleteTask = () => {
        router.delete(route('tasks.destroy', deleteTaskId), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setOpenDeleteDialog(false);
                toast({
                    title: "Task Deleted",
                    description: "Task has been deleted"
                })
            }
        })
    }

    const cancelDeleteTask = () => {
        setOpenDeleteDialog(false);
        setDeleteTaskId(0);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">Tasks</h2>
            }
        >
            <Head title="Tasks" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-medium">Tasks</h3>
                        <div>
                            <Button asChild>
                                <Link href={route('tasks.create')}>
                                    Add New Task
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {tasks.map((task) => (
                            <Card key={task.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">

                                            <CardTitle>{task.title}</CardTitle>
                                            {task.description && <CardDescription>{task.description}</CardDescription>}
                                        </div>
                                        {task.user_id === currentUser.id && <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant={'ghost'} size={'icon'}>
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>
                                                    <CircleCheck className="mr-2 h-4 w-4" />
                                                    <span>Complete</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('tasks.edit', task.id)}>
                                                        <EditIcon className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => showDeleteDialog(task.id)}>
                                                    <TrashIcon className="mr-2 h-4 w-4" />
                                                    <span>Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>}

                                    </div>

                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            Assigned to: {task.assigned_to?.name || 'Unassigned'}, Team: {task.team.name}, created at: {formatDistanceToNow(new Date(task.created_at))} {task.completed ? '(Completed)' : ''} {task.user && task.user.id === currentUser.id ? '(Created by you)' : `by ${task.user?.name}`}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Task</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this task?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={cancelDeleteTask}>Cancel</Button>
                        <Button variant={"destructive"} onClick={confirmDeleteTask}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}