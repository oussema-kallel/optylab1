/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

import { MatTableDataSource } from '@angular/material/table';

interface Ipost {
  DA: string;
  Code: string;
  Lib: string;
  Libelle: string;
  NumPiece: string;
  Debit: string;
  Credit: string;
  Reglement: string;
  Avoir: string;
  Solde: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailPage implements OnInit {
  serializedDate = new FormControl(new Date().toISOString());

  userdata: Array<any> = [];

  columns: string[] = [
    'DA',
    'Code',
    'Lib',
    'Libelle',
    'NumPiece',
    'Debit',
    'Credit',
    'Reglement',
    'Solde',
  ];

  pageSize = 10;

  public total = 0;

  private value;

  public firstdate = '';
  public enddate = '';

  public dataSource = new MatTableDataSource<Ipost>();

  posts: Ipost[];

  v3 = 1;
  isChecked = true;

  error: any = { isError: false, errorMessage: '' };
  isValidDate: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private user: UserService,
    private screenOrientation: ScreenOrientation
  ) {}

  ngOnInit() {
    /* fetch('./assets/test.json')
      .then((res) => res.json())
      .then((json) => {
        this.posts = json;*/
    this.user.getusers().subscribe((res) => {
      console.log(res);
      this.posts = res;

      this.dataSource = new MatTableDataSource(this.posts);

      this.findsum(this.posts);

      this.firstdate = this.getCurrentTime();
      this.enddate = this.getendate();

      this.isValidDate = this.validateDates(this.firstdate, this.enddate);
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.LANDSCAPE
      );
    });
  }

  /*this.user.getusers().subscribe((res) => {
      console.log(res);
      this.rows = res;
    });*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getTotal() {
    return this.dataSource.data.map((x) => +x.Debit - +x.Reglement);
  }
  findsum(data: string | any[]) {
    this.value = data;

    for (let j = 0; j < data.length; j++) {
      this.total += this.value[j].Debit;
    }
  }
  /*creditech( data){
    this.value =data;
    for (let j=0; j< data.length; j++){

    if(this.value[j].Debit < 0){
      this.a=this
    }
    }
  }*/

  getCurrentTime() {
    let now = moment();
    now = now.subtract('3', 'months');
    return now.format('YYYY-MM-DD');
  }
  sansBL() {
    if (!this.isChecked) {
      this.v3 = 0;
    } else {
      this.v3 = 1;
    }
    console.log(this.v3);
  }
  validateDates(sDate: string, eDate: string) {
    this.isValidDate = true;

    if (sDate != null && eDate != null && eDate < sDate) {
      this.error = {
        isError: true,
        errorMessage: 'End date should be grater then start date.',
      };
      this.isValidDate = false;
    }
    return this.isValidDate;
  }
  getendate() {
    const now = moment();
    return now.format('YYYY-MM-DD');
  }
}
