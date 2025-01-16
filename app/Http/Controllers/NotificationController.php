<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $unreadNotifications = auth()->user()->unreadNotifications;
        $readNotificcations = auth()->user()->readNotifications;
        return Inertia::render('Notifications', compact('unreadNotifications', 'readNotificcations'));
    }


    public function markAsRead($id)
    {
        auth()->user()->notifications()->find($id)->markAsRead();
        return back();
    }

    public function markAllAsRead()
    {
        auth()->user()->unreadNotifications->markAsRead();
        return back();
    }


    public function destroy($id)
    {
        auth()->user()->notifications()->find($id)->delete();
        return back();
    }


}
