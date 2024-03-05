import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = "";
  password = "";


  constructor(

    private loginService: LoginService,
    private router: Router,
  ) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (resp) => {
        this.router.navigate(['/stokwise'])
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }

}
