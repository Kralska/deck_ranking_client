import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    standalone: true,
    selector: 'app-users',
    imports: [
      MatTableModule,
      RouterLink,
      MatButtonModule,
      MatPaginator,
      MatSortModule,
      MatToolbarModule
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit{
  userService = inject(UserService);

  displayedColumns: string[] = ['username']
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly dialog = inject(MatDialog);


  promptAddUser(){
    const dialogRef = this.dialog.open(UserAddComponent); 
  }

  constructor(){
    this.dataSource = new MatTableDataSource<User>();
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
