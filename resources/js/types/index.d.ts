export interface User {
    id: number;
    name: string;
    photo_url?: string;
    bio: string;
    email: string;
    email_verified_at?: string;
}


export interface Notification {
    id: number;
    notifiable_type: string;
    type: string;
    data: any;
    read_at?: string;
    created_at: string;
    updated_at: string;
}

export interface Team {
    id:number;
    name: string;
    owner_id: number;
    description: string;
}

export interface Task {
    id:number;
    title:string;
    description:string;
    team_id:number;
    user_id:number;
    created_at:string;
    completed:boolean?;
    user:User?;
    team:Team;
    assigned_to:User?;
}

export interface Invite {
    id: number;
    email: string;
    accept_token: string;
    deny_token: string;
    team_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        currentTeam: Team;
        teams: Team[];
        unreadNotifications: Notification[];
        invites: Invite[]
    };
    flash: {
        success?: string;
        error?: string;
    }
};
