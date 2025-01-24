import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordPopupComponent } from '../forgot-password-popup/forgot-password-popup.component';
import { AuthService } from 'src/app/core/services/authservice/auth.service';
import { TokenService } from 'src/app/core/services/tokenservice/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    RouterModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule, 
    CommonModule,
    MatDialogModule,
  ],
})
export class LoginComponent {
  hideConfirmPassword: boolean = true;
  hidePassword: boolean = true;
  loginForm: FormGroup;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
        ],
      ],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
  
      this.authService.login(userData).subscribe(
        (response: any) => {
          const {role, accessToken,refreshToken }= response?.data || {};
  
          if (!role) {
            alert('Login successful, but no role assigned. Please contact support.');
            this.router.navigate(['/login']);
            return;
          }
          if (!accessToken || !refreshToken) {
            alert('Access token or refresh token are missing. Please try again.');
            return;
          }
          this.tokenService.storeTokens(accessToken, refreshToken);
          this.navigateBasedOnRole(role);
        },
        (error: HttpErrorResponse) => {
          this.handleLoginError(error);
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
  private navigateBasedOnRole(role: string): void {
          switch (role) {
            case 'ROLE_ADMIN':
            this.router.navigate(['/admin-layout/admin-dashboard']);
              break;
            case 'ROLE_USER':
            this.router.navigate(['/layout/dashboard']);
              break;
            case 'ROLE_INSTRUCTOR':
            this.router.navigate(['/instructor-dashboard']);
              break;
            default:
              alert('Unrecognized role or login error.');
              this.router.navigate(['/login']);
              break;
          }
        }
        private handleLoginError(error: HttpErrorResponse) :void {
          console.error('Error logging in:', error);
  
          if (error.status === 401) {
            alert('Login failed. Invalid username or password.');
          } else if (error.status >= 500) {
            alert('Server error occurred. Please try again later.');
          } else {
            alert(`Login failed. Error: ${error.message}`);
          }
        }
  ForgotPassword(): void {
    this.dialog.open(ForgotPasswordPopupComponent);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  passwordLengthError() :boolean {
    
    const hasMinLengthError = this.loginForm.get('password')?.hasError('minlength') ??false
      const isTouched = this.loginForm.get('password')?.touched??false;
      return hasMinLengthError && isTouched; 
  }

  passwordAlphanumericError(): boolean {
  
    const hasPatternError = this.loginForm.get('password')?.hasError('pattern') ?? false
      const isTouched = this.loginForm.get('password')?.touched??false;
      return hasPatternError && isTouched;
  }

  navigateToRegister():void {
    this.router.navigate(['/register']); 
  }

  navigateBack():void {
    this.router.navigate(['/register']);
  }
}