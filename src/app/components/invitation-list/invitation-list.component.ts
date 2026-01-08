import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InvitationService } from '../../services/invitation.service';
import { Invitation } from '../../models/invitation.model';

@Component({
    selector: 'app-invitation-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './invitation-list.component.html',
    styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {
    invitations: Invitation[] = [];
    isLoading = false;
    searchCode = '';
    hasSearched = false;
    error = '';

    successMessage = '';

    constructor(
        private invitationService: InvitationService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params['message']) {
                this.successMessage = params['message'];
                setTimeout(() => {
                    this.successMessage = '';
                }, 5000);
                // Clean up query param
                this.router.navigate([], {
                    queryParams: { message: null },
                    queryParamsHandling: 'merge',
                    replaceUrl: true
                });
            }
        });
    }

    onSearch(): void {
        if (!this.searchCode.trim()) return;

        this.isLoading = true;
        this.hasSearched = true;
        this.error = '';
        this.invitations = [];

        this.invitationService.getInvitation(this.searchCode).subscribe({
            next: (data) => {
                this.invitations = data;
                this.isLoading = false;
                if (this.invitations.length === 0) {
                    this.error = 'No invitation found with this code.';
                }
            },
            error: (err) => {
                this.error = 'Failed to find invitation.';
                this.isLoading = false;
                console.error(err);
            }
        });
    }

    onAccept(invitation: Invitation): void {
        this.invitationService.acceptInvitation(invitation.code).subscribe({
            next: () => {
                const index = this.invitations.findIndex(i => i.code === invitation.code);
                if (index !== -1) {
                    this.invitations[index].status = 'Accepted';
                }
            },
            error: (err) => {
                console.error('Failed to accept invitation', err);
                alert('Failed to accept invitation');
            }
        });
    }
}
