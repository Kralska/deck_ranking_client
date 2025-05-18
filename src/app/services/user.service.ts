import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, firstValueFrom, Observable, Observer } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users$: Observable<User[]>;
  private userArray$: BehaviorSubject<User[]>;
  private users: Map<number, User> = new Map<number, User>();

  constructor(private http: HttpClient) {
    this.userArray$ = new BehaviorSubject<User[]>([]);

    this.users$ = http.get<User[]>(environment.serverUrl + '/users');
    this.updateUsers();
  }
  
  updateUsers() {
    this.users$.subscribe(newUsers => {
      this.users.clear();
        newUsers.forEach(user => {
          this.users.set(user.id!, user)
        });

        this.userArray$.next(newUsers);
    });
  }
  
  getUsers() : BehaviorSubject<User[]> {
    return this.userArray$;
  }

  addUser(user: User){
      this.http.post<User>(environment.serverUrl + '/users', user).subscribe(user => {
        let users: User[] = this.userArray$.getValue();
        users.push(user);
        this.userArray$.next(users);
      });
  }

  subscribeToUser(observer: Partial<Observer<User>> | ((value: User) => void), id: Number): void {
    this.http.get<User>(environment.serverUrl + '/users/' + id).subscribe(observer);
  }

  getUser(id: number) : User | undefined {
    return this.users.get(id);
  }
}
