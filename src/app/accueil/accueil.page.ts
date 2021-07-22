import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  userdata: Array<any> = [];

  constructor(private user: UserService) {}

  ngOnInit() {
    this.user.getusers().subscribe((res) => {
      console.log(res);
      this.userdata = res;
    });
  }
}
