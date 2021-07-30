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
  public a;
  public dataSource = new MatTableDataSource<Ipost>();
  posts: Ipost[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private user: UserService,
    private screenOrientation: ScreenOrientation
  ) {}

  ngOnInit() {
    /*fetch('./assets/test.json')
      .then((res) => res.json())
      .then((json) => {
        this.posts = json;*/
    this.user.getusers().subscribe((res) => {
      console.log(res);
      this.posts = res;
      this.dataSource = new MatTableDataSource(this.posts);
      this.findsum(this.posts);
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
}
