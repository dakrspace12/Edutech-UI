import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.scss'
})
export class InstructorDashboardComponent implements OnInit {
  ngOnInit() {
    console.log('InstructorDashboardComponent initialized');
  }

}
