import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/tokenservice/token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRoles = next.data['roles'] || [];
    const userRole = this.tokenService.getUserRole(); 
    if (!userRole || !requiredRoles.includes(userRole)) {
      this.router.navigate(['/access-denied']);
      return false;
    }

    return true;
  }
}
