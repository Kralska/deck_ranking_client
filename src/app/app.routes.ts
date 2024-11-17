import { Routes } from '@angular/router';

import { DecksComponent } from './decks/decks.component';
import { DeckComponent } from './deck/deck.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    // Decks
    {path: 'decks/:id', component: DeckComponent},
    {path: 'decks', component: DecksComponent},
    // User
    {path: 'users/:id', component: UserComponent},
    {path: 'users', component: UsersComponent},
    // Main Page
    {path: '', redirectTo: '/decks', pathMatch: 'full'}
];
