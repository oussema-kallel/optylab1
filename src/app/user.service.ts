import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url =
    'http://192.168.1.250/BS/SoldeClient/000001/00400362/20210426/20210726/1';
  constructor(private http: HttpClient) {}
  getusers(): Observable<any> {
    return this.http.get(this.url);
  }
}
