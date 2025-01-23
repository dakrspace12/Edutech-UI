import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

   private accessTokenKey =  'accessToken';
   private refreshTokenKey =  'refreshToken';
   /**
   * Stores both the access and refresh tokens in localStorage.
   * @param accessToken The access token to store.
   * @param refreshToken The refresh token to store.
   */
   
  storeTokens(accessToken: string, refreshToken: string): void {
    try{
  
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    } catch (error){
      console.error('Error storing tokens in localStorage:', error);
    }
  }

  /**
   * Retrieves the stored access token.
   * @returns The access token or null if not found.
   */
  getAccessToken(): string | null {
    try {
    const token = localStorage.getItem(this.accessTokenKey);
    console.log('Retrieved access token:', token); 
    return token;
  }catch (error){
    console.error('Error retrieving access token from localStorage', error);
    return null;
  }
}

  /**
   * Retrieves the stored refresh token.
   * @returns The refresh token or null if not found.
   */
  getRefreshToken(): string | null {
    try{
    const token= localStorage.getItem(this.refreshTokenKey);
    console.log('Retrieved refresh token:', token);  
    return token;
  } catch (error) {
    console.error('Error retrieving refresh token from localStorage:', error);
    return null;
  }
  }

  /**
   * Checks if a refresh token exists.
   * @returns True if refresh token exists, otherwise false.
   */
  hasRefreshToken(): boolean {
    try{
    const hasToken= !!localStorage.getItem(this.refreshTokenKey);
    console.log('Has refresh token:', hasToken); 
    return hasToken;
  }    catch (error) {
    console.error('Error checking refresh token existence:', error);
    return false;
  }
  }
  /**
   * Removes both the access and refresh tokens from localStorage.
   */
  removeTokens(): void {
    try{
    console.log('Removing tokens from localStorage.');
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  } catch (error) {
    console.error('Error removing tokens from localStorage:', error);
  }

}
}