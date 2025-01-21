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
    RouterModule
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss'
})
export class AdminNavbarComponent {
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

  data: any[] = [];
  loggedInUser: any = {};
  

  ngOnInit() {
    this.getLoggedInUserId();
  }



  getLoggedInUserId() {
    const accessToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    console.log(`new token ${accessToken}`);

    this.http.get('http://localhost:8080/api/v1/users', { headers }).subscribe(
      (response: any) => {
        // Check if response contains the data array
        if (response && response.data) {
          // Extract all IDs from the data array
          const userIds = response.data.map((user: any) => user.id);
          console.log('All User IDs:', userIds);
          this.getUserName(userIds)

          // You can now use `userIds` for further processing
        } else {
          console.error('Unexpected response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );

    // this.http.get('http://localhost:8080/api/v1/users', { headers }).subscribe((response: any) => {
    //   const loggedInUserId = response.id;
    //   console.log(loggedInUserId);
    //   // this.getUserName(loggedInUserId);
      
    // });
  }

  getUserName(loggedInUserId: number) {
    this.http.get(`http://localhost:8080/api/v1/users/${loggedInUserId}`).subscribe((response: any) => {
      console.log(response);
      this.data = response.data;
      this.loggedInUser = this.data.find(user => user.id === loggedInUserId);
      if (this.loggedInUser) {
        console.log(`First Name: ${this.loggedInUser.firstName}, Last Name: ${this.loggedInUser.lastName}`);
      } else {
        console.log('User not found');
      }
    });
  }
}
