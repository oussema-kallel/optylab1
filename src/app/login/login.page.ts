/* eslint-disable @typescript-eslint/ban-types */
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginuserData = {};

  userlog = new User();
  constructor(
    private authService: AuthService,

    private router: Router
  ) {}

  ngOnInit() {}
  onloggedin() {
    console.log(this.userlog);
    const isValidUser: Boolean = this.authService.SignIn(this.userlog);
    if (isValidUser) {
      this.router.navigate(['/accueil']);
    } else {
      //alert('login et mot de passe incorrect');
      Swal.fire('Non connecté', 'Login ou mot de passe incorrecte!', 'error');
    }
  }
  //savedata(signform: NgForm) {
  // console.log(signform.value);
  //  this.UserService.loginuser(this.loginuserData).subscribe(
  //   (res) => console.log(res),
  //   (err) => console.log(err)
  //   );
  // }
}
