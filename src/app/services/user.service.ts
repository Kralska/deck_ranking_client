import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpUsers: Observable<User[]>;
  private users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
    this.httpUsers = http.get<User[]>('http://localhost:8080/api/users');
    this.httpUsers.subscribe(this.users);
  }

  subscribeToAllUsers(observer: Partial<Observer<User[]>> | ((value: User[]) => void)): void{
    this.users.subscribe(observer);
  }

  refreshUsers(): void {
    this.httpUsers.subscribe();
  }

  subscribeToUser(observer: Partial<Observer<User>> | ((value: User) => void), id: Number): void {
    this.http.get<User>('http://localhost:8080/api/users/' + id).subscribe(observer);
  }

  getUser(id: Number) : User | undefined {
    return this.users.getValue().find((user: User) => user.id == id)
  }
}
