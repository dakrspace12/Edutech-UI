import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly ACCESS_TOKEN_KEY = 'token'; // Key for the access token in storage
  private readonly REFRESH_TOKEN_KEY = 'refreshToken'; // Key for the refresh token in storage

  constructor() {}

  /**
   * Stores the access and refresh tokens in localStorage.
   * @param accessToken - The access token.
   * @param refreshToken - The refresh token.
   */
  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Retrieves the stored access token.
   * @returns The access token or null if not found.
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Retrieves the stored refresh token.
   * @returns The refresh token or null if not found.
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Checks if a refresh token exists.
   * @returns True if refresh token exists, otherwise false.
   */
  hasRefreshToken(): boolean {
    return !!this.getRefreshToken();
  }

  /**
   * Removes both the access and refresh tokens from localStorage.
   */
  removeTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Checks if the current access token is valid by decoding its expiration time.
   * @returns True if the token is valid, false otherwise.
   */
  isAccessTokenValid(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
      const currentTime = Math.floor(new Date().getTime() / 1000); // Current time in seconds
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  /**
   * Decodes and retrieves the user role from the access token payload.
   * @returns The user's role or null if token is missing or invalid.
   */
  getUserRoleFromToken(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
      return payload.role || null;
    } catch (error) {
      return null;
    }
  }
}