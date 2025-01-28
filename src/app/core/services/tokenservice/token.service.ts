import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly accessTokenKey = 'accessToken';
  private readonly refreshTokenKey = 'refreshToken';

  constructor(private cookieService: CookieService) {}

  /**
   * Stores the access and refresh tokens in cookies.
   * @param accessToken - The access token to store.
   * @param refreshToken - The refresh token to store.
   * @param rememberMe - A flag indicating whether to store the tokens for a long duration or not.
   */
  storeTokens(accessToken: string, refreshToken: string, rememberMe: boolean): void {
 
    if (!accessToken || !refreshToken) {
      console.error('Cannot store tokens: One or both tokens are undefined');
      return;  
    }

  
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + (rememberMe ? 30 : 1)); 

   
    const options: { 
      path: string; 
      secure: boolean; 
      sameSite: 'Strict' | 'Lax' | 'None'; 
      expires: Date;
      httpOnly: boolean; 
    } = {
      path: '/', 
      secure: true, 
      sameSite: 'Strict', 
      expires: expirationDate, 
      httpOnly: true,
    };

    this.cookieService.set(this.accessTokenKey, accessToken, options);
    this.cookieService.set(this.refreshTokenKey, refreshToken, options)
  }

  /**
   * Retrieves the stored access token.
   * @returns The access token or null if not found or invalid.
   */
  getAccessToken(): string | null {
    const token = this.cookieService.get(this.accessTokenKey);
    
   
    if (token && token.split('.').length === 3) {
      return token;
    } else {
      console.error('Invalid token format:', token);
      return null;
    }
  }

  /**
   * Retrieves the stored refresh token.
   * @returns The refresh token or null if not found.
   */
  getRefreshToken(): string | null {
    return this.cookieService.get(this.refreshTokenKey) || null;
  }

  /**
   * Clears the stored tokens from cookies.
   */
  clearTokens(): void {
    this.cookieService.delete(this.accessTokenKey);
    this.cookieService.delete(this.refreshTokenKey);
  }

  /**
   * Decodes the JWT token and returns the user role.
   * @returns The user role if it exists in the token or null if not found.
   */
  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.roles && Array.isArray(decodedToken.roles) ? decodedToken.roles[0] : null;
    } catch (error) {
      console.error('Error decoding token', error);
      this.clearTokens();  
      return null;
    }
  }

  /**
   * Checks if the access token has expired.
   * @returns true if the token has expired, false otherwise.
   */
  isAccessTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const decodedToken: any = jwtDecode(token);
      const expirationTime = decodedToken?.exp;
      if (!expirationTime) return true; 

      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime >= expirationTime;
    } catch (error) {
      console.error('Error decoding token for expiration check', error);
      return true;
    }
  }

  /**
   * Clears expired tokens if found.
   */
  clearExpiredTokens(): void {
    if (this.isAccessTokenExpired()) {
      console.log('Access token expired, clearing tokens');
      this.clearTokens();
    }
  }
}
