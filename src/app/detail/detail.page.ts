/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

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
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

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
  dataclient: any;
  pageSize = 10;

  public total = 0;

  private value;

  public firstdate = this.getCurrentTime();
  public enddate = this.getendate();
  public a = '';
  public b = '';
  public v3;
  public dataSource = new MatTableDataSource<Ipost>();

  posts: Ipost[];

  isChecked;
  error: any = { isError: false, errorMessage: '' };
  isValidDate: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private user: UserService,
    private screenOrientation: ScreenOrientation,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private router: Router,
    private http: HttpClient
  ) {}
  dateRangeChange1(dateRangeStart: HTMLInputElement) {
    this.firstdate = moment(dateRangeStart.value, 'MM-DD-YYYY').format(
      'YYYY-MM-DD'
    );
    this.test();
  }
  dateRangeChange2(dateRangeEnd: HTMLInputElement) {
    this.enddate = moment(dateRangeEnd.value, 'MM-DD-YYYY').format(
      'YYYY-MM-DD'
    );
    this.test();
  }
  async ngOnInit() {
    /* fetch('./assets/test.json')
      .then((res) => res.json())
      .then((json) => {
        this.posts = json;*/
    // this.user.getusers().subscribe((res) => {
    // console.log(res);
    // this.posts = res;
    this.v3 = 1;
    this.isChecked = true;
    this.test();
    //this.findsum(this.posts);

    // this.isValidDate = this.validateDates(this.firstdate, this.enddate);
    // console.log(this.isValidDate);

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
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
    return this.dataSource.data.map((x) => +x.Credit - +x.Reglement);
  }
  /* findsum(data: string | any[]) {
    this.value = data;

    for (let j = 0; j < data.length; j++) {
      this.total += this.value[j].Debit;
    }
  }*/
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
    this.v3 = this.isChecked ? 1 : 0;
    console.log(this.v3);
    this.test();
  }

  getendate() {
    const now = moment();
    return now.format('YYYY-MM-DD');
  }
  API(URL: string) {
    return this.http.get(URL);
  }

  async test() {
    await this.storage.create();

    this.storage.get('code').then((val) => {
      this.API(
        'http://192.168.1.250/BS/SoldeClient/000001/' +
          val +
          '/' +
          this.firstdate +
          '/' +
          this.enddate +
          '/' +
          this.v3
      ).subscribe((res) => {
        this.dataclient = res;
        console.log(this.dataclient);
        this.posts = this.dataclient;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;
      });
    });
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
}
