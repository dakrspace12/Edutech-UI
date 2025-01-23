import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TokenService } from '../tokenservice/token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

  getId(): string | null{
    const token = localStorage.getItem('accessToken')
    if(token){
      try{
        const decodedToken : any = jwtDecode(token);
        return decodedToken.id || null;
      } catch (error){
        console.error('Error decoding token:', error);
        return null;
      }
    }
    console.warn('No token found in localStorage');
    return null;
  }
  /**
   * Registers a new user.
   * @param user - User object containing username, email, password, etc.
   * @returns Observable of response with tokens (access token and refresh token).
   */
  register(user: User): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, user, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((response) => {
          this.tokenService.storeTokens(response.accessToken, response.refreshToken);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Logs in the user, stores the tokens, and returns the server response.
   * @param user - User credentials (username and password).
   * @returns Observable of response with tokens.
   */
  login(user: { email: string; password: string }): Observable<any> {
    const loginData = {
      email: user.email,
      password: user.password,
    };
    return this.http
      .post<any>(`${this.apiUrl}/login`, loginData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((response) => {
          this.tokenService.storeTokens(response.accessToken, response.refreshToken);
          // Explicit role data check 
          const role = response.data?.role;
          switch (response.role) {
            case 'ROLE_ADMIN':
              this.router.navigate(['/admin-layout/admin-dashboard']);
              break;
            case 'ROLE_USER':
              this.router.navigate(['/layout/dashboard']);
              break;
            case 'ROLE_INSTRUCTOR':
              // For future role addition
              this.router.navigate(['/instructor-dashboard']);
              break;
            default:
              this.router.navigate(['/login']); // fallback or redirect to login
              break;
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Refreshes access token using the stored refresh token.
   * @returns Observable of new access token response.
   */
  refreshAccessToken(): Observable<any> {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('Refresh token is missing.'));
    }

    return this.http
      .post<any>(`${this.apiUrl}/refresh-token`, { refreshToken }, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((response) => {
          this.tokenService.storeTokens(response.accessToken, response.refreshToken); // Update tokens
          return response;
        }),
        catchError((error) => {
          this.logout();
          return throwError(() => new Error('Session expired. Please log in again.'));
        })
      );
  }

  /**
   * Retrieves the access token from TokenService.
   * @returns The access token string or null if not found.
   */
  getAccessToken(): string | null {
    return this.tokenService.getAccessToken();
  }

  /**
   * Checks if a refresh token exists.
   * @returns True if refresh token exists, otherwise false.
   */
  hasRefreshToken(): boolean {
    return this.tokenService.hasRefreshToken();
  }
  getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.role ?? ''; 
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken(); // Check if token exists and is valid
  }
  

  /**
   * Logs out the user by clearing tokens and redirecting to the login page.
   */
  logout(): void {
    this.tokenService.removeTokens();
    this.router.navigate(['/login']);
  }

  /**
   * Handles HTTP errors gracefully and provides user-friendly messages.
   * @param error - The error from the HTTP request.
   */
  public handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP Error:', error); // Log the error for debugging purposes
    const errorMessage =
      error.error instanceof ErrorEvent
        ? `Client-side Error: ${error.error.message}` // Client-side error
        : `Server-side Error: ${error.status} - ${error.message}`; // Server-side error
    return throwError(() => new Error(errorMessage));
  }
}