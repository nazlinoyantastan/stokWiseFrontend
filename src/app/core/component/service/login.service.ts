import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogin = false;
  username="";
  password="";
  token="";


  constructor(
    private httpClient : HttpClient
  ) { }

  

  login(username: string, password: string){
    return this.httpClient.post<any>('/login',{username,password}).pipe(
      map(data => {
        this.isLogin = true;
        this.token = data.token;
        this.username = username;
        this.password = password;
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        return data;
      })
    )
  }
}
