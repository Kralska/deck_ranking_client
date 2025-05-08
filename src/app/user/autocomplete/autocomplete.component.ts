import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'user-autocomplete',
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInput
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class UserAutocompleteComponent {
  userService = inject(UserService);
  
  filteredUsers: User[] = [];
  userInput = viewChild<ElementRef>("playerInput");

  onUserSelected(event: MatAutocompleteSelectedEvent) : void {
    //this.placements.at(placementIdx).get("user")?.setValue(event.option.value || undefined);
  }

  filterUsers() {
    const filterValue = this.userInput()!.nativeElement.value.toLowerCase();
    this.filteredUsers = this._filterUsers(filterValue);
  }

  private _filterUsers(filterValue: string): User[] {
    return this.userService.getUsers().getValue()
      .filter(deck => deck.username?.toLowerCase().includes(filterValue.toLowerCase()));
  }

  displayUserFn(user: User | null): string {
    return user?.username || "";
  }
}
