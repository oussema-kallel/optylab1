import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url =
    'https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001';
  constructor(private http: HttpClient) {}
  getusers(): Observable<any> {
    return this.http.get(this.url);
  }
}
