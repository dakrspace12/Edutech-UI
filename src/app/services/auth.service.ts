import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(handleError)
    );
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/login`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/auth/refresh-token`, {}, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(handleError)
    );
  }
}
