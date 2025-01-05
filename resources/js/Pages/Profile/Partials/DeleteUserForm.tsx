import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogDescription, DialogContent, DialogHeader, DialogTrigger, DialogFooter, DialogClose } from '@/Components/ui/dialog';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeDialog(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeDialog = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <Card >
            <CardHeader>
                <CardTitle>
                    Delete Account
                </CardTitle>

                <CardDescription >
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Dialog open={confirmingUserDeletion} onOpenChange={setConfirmingUserDeletion}>
                    <DialogTrigger asChild>
                        <Button variant={'destructive'}>Delete Account</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={deleteUser}>

                            <DialogHeader>
                                <DialogHeader>Are you sure you want to delete your account?</DialogHeader>
                                <DialogDescription>
                                    Once your account is deleted, all of its resources and
                                    data will be permanently deleted. Please enter your
                                    password to confirm you would like to permanently delete
                                    your account.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='my-4'>
                                <Label
                                    htmlFor="password"
                                    className="sr-only"
                                >Password</Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="mt-1"
                                    placeholder="Password"
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button onClick={closeDialog} type='button'>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button variant={'destructive'} disabled={processing} type={'submit'}>Delete</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
