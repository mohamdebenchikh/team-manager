<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $teams = [];
        $currentTeam = null;
        $unreadNotifications = null;

        if (auth()->check()) {
            $currentTeam = auth()->user()->currentTeam;
            $teams = auth()->user()->teams;
            $unreadNotifications = auth()->user()->unreadNotifications;
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'teams' => $teams,
                'currentTeam' => $currentTeam,
                'unreadNotifications' => $unreadNotifications
            ],
            'flash' => [
                'success' => session()->has('success') ? session()->get('success') : null,
                'error' => session()->has('error') ? session()->get('error') : null

            ]
        ];
    }
}
