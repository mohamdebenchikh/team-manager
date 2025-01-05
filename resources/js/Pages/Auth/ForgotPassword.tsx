import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <form onSubmit={submit} className='p-6 md:p-8'>

                <div className=' flex flex-col gap-6'>

                    <div className="">
                        <h1 className="text-2xl font-bold">Forgot Password</h1>

                    </div>

                    <div className="text-sm text-muted-foreground">
                        Forgot your password? No problem. Just let us know your email
                        address and we will email you a password reset link that will
                        allow you to choose a new one.
                    </div>

                    {status && (
                        <div className="text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <div>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>


                    <Button className="w-full" disabled={processing}>
                        Email Password Reset Link
                    </Button>
                </div>

            </form>

        </GuestLayout>
    );
}
