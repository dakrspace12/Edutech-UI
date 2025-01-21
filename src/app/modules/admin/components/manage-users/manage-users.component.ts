import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {
  searchTerm: string = '';
  users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com' }
  ];
  filteredUsers = [...this.users];

  onSearch() {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.id.toString().includes(this.searchTerm) ||
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onView(userId: number) {
    alert('Viewing details for User ID: ' + userId);
  }

  onUpdate(userId: number) {
    alert('Updating User ID: ' + userId);
  }

  onDelete(userId: number) {
    alert('Deleted User ID: ' + userId);
    this.users = this.users.filter(user => user.id !== userId);
    this.filteredUsers = [...this.users];
  }
}
