import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginToDiffAccPopupComponent } from '../login-to-diff-acc-popup/login-to-diff-acc-popup.component';

@Component({
  selector: 'app-login-main',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.scss'
})
export class LoginMainComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ){}
  googleLoginUrl: string = 'http://localhost:8081/oauth2/authorization/google';

  loginWithGoogle(){
    window.location.href = this.googleLoginUrl;
  }

  LogInToDifferentAccount(): void{
    this.dialog.open(LoginToDiffAccPopupComponent);
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}
