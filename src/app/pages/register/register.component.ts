import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from 'src/environments/environment'; // Import the environment file
import { CommonModule, Location } from '@angular/common';

// Custom password match validator
import { passwordMatchValidator } from './password-match.validator'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private location: Location) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        mobile_no: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
          ],
        ],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: passwordMatchValidator } // Custom validator for password mismatch
    );
  }

  // On form submission
  onRegister() {
    if (this.registerForm.valid && !this.registerForm.hasError('passwordMismatch')) {
      const userData = this.registerForm.value;
      this.http.post(`${environment.apiUrl}/users/register`, userData).subscribe(  // Using apiUrl from environment
        (response) => {
          alert("User registered successfully");
          console.log('User registered successfully', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Registration failed. Please try again.');
          console.error('Error registering user', error);
         
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

  // Password length and pattern error checks
  passwordLengthError() {
    return (
      this.registerForm.get('password')?.hasError('minlength') &&
      this.registerForm.get('password')?.touched
    );
  }

  passwordAlphanumericError() {
    return (
      this.registerForm.get('password')?.hasError('pattern') &&
      this.registerForm.get('password')?.touched
    );
  }

  // Password mismatch error
  mismatchError() {
    return (
      this.registerForm.get('confirmPassword')?.touched &&
      this.registerForm.hasError('passwordMismatch')
    );
  }
  // Navigate to the login page
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  // Navigate back to the previous page
  navigateBack() {
    this.location.back(); // This will take the user to the previous page in history
  }
}
