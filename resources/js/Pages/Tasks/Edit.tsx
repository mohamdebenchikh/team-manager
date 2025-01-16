import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import InputError from "@/Components/InputError";
import { User } from "@/types";
import { Textarea } from "@/Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Checkbox } from "@/Components/ui/checkbox";
import { Task } from "@/types";

export default function EditTask({ task, users }: { task: Task, users: User[] }) {

    const { data, setData, errors, put, processing, reset } = useForm({
        title: task.title,
        description: task.description,
        assigned_to: task.assigned_to?.toString(),
        completed: task.completed
    })


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        put(route('tasks.update', task.id))
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">Edit Task</h2>
            }
        >

            <Head title="Edit Task" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Task </CardTitle>
                            <CardDescription>
                                Edit a task to collaborate with others
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Task title </Label>
                                    <Input id="title" type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                                    <InputError message={errors.title} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Task description </Label>
                                    <Textarea defaultValue={data.description} id="description" onChange={(e) => setData('description', e.target.value)} />
                                    <InputError message={errors.description} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="assigned_to">Assigned to</Label>
                                    <Select onValueChange={(value) => setData('assigned_to', value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a user" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={user.photo_url} alt={user.name} />
                                                            <AvatarFallback className="rounded-lg">
                                                                {user.name[0].toUpperCase()}

                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="">
                                                            <strong>{user.name}</strong>
                                                        </div>
                                                    </div>

                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.assigned_to} />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox checked={data.completed ?? false} id="completed" onCheckedChange={(value: boolean) => setData('completed', value)} />
                                    <Label htmlFor="completed">Completed</Label>
                                </div>

                                <div>
                                    <Button disabled={processing}>Submit</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
