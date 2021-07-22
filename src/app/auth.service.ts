/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = [
    { username: 'admin', password: '123' },
    { username: 'oussema', password: '123' },
  ];
  public loggedUser: string;

  public isloggedIn: Boolean = false;
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (
        user.username === curUser.username &&
        user.password === curUser.password
      ) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });

    return validUser;
  }
}
