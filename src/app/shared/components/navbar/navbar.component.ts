import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authservice/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  constructor(private authService: AuthService, private router: Router,
    private http: HttpClient
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

  data: any[]=[];
  loggedInUser: any = {};

  getUserName(){
    const loggedInUserId = 1;
    this.http.get(`http://localhost:8080/api/v1/users`).subscribe((response: any) => {
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