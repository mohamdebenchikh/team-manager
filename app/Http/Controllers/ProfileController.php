<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function updatephoto(Request $request)
    {
        $request->validate([
            'photo' => ['required', 'image', 'mimes:jpg,png,jpeg', 'max:2048'],
        ]);

        $path = Storage::disk('public')->put('profile', $request->file('photo'));
        $url = Storage::url($path);

        $previous = Auth::user()->photo_url ?? null;

        Auth::user()->update([
            'photo_url' => $url,
        ]);

        // delete the previous photo

        if ($previous) {
            $previousPhoto = str_replace('storage/', '', $previous);
            Storage::disk('public')->delete($previousPhoto);
        }

        return redirect()->back()->with('success', 'Profile photo updated successfully.');
    }
}
