<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\User;
use App\Notifications\NewTeamMemberNotification;
use Dotenv\Exception\ValidationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Mpociot\Teamwork\Facades\Teamwork;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        $invitationToken = $request->query('invitation_token') ?? null;
        return Inertia::render('Auth/Register', [
            'invitation_token' => $invitationToken
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Check for an invitation token
        $invite = null;
        $token = $request->invitation_token;

        if ($token) {
            $invite = Teamwork::getInviteFromAcceptToken($token);
            if (! $invite) {
                throw ValidationException::withMessages(['invitation_token' => 'The invitation token is invalid or has expired.']);
            }
        }

        // Validate the registration request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Create the new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Trigger the Registered event
        event(new Registered($user));

        // Log the user in
        Auth::login($user);

        // If an invitation exists, accept it and attach the user to the team
        if ($invite) {
            Teamwork::acceptInvite($invite); // Accept the invite

            $teamOwner = $invite->team->owner;

            $teamOwner->notify(new NewTeamMemberNotification($invite->team, $user));
        } else {
            // If no invite, create a new team for the user
            $team = Team::create([
                'owner_id' => $user->id,
                'name' => $user->name . "'s Team",
            ]);

            // Attach the user to their newly created team
            $user->attachTeam($team);
        }

        // Redirect to the dashboard
        return redirect()->route('dashboard');
    }
}
