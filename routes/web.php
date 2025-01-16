<?php

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Teamwork\TeamMemberController;
use App\Http\Controllers\Teamwork\TeamController;
use App\Http\Controllers\Teamwork\TeamInvitationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(
    function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::post('/profile/photo', [ProfileController::class, 'updatephoto'])->name('profile.update-photo');


        Route::get('/notifications',[NotificationController::class,'index'])->name('notifications.index');
        Route::post('/notifications/mark-as-read/{id}',[NotificationController::class,'markAsRead'])->name('notifications.mark-as-read');
        Route::post('/notifications/mark-all-as-read',[NotificationController::class,'markAllAsRead'])->name('notifications.mark-all-as-read');
        Route::delete('/notifications/{id}',[NotificationController::class,'destroy'])->name('notifications.destroy');

        Route::resource('teams', TeamController::class)->only([
            'index',
            'create',
            'store',
            'edit',
            'update',
            'destroy',
        ]);

        Route::resource('teams.members', TeamMemberController::class)->only([
            'index',
            'store',
        ]);
        Route::delete('teams/{id}/leave', [TeamController::class, 'leaveTeam'])->name('teams.leave');

        Route::delete('teams/{teamId}/members/{userId}', [TeamMemberController::class, 'destroy'])->name('teams.members.destroy');

        Route::get('teams/{team}/show', [TeamMemberController::class, 'show'])->name('teams.members.show');

        Route::post('teams/{team}/switch', [TeamController::class, 'switchTeam'])
            ->name('teams.switch');

        Route::post('/team/{id}/invitations', [TeamInvitationController::class, 'store'])->name('teams.invitations.store');
        Route::post('/invitations/{id}/resend', [TeamInvitationController::class, 'resendInvite'])->name('teams.invitations.resend');
        Route::delete('team/{teamId}/invitations/{inviteId}', [TeamInvitationController::class, 'cancelInvite'])->name('teams.invitations.cancel');

        Route::get('/invitations/{token}/accept', [TeamInvitationController::class, 'acceptInvite'])->name('teams.invitations.accept');
        Route::get('/invitations/{token}/decline', [TeamInvitationController::class, 'declineInvite'])->name('teams.invitations.decline');
   
   
        Route::resource('tasks', App\Http\Controllers\TaskController::class);
   
    }

);

require __DIR__ . '/auth.php';
