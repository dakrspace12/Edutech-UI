import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/authservice/auth.service';
import { TokenService } from 'src/app/core/services/tokenservice/token.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss'
})
export class AdminNavbarComponent {
  userId: string | null = null
  firstNameInitial: string | null = null
  lastNameInitial: string | null = null
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  @Output() porfileClicked = new EventEmitter<void>();
  onCartIconClick(): void {
    this.porfileClicked.emit();
  }
  logout() {
    this.authService.logout();
    alert('User logged out successfully');
    this.router.navigate(['/login']);
  }

  

  ngOnInit() {
    this.userId = this.authService.getId();

    if(this.userId){
      this.getUserDetails(this.userId);
    }
  }


  getUserDetails(userId: string): void {
    const token = this.tokenService.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  const url = `http://localhost:8080/api/v1/admin/users/${userId}`;
  this.http.get<any>(url, { headers }).subscribe( 
    (response) => {
      if (response) {
        const userData = response;
        this.firstNameInitial = userData.firstName ? userData.firstName.charAt(0).toUpperCase() : 'N';
        this.lastNameInitial = userData.lastName ? userData.lastName.charAt(0).toUpperCase() : 'N';
  
  
      } else {
        console.error('User data is not available in the response');
        alert('Failed to retrieve user data. Please try again later.');
      }
    },
    (error) => {
      console.error('Error fetching user details:', error);
      if (error.status === 401) {
        alert('Unauthorized access. Please log in again.');
      } else if (error.status === 500) {
        alert('Server error. Please try again later.');
      } else {
        alert('Failed to fetch user details. Please try again later.');
      }
    }
  );
  }
} 
