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
  roles: string[];
}

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  searchFilter: string = 'All'; 
  searchPlaceholder: string = 'Get All User Data';
  searchTerm: string = '';
  users: User[] = []; 
  filteredUsers: User[] = []; 

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.filteredUsers = [...this.users];
  }

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
    const url = 'http://localhost:8080/api/v1/users';

    this.http.get<any>(url, { headers }).subscribe(
      (response) => {
        if (response &&  response.data && Array.isArray(response.data)) {
          this.users = response.data.filter((user:User) => {
            return user.roles && user.roles.includes('ROLE_USER');
          }
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

  updatePlaceholder(){
    switch (this.searchFilter) {
      case 'All':
        this.searchPlaceholder = 'Get All User Data';
        break;
      case 'name':
        this.searchPlaceholder = 'Search by Name';
        break;
      case 'id':
        this.searchPlaceholder = 'Search by ID';
        break;
      case 'username':
        this.searchPlaceholder = 'Search by Username';
        break;
      case 'email':
        this.searchPlaceholder = 'Search by Email';
        break;
      case 'mobile':
        this.searchPlaceholder = 'Search by Mobile';
        break;
      default:
        this.searchPlaceholder = '';
    }
  }
  onSearch() : void{
    const searchTermLower = this.searchTerm.toLowerCase();
    switch (this.searchFilter) {
      case 'All':
        this.filteredUsers = [...this.users];
        break;
      case 'name':
        this.filteredUsers = this.users.filter(user =>
          user.username.toLowerCase().includes(searchTermLower)
        );
        break;
      case 'id':
        this.filteredUsers = this.users.filter(user =>
          user.id.toString().includes(this.searchTerm)
        );
        break;
      case 'username':
        this.filteredUsers = this.users.filter(user =>
          user.username.toLowerCase().includes(searchTermLower)
        );
        break;
      case 'email':
        this.filteredUsers = this.users.filter(user=>
          user.email.toLowerCase().includes(this.searchTerm)
        );
        break;
      case 'mobile':
        this.filteredUsers = this.users.filter(user =>
          user.mobileNo.toLowerCase().includes(this.searchTerm)
        );
        break;
      default:
        this.filteredUsers = [...this.users];
    }
    if(this.filteredUsers.length === 0){
      alert('User not found');
      this.filteredUsers = [...this.users];
    }
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
    const url = `http://localhost:8080/api/v1/users/${userId}`;
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