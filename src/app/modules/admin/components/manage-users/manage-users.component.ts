import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/core/services/tokenservice/token.service';
interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobileNo: string;
  roles: Role[];
  userId: number;
}

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  searchTerm: string = '';
  users: User[] = []; 
  filteredUsers: User[] = []; 

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const token = this.tokenService.getAccessToken();
    if (!token) {
      alert('User is not authenticated. Please log in again.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = 'http://localhost:8080/api/v1/admin/users';

    this.http.get<User[]>(url, { headers }).subscribe(
      (response) => {
        if (response && Array.isArray(response)) {
          this.users = response.filter(user => 
            user.roles.some(role => role.name === 'ROLE_USER')
        );
          this.filteredUsers = [...this.users];
        } else {
          console.error('Invalid user data in response');
          alert('Failed to fetch users. Please try again later.');
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
        if (error.status === 401) {
          alert('Unauthorized access. Please log in again.');
        } else if (error.status === 500) {
          alert('Server error. Please try again later.');
        } else {
          alert('Failed to fetch users. Please try again later.');
        }
      }
    );
  }

  onSearch() : void{
    this.filteredUsers = this.users.filter(
      (user) =>
        user.id.toString().includes(this.searchTerm) ||
        user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.mobileNo.includes(this.searchTerm)
    );
  }

  onView(userId: number):void {
    alert('Viewing details for User ID: ' + userId);
  }

  onUpdate(userId: number):void {
    alert('Updating User ID: ' + userId);
  }

  onDelete(userId: number):void {
    const token = this.tokenService.getAccessToken();
    if (!token) {
      alert('User is not authenticated. Please log in again.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/admin/users/${userId}`;
    this.http.delete(url, { headers }).subscribe(
      () => {
    this.users = this.users.filter(user => user.id !== userId);
    this.filteredUsers = [...this.users];
    alert('User successfully deleted!');
  },
  (error) => {
    console.error('Error deleting user:', error);
    alert('Failed to delete user. Please try again later.');
  }
);
  }
}