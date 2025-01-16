<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Mpociot\Teamwork\Traits\UsedByTeams;


class Task extends Model
{
    use UsedByTeams;

    protected $table = 'tasks';
    protected $fillable = ['title', 'description','user_id', 'team_id', 'assigned_to'];
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function assignedTo ()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
