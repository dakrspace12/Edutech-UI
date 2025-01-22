import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/authservice/auth.service';

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
    console.log('Decoded User ID:', this.userId);

    if(this.userId){
      this.getUserDetails(this.userId);
    }
  }


  getUserDetails(userId: string): void {
    const url = `http://localhost:8080/api/v1/users/${userId}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        const userData = response.data;
        this.firstNameInitial = userData.firstName ? userData.firstName.charAt(0).toUpperCase() : 'N';
        this.lastNameInitial = userData.lastName ? userData.lastName.charAt(0).toUpperCase() : 'N';
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
