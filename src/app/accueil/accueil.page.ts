import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccueilPage implements OnInit {
  userdata: Array<any> = [];
  public columns: any;
  public rows: any;
  constructor(private user: UserService) {}

  ngOnInit() {
    this.columns = [{ name: 'id' }, { name: 'firstName' }];
    this.user.getusers().subscribe((res) => {
      console.log(res);
      this.userdata = res;
    });
  }
}
