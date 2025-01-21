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
import { TokenService } from 'src/app/core/services/tokenservice/token.service'; // TokenService to manage JWT

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private tokenService: TokenService // TokenService for managing JWT
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(3)]], // Updated field to "username"
        email: ['', [Validators.required, Validators.email]],
        mobile_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Validation for 10-digit mobile numbers
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

  /**
   * On form submission, registers the user and stores the JWT token.
   */
  onRegister() {
    if (this.registerForm.valid && !this.registerForm.hasError('passwordMismatch')) {
      const userData = this.registerForm.value;

      // API call for user registration
      this.http.post(`${environment.apiUrl}/register`, userData).subscribe(
        (response: any) => {
          alert('User registered successfully');
          console.log('User registered successfully', response);

          // Save the received JWT to local storage using TokenService
          this.tokenService.storeTokens(response.accessToken, response.refreshToken);

          // Navigate to a protected page (e.g., dashboard) after successful registration
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          alert('Registration failed. Please try again.');
          console.error('Error registering user', error);
        }
      );
    } else {
      this.registerForm.markAllAsTouched(); // Highlight validation errors if form is invalid
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