import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://192.168.1.251:8080/service_web/liste_user/';
  constructor(private http: HttpClient) {}
  getusers(): Observable<any> {
    return this.http.get(this.url);
  }
}
