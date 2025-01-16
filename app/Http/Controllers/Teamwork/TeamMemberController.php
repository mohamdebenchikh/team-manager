<?php

namespace App\Http\Controllers\Teamwork;

use Illuminate\Routing\Controller;
use Inertia\Inertia;

class TeamMemberController extends Controller
{
    /**
     * Show the members of the given team.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $teamModel = config('teamwork.team_model');
        $team = $teamModel::with('users', 'invites')->findOrFail($id);

        return Inertia::render('Teams/Members', compact('team'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $team_id
     * @param int $user_id
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function destroy($team_id, $user_id)
    {
        $teamModel = config('teamwork.team_model');
        $team = $teamModel::findOrFail($team_id);
        if (! auth()->user()->isOwnerOfTeam($team)) {
            abort(403);
        }

        $userModel = config('teamwork.user_model');
        $user = $userModel::findOrFail($user_id);
        if ($user->getKey() === auth()->user()->getKey()) {
            abort(403);
        }

        $user->detachTeam($team);

        return redirect()->back()->with("success","The {$user->name} user has been removed from the {$team->name} team.");
    }

   
}
