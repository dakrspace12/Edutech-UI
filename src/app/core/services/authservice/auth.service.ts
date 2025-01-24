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
  /**
   * Retrieves the user ID from the access token.
   * @returns The user ID or null if token is invalid or not found.
   */
  getId(): string | null{
    const token = this.tokenService.getAccessToken();
    if(token){
      try{
        const decodedToken : any = jwtDecode(token);
        return decodedToken.id || null;
      } catch (error){
        console.error('Error decoding token:', error);
        return null;
      }
    }
    console.warn('No token found in cookies');
    return null;
  }
  /**
   * Registers a new user and stores the tokens.
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
   * @param user - User credentials (email and password).
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
          this.navigateBasedOnRole = (response.data?.role);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Navigates based on the user role.
   * @param role - The user's role.
   */
  private navigateBasedOnRole(role: string | undefined): void {
          
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
              this.router.navigate(['/login']);
              break;
          }
         
  }

  /**
   * Refreshes the access token using the stored refresh token.
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
    const token = this.tokenService.getAccessToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.error('Access token has expired');
          this.tokenService.clearTokens(); // Optionally remove expired token
          return null; // Token has expired, return null
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return token;
  }

  /**
   * Checks if a refresh token exists in cookies.
   * @returns True if refresh token exists, otherwise false.
   */
  hasRefreshToken(): boolean {
    return !!this.tokenService.getRefreshToken();
  }
    /**
   * Retrieves the user role from localStorage.
   * @returns The role of the user, or an empty string if not found.
   */
  getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.role ?? ''; 
  }
  /**
   * Checks if the user is authenticated based on the presence of a valid access token.
   * @returns True if the user is authenticated, otherwise false.
   */

  isAuthenticated(): boolean {
    return !!this.getAccessToken(); // Check if token exists and is valid
  }
  

  /**
   * Logs out the user by clearing tokens and redirecting to the login page.
   */
  logout(): void {
    this.tokenService.clearTokens();
    this.router.navigate(['/login']);
  }

  /**
   * Handles HTTP errors gracefully and provides user-friendly messages.
   * @param error - The error from the HTTP request.
   * @returns Observable that throws an error with a user-friendly message.
   */
  public handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP Error:', error); // Log the error for debugging purposes
    let errorMessage = 'An unknown error occurred';
     if (error.error instanceof ErrorEvent){
      errorMessage = `Client-side Error: ${error.error.message}` ;
    } else {
      errorMessage = `Server-side Error: ${error.status} - ${error.message}`;
      if (error.status === 401) {
        console.warn('Unauthorized: Invalid or expired token');
        this.logout();  
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}