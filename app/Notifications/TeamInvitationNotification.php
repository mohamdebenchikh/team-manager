<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TeamInvitationNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public $invite)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Invitation to join team ' . $this->invite->team->name)
            ->line('You have been invited to join team ' . $this->invite->team->name)
            ->action('Accept Invitation', route('teams.invitations.accept', $this->invite->accept_token))
            ->action('Decline Invitation', route('teams.invitations.decline', $this->invite->deny_token));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'team_name' => $this->invite->team->name,
            'message' => "You have been invited to join team {$this->invite->team->name}",
            'accept_token' => $this->invite->accept_token,
            'decline_token' => $this->invite->deny_token,
        ];
    }
}
