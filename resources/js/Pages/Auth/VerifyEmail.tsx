import PrimaryButton from '@/Components/PrimaryButton';
import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />
            <form onSubmit={submit} className='p-6 md:p-8'>
                <div className='flex flex-col gap-6'>

                    <div>
                        <h1 className="text-2xl font-bold">Verify Your Email Address</h1>
                        <p className="text-sm text-muted-foreground">
                            Thanks for signing up! Before getting started, could you verify
                            your email address by clicking on the link we just emailed to
                            you? If you didn't receive the email, we will gladly send you
                            another.
                        </p>
                    </div>



                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            A new verification link has been sent to the email address
                            you provided during registration.
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <Button disabled={processing}>
                            Resend Verification Email
                        </Button>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-md text-sm text-muted-foreground underline hover:text-primary focus:outline-none"
                        >
                            Log Out
                        </Link>
                    </div>
                </div>

            </form>
        </GuestLayout>
    );
}
