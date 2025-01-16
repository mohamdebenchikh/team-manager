<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::with('user', 'assignedTo','team')->get();
        return Inertia::render('Tasks/Index', compact('tasks'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $currentTeam = auth()->user()->currentTeam;
        $users = $currentTeam->users;
        return Inertia::render('Tasks/Create', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
           'title' => 'required|string',
           'description' => 'nullable|string',
           'assigned_to' => 'nullable|exists:users,id',
           'completed' => 'nullable|boolean',
        ]);

        Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'team_id' => auth()->user()->currentTeam->id,
            'user_id' => auth()->user()->id,
            'assigned_to' => $request->assigned_to
        ]);


        return redirect(route('tasks.index'))->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $currentTeam = auth()->user()->currentTeam;
        $users = $currentTeam->users;

        $task = Task::where('team_id', $currentTeam->id)->findOrFail($id);

        return Inertia::render('Tasks/Edit', compact('users', 'task'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'completed' => 'nullable|boolean',
        ]);

        $task = Task::where('team_id', auth()->user()->currentTeam->id)->findOrFail($id);

        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            'assigned_to' => $request->assigned_to,
            'completed' => $request->completed
        ]);

        return redirect(route('tasks.index'))->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $authUser = auth()->user();
        $task = Task::where('team_id', auth()->user()->currentTeam->id)->findOrFail($id);

        if($task->user_id !== $authUser->id) {
            abort(403);
        }


        $task->delete();

        return redirect(route('tasks.index'))->with('success', 'Task deleted successfully.');
    }
}
