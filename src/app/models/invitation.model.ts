export interface Invitation {
    id?: string;
    code: string;
    projectKey: string;
    status: 'Pending' | 'Accepted';
}

export interface InvitationResponse {
    success: boolean;
    message: string | null;
    invitation: Invitation;
}
