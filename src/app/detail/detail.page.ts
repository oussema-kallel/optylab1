import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailPage implements OnInit {
  userdata: Array<any> = [];
  public columns: any;
  public rows: any;
  constructor(private user: UserService) {}

  ngOnInit() {
    this.user.getusers().subscribe((res) => {
      console.log(res);
      this.rows = res;
    });
  }
}
