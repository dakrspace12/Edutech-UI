import { Component } from '@angular/core';
import { AdminDashboardComponent } from 'src/app/modules/admin/admin-dashboard/admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { FooterSectionComponent } from '../footer-section/footer-section.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [FooterSectionComponent,RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
