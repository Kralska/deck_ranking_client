import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
    standalone: true,
    selector: 'app-user-add',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogModule
    ],
    templateUrl: './user-add.component.html',
    styleUrl: './user-add.component.scss'
})
export class UserAddComponent {
  
  userService = inject(UserService);

  constructor(public dialogRef: MatDialogRef<UserAddComponent>){}

  userForm = new FormGroup({
    username: new FormControl<string | null>(null, {validators: [Validators.required]})
  });

  addNewUser() {
    let user: User = {username: this.userForm.value.username!};
    this.userService.addUser(user);
  }

}
