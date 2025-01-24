import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { TokenService } from '../services/tokenservice/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private tokenService: TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.tokenService.getAccessToken();
    if (token) {
      try {
        const decodedToken: any = jwt_decode.jwtDecode(token);
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
     
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
    console.log('No token found');
    this.router.navigate(['/login']);
    return false;
   }
  }
