import { Component } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-user',
    imports: [AsyncPipe],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent {
  user$: Observable<User>;
  id: Number;

  constructor(private route: ActivatedRoute, private userService: UserService){
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
    this.user$ = userService.getFullUser(this.id);
    this.user$.subscribe(console.log);
  }
  
}