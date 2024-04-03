import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn = false;
  token = "";
  email = "";
  password = "";
  roles: string[] = [];

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('/login', { email, password }).pipe(
      map(resp => {
        // console.log(resp);
        //this.processToken(this.parseJwt(resp.token));
        return this.parseLoginResponse(resp, email, password);
      })
    );
  }

  signUp(email: string, password: string): Observable<any> {
    // email: email, password: password
    //http.post<any>(url, body) ~ "Observable"
    return this.http.post<any>('/user/signup', { email, password }).pipe(
      map(resp => {
        // console.log(resp);
        return this.parseLoginResponse(resp, email, password);
      })
    );
  }

  parseLoginResponse(data: any, email: string, password: string) {
    this.loggedIn = true;
    this.token = data.token;
    this.email = email;
    this.password = password;
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    let payload = this.parseJwt(this.token);
    this.roles = payload.roles;
    return data;
  }


  userHasRole(role: string): boolean {
    return this.roles.findIndex(r => r === role) != -1;
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  logout(){
    this.loggedIn = false,
    this.email = "";
    this.password = "";
    this.token = "";
    this.roles = [];
    localStorage.clear();
  }

}
