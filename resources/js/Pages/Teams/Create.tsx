import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, useForm } from "@inertiajs/react"
import { Label } from "@/Components/ui/label"
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import InputError from "@/Components/InputError"
import React from "react"
import { Textarea } from "@/Components/ui/textarea"


export default function CreateTeam() {

    const { data, setData, errors, post } = useForm({
        name: '',
        description: '',
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post(route('teams.store'))
    }

    return (
        <AuthenticatedLayout header={
            <h2 className="text-xl font-semibold leading-tight">Create Team</h2>
        }>
            <Head title=" Create Team" />

            <div className="px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Team</CardTitle>
                        <CardDescription>
                            Create a new team to collaborate with others
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="name">Team name </Label>
                                <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} required placeholder="Team name" />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Team description</Label>
                                <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Team description" />
                                <InputError message={errors.description} />
                            </div>
                            <div>
                                <Button type="submit">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>


        </AuthenticatedLayout>
    )
}