import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule
  ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
  userForm = new FormGroup({
    id: new FormControl<Number|null>(null),
    username: new FormControl<string|null>('', {validators: [Validators.required]})
  })

  onSubmit() {
    let user: User = {id: undefined, username: this.userForm.value.username ?? ''};
    this.userService.addUser(user);
    
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<UserAddComponent>, private userService: UserService){

  }
}
