import { Routes } from '@angular/router';
import { InvitationListComponent } from './components/invitation-list/invitation-list.component';
import { InvitationFormComponent } from './components/invitation-form/invitation-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'invitations', pathMatch: 'full' },
    { path: 'invitations', component: InvitationListComponent },
    { path: 'invitations/new', component: InvitationFormComponent }
];
