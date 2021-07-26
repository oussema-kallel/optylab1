import { Component, OnInit } from '@angular/core';

import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccueilPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
