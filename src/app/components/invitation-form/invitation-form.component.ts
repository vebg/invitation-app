import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InvitationService } from '../../services/invitation.service';

@Component({
    selector: 'app-invitation-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './invitation-form.component.html',
    styleUrls: ['./invitation-form.component.css']
})
export class InvitationFormComponent {
    invitationData = {
        code: '',
        projectKey: ''
    };
    isLoading = false;
    error = '';

    constructor(
        private invitationService: InvitationService,
        private router: Router
    ) { }

    onSubmit(): void {
        if (!this.invitationData.code || !this.invitationData.projectKey) return;

        this.isLoading = true;
        this.invitationService.createInvitation(this.invitationData).subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigate(['/invitations'], { queryParams: { message: 'Invitation created successfully!' } });
            },
            error: (err) => {
                this.isLoading = false;
                this.error = 'Failed to create invitation.';
                console.error(err);
            }
        });
    }
}
