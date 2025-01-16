<?php

namespace App\Http\Controllers\Teamwork;

use App\Http\Controllers\Controller;
use App\Mail\TeamInvitationMail;
use App\Models\User;
use App\Notifications\NewTeamMemberNotification;
use App\Notifications\TeamInvitationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Mpociot\Teamwork\Facades\Teamwork;
use Mpociot\Teamwork\TeamInvite;

/**
 * Controller handling team invitations.
 */
class TeamInvitationController extends Controller
{
    /**
     * Send an invitation to join a team.
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, $id)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($id);

        if (!Teamwork::hasPendingInvite($request->email, $team)) {
            Teamwork::inviteToTeam($request->email, $team, function ($invite) use ($request, $team) {
                $user = User::where('email', $request->email)->first();

                if ($user) {
                    $user->notify(new TeamInvitationNotification($invite));
                } else {
                    Mail::to($request->email)->send(new TeamInvitationMail($invite, $team));
                }
            });
        } else {
            return redirect()->back()->withErrors([
                'email' => 'The email address is already invited to the team.',
            ]);
        }

        return redirect()->back()->with('success', 'Invitation sent to ' . $request->email);
    }

    /**
     * Resend an invitation email.
     * 
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function resendInvite($id)
    {
        $invite = TeamInvite::findOrFail($id);
        Mail::send('teamwork.emails.invite', ['team' => $invite->team, 'invite' => $invite], function ($m) use ($invite) {
            $m->to($invite->email)->subject('Invitation to join team ' . $invite->team->name);
        });

        return redirect()->back()->with('success', 'Invitation resent to ' . $invite->email);
    }

    /**
     * Cancel a pending invitation.
     * 
     * @param int $teamId
     * @param int $inviteId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function cancelInvite($teamId, $inviteId)
    {
        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($teamId);

        if (!auth()->user()->isOwnerOfTeam($team)) {
            abort(403);
        }

        $invite = $team->invites()->findOrFail($inviteId);

        $notification = auth()->user()->notifications()->where('data->accept_token', $invite->accept_token)->first();
        if ($notification) {
            $notification->markAsRead();
            $notification->delete();
        }

        $invite->delete();

        return redirect()->back()->with('success', 'Invitation cancelled.');
    }

    /**
     * Accept an invitation to join a team.
     * 
     * @param string $token
     * @return \Illuminate\Http\RedirectResponse
     */
    public function acceptInvite($token)
    {
        $invite = Teamwork::getInviteFromAcceptToken($token);

        if(! $invite) {
            abort(404);
        }

        Teamwork::acceptInvite($invite);

        $notification = auth()->user()->notifications()->where('data->accept_token', $token)->first();
        if ($notification) {
            $notification->markAsRead();
            $notification->delete();
        }

        $owner = $invite->team->owner;
        $owner->notify(new NewTeamMemberNotification($invite->team, auth()->user()));

        return redirect()->back()->with('success', 'You have been invited to join team ' . $invite->team->name);
    }

    /**
     * Decline an invitation to join a team.
     * 
     * @param string $token
     * @return \Illuminate\Http\RedirectResponse
     */
    public function declineInvite($token)
    {
        $invite = Teamwork::getInviteFromDenyToken($token);

        if(! $invite) {
            abort(404);
        }

        Teamwork::denyInvite($invite);

        $notification = auth()->user()->notifications()->where('data->decline_token', $token)->first();
        if ($notification) {
            $notification->markAsRead();
            $notification->delete();
        }
        return redirect()->back()->with('success', 'You have declined the invitation to join team ' . $invite->team->name);
    }
}

