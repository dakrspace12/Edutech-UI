import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/authservice/auth.service';
import { TokenService } from 'src/app/core/services/tokenservice/token.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  userId: string | null = null
  firstName: string | null = null
  lastName: string | null = null
  constructor(private authService: AuthService,
    private http: HttpClient,
    private tokenService: TokenService
  ) {}
    @Input() isSidebarOpen = false;
   
  
    logout(){
      this.authService.logout();
    }
  ngOnInit() {
    this.userId = this.authService.getId();

    if (this.userId) {
      this.getUserDetails(this.userId);
    }
  }
  getUserDetails(userId: string): void {const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService}`);
    const url = `http://localhost:8080/api/v1/admin/users/${userId}`;
    this.http.get<any>(url,{ headers }).subscribe(
      (response) => {  
        const userData = response;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
      },
      (error) => {
        console.error('Error fetching user details:', error); 
      }
    );
  }
}
