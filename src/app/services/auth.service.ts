import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { handleError } from './error-handler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}
  /**
   * Registers a new user.
   * @param user - User object containing username, email, password, etc.
   * @returns Observable of User
   */

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * Logs in the user and stores the token.
   * @param user - User credentials (username and password).
   * @returns Observable of response with token.
   */

  login(user: User): Observable<any> {
    const loginData = {
      usernameOrEmail: user.email || user.username,
      password: user.password
    };
    return this.http.post<any>(`${this.apiUrl}/login`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map(response => {

        localStorage.setItem('token', response.token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

    /**
  * Checks if the stored token is valid based on expiration time.
  * @returns True if token is valid, otherwise false.
  */
    isTokenValid(): boolean {
      const token = localStorage.getItem('token');
      if (!token) return false;
  
     try{
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(new Date().getTime() / 1000);
      return payload.exp > currentTime;
     }catch(error){
      return false;
     }
    }
  
    /**
     * Retrieves the user's role from the stored token.
     * @returns The user's role or null if token is missing/invalid.
     */
    getUserRole(): string | null {
      const token = localStorage.getItem('token');
      if (!token) return null;
  try{
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    }catch(error){
      return null;
  
    }
  }
  
    /**
     * Handles errors from HTTP requests.
     * @param error - The HTTP error response.
     * @returns An observable that throws an error with a user-friendly message.
     */

    private handleError(error: HttpErrorResponse): Observable<never> {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(() => new Error(errorMessage));
    }
  }