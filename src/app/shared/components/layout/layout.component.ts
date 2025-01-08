import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // To enable the router outlet
import { MatSidenavModule } from '@angular/material/sidenav'; // For the layout structure
import { MatToolbarModule } from '@angular/material/toolbar'; // For the header toolbar
import { MatButtonModule } from '@angular/material/button'; // For any buttons in the layout
import { MatIconModule } from '@angular/material/icon'; // For icons in the toolbar
import { FooterSectionComponent } from '../footer-section/footer-section.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { StudentDashboardComponent } from 'src/app/modules/student/student-dashboard/student-dashboard.component';
import { HomeSectionComponent } from '../home-section/home-section.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule, 
    MatSidenavModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    FooterSectionComponent,
    NavbarComponent,
    StudentDashboardComponent,
    HomeSectionComponent
    
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'] 
})
export class LayoutComponent {}
