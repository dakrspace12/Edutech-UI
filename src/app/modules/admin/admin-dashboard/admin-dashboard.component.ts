import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  totalCourses: number;
  totalUsers: number;
  monthlyRevenue: number;
  recentActivities: string[];

  constructor() {
  
    this.totalCourses = 120;
    this.totalUsers = 4500;
    this.monthlyRevenue = 12000;
    this.recentActivities = [
      'User John Doe enrolled in "Angular Basics"',
      'New course "Advanced TypeScript" added',
      'User Jane Smith completed "React for Beginners"'
    ];
  }

  ngOnInit(): void {
    
  }
}
