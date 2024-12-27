import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordPopupComponent } from '../forgot-password-popup/forgot-password-popup.component';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    private authService: AuthService
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

  onLogin() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.authService.login(userData).subscribe(
        (response: any) => {
          console.log('User logged in successfully', response);
          alert(`Login successful! Token: ${response.token}`);
          this.router.navigate(['/layout/dashboard']);
        },
        (error) => {
          console.error('Error logging in', error);
          alert('Login failed. Please check your credentials.');
        }
      );
    }
  }

  ForgotPassword(): void {
    this.dialog.open(ForgotPasswordPopupComponent);
  }

  // Handle password visibility toggle
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  passwordLengthError() {
    return (
      this.loginForm.get('password')?.hasError('minlength') &&
      this.loginForm.get('password')?.touched
    );
  }

  passwordAlphanumericError() {
    return (
      this.loginForm.get('password')?.hasError('pattern') &&
      this.loginForm.get('password')?.touched
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateBack() {
    this.router.navigate(['/register']);
  }
}
