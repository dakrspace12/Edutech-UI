import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/core/services/authservice/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  constructor(private authService: AuthService) {}
    @Input() isSidebarOpen = false;
   
  
    logout(){
      this.authService.logout();
    }
}
