import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

   private accessTokenKey =  'accessToken'
   private refreshTokenKey =  'refreshToken'
   
  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  /**
   * Retrieves the stored access token.
   * @returns The access token or null if not found.
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  /**
   * Retrieves the stored refresh token.
   * @returns The refresh token or null if not found.
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  /**
   * Checks if a refresh token exists.
   * @returns True if refresh token exists, otherwise false.
   */
  hasRefreshToken(): boolean {
    return !!localStorage.getItem(this.refreshTokenKey);
  }

  /**
   * Removes both the access and refresh tokens from localStorage.
   */
  removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  
}