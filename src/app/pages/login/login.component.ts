import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // Ensure API endpoint is correct
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    CommonModule
  ],  
})
export class LoginComponent {
  hideConfirmPassword: boolean = true; // or false, depending on your logic
  hidePassword: boolean = true; // This will hide the password by default
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
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
      this.http.post(`${environment.apiUrl}/users/login`, userData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }).subscribe(
        (response) => {
          console.log('User logged in successfully', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error logging in', error);
          alert('Login failed. Please check your credentials.');
        }
      );
    }
  }
  // Handle password visibility toggle
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
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
