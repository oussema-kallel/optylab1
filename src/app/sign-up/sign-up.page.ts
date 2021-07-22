import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// eslint-disable-next-line @typescript-eslint/naming-convention
export class opticien {
  public name: string;
  public email: string;
  public password: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  model = new opticien();
  myform: NgForm;
  constructor() {}

  ngOnInit() {}
  submit(myForm) {
    //alert(this.model.name);
    localStorage.setItem('formadata', JSON.stringify(this.model));
  }
}
