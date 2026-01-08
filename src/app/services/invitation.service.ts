import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invitation, InvitationResponse } from '../models/invitation.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InvitationService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getInvitation(code: string): Observable<Invitation[]> {
        return this.http.get<InvitationResponse>(`${this.apiUrl}/invitations?code=${code}`)
            .pipe(map(response => response.invitation ? [response.invitation] : []));
    }

    createInvitation(invitationData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/invitations`, invitationData);
    }

    acceptInvitation(code: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/invitations/${code}/accept`, {});
    }
}
