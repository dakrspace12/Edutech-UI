import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

   private readonly accessTokenKey =  'accessToken';
   private readonly refreshTokenKey =  'refreshToken';
   constructor(private cookieService: CookieService) {}
   
  storeTokens(accessToken: string, refreshToken: string): void {
    const options: { 
      path: string; 
      secure: boolean; 
      sameSite: 'Strict' | 'Lax' | 'None'; 
      expires: number;
    } = {
      path: '/',
      secure: true,
      sameSite: 'Strict',
      expires: 1,
    };

  
    this.cookieService.set(this.accessTokenKey, accessToken, options);
    this.cookieService.set(this.refreshTokenKey, refreshToken,options);
   
  }

  /**
   * Retrieves the stored access token.
   * @returns The access token or null if not found.
   */
  getAccessToken(): string | null {
    return this.cookieService.get(this.accessTokenKey) || null;
}

  /**
   * Retrieves the stored refresh token.
   * @returns The refresh token or null if not found.
   */
  getRefreshToken(): string | null {
    return this.cookieService.get(this.refreshTokenKey) || null;
  }

  clearTokens(): void {
    this.cookieService.delete(this.accessTokenKey, '/');
    this.cookieService.delete(this.refreshTokenKey, '/');
 
  }

}