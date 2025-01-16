import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwt_decode.jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
     
          this.router.navigate(['/login']);
          return false;
        }
      return true;
    } catch (error) {
      console.error('Invalid token', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
    this.router.navigate(['/login']);
    return false;
   }
  }
