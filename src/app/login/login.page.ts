/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import Swal from 'sweetalert2';
export interface Data {
  clients: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginuserData = {};
  public data: Data;
  userdata: any;
  client = {
    nom: '',
    code: '',
  };
  userlog = new User();
  constructor(
    private authService: AuthService,
    private storage: Storage,
    private menu: MenuController,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.menu.enable(false);
  }
  async onloggedin() {
    await this.storage.create();
    this.http
      .get('http://192.168.1.113/service_web/liste_user/')
      .subscribe((res) => {
        this.userdata = res;
        for (let i = 0; this.userdata.length; i++) {
          if (
            this.client.nom === res[i].Lib &&
            this.client.code === res[i].NC
          ) {
            this.storage.set('code', this.client.code);

            this.router.navigate(['/accueil']);
          }
        }
      });
  }
}
