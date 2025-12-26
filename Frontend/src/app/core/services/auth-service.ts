import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  URL="http://localhost:8080/api/auth";

  public constructor(private http: HttpClient) { }

  public register(user: any): Observable<string> {
    return this.http.post(this.URL + "/register", user, {
      responseType: 'text'
    });
  }

  public login(loginData: any): Observable<string> {
    return this.http.post(this.URL + "/login", loginData, {
      responseType: 'text'
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return token !== null;
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

}
