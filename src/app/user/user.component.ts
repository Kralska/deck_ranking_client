import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    standalone: true,
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent {
  user: User | undefined;
  id: number;

  constructor(private route: ActivatedRoute, private userService: UserService){
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
    this.user = userService.getUser(this.id);
  }
  
}