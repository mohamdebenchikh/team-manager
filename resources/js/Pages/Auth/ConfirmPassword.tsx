import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <form onSubmit={submit} className='p-6 md:p-8'>
                <div className='flex flex-col gap-6'>
                    <div className="">
                        <h1 className="text-2xl font-bold">Confirm Password</h1>

                    </div>
                    <div className="text-sm text-muted-foreground">
                        This is a secure area of the application. Please confirm your
                        password before continuing.
                    </div>

                    <div>
                        <Label htmlFor="password" >Password</Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <Button className="w-full" disabled={processing}>
                        Confirm
                    </Button>
                </div>

            </form>
        </GuestLayout>
    );
}
