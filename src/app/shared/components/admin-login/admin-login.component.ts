import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordPopupComponent } from '../forgot-password-popup/forgot-password-popup.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
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
export class AdminLoginComponent {
  hidePassword: boolean = true;
  adminLoginForm: FormGroup;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.adminLoginForm = this.fb.group({
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

  onAdminLogin() {
    if (this.adminLoginForm.valid) {
      const adminData = this.adminLoginForm.value;
      this.http.post(`${environment.apiUrl}/admin/login`, adminData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }).subscribe(
        (response: any) => {
          console.log('Admin logged in successfully', response);
          this.token = response.token;
          localStorage.setItem('adminToken', response.token);
          alert(`Login successful! Token: ${response.token}`);
          this.router.navigate(['/admin/dashboard']);
        },
        (error) => {
          console.error('Error logging in', error);
          alert('Login failed. Please check your credentials.');
        }
      );
    }
  }

  ForgotPasswordAdmin(): void {
    this.dialog.open(ForgotPasswordPopupComponent);
  }


  // Handle password visibility toggle
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  passwordLengthError() {
    return (
      this.adminLoginForm.get('password')?.hasError('minlength') &&
      this.adminLoginForm.get('password')?.touched
    );
  }

  passwordAlphanumericError() {
    return (
      this.adminLoginForm.get('password')?.hasError('pattern') &&
      this.adminLoginForm.get('password')?.touched
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateBack() {
    this.router.navigate(['/register']);
  }
}
