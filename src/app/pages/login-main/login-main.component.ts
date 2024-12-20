import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-main',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.scss'
})
export class LoginMainComponent {

  constructor(
    private router: Router
  ){}

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}
