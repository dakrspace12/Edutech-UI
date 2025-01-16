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
    private router: Router
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
}
