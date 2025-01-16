<style>
    a {
        text-decoration: none;
    }
    .btn {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
        display: inline-block;
        margin: 4px 2px;
        cursor: pointer;
    }
    .btn-danger {
        background-color: #f44336;
    }
</style>

You have been invited to join team {{$team->name}}.<br>
Please click the following link to register and accept the invitation.<br>
<a href="{{route('register', ['invitation_token' => $invite->accept_token])}}" class="btn">Join Team</a>

