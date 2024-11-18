import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, RouterLink, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  displayedColumns: string[] = ['name']
  dataSource: Observable<User[]>;

  readonly dialog = inject(MatDialog);

  promptAddUser(){
    const dialogRef = this.dialog.open(UserAddComponent); 
  }

  constructor(private users: UserService){
    this.dataSource = users.getUsers();
  }

}
