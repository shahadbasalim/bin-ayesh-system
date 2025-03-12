import { Injectable } from '@angular/core';
import { User } from '../interface/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  loadUsersFromLocalStorage(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      console.log('no users found');
    }
  }

  saveUsersToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  addUser(user: User): void {
    this.users.push(user);
    this.saveUsersToLocalStorage();
  }

  deleteUser(user: User): void {
    this.users = this.users.filter((u) => u !== user);
    this.saveUsersToLocalStorage();
  }
}
