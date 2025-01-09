import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/core/services/authservice/auth.service';

@Component({
  selector: 'app-sidebar-component',
  standalone: true,
  imports: [ MatIconModule,],
  templateUrl: './sidebar-component.component.html',
  styleUrl: './sidebar-component.component.scss'
})
export class SidebarComponentComponent {
  constructor(private authService: AuthService) {}
  @Input() isSidebarOpen = false;
 

  logout(){
    this.authService.logout();
  }
  
}
