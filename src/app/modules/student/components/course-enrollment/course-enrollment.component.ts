import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule

// Define an interface for the course object
interface Course {
  id: number;
  name: string;
  description: string;
}

@Component({
  standalone: true,
  selector: 'app-course-page',
  templateUrl: './course-enrollment.component.html',
  styleUrls: ['./course-enrollment.component.scss'],
  imports: [CommonModule, RouterModule], // Include RouterModule in the imports array
})
export class CourseEnrollmentComponent implements OnInit {
  selectedTab: string = 'all';
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  constructor() {}

  ngOnInit() {
    // Mock course data
    this.courses = [
      { id: 1, name: 'Angular Basics', description: 'Learn the basics of Angular from scratch.' },
      { id: 2, name: 'React Essentials', description: 'Master the essentials of React for web development.' },
      { id: 3, name: 'Vue.js Introduction', description: 'Get started with Vue.js for building interactive web applications.' },
      { id: 4, name: 'Node.js Basics', description: 'Understand the basics of server-side development with Node.js.' },
      { id: 5, name: 'Python for Data Science', description: 'Dive into data science using Python and its powerful libraries.' },
      { id: 6, name: 'Django for Web Development', description: 'Build robust web applications using the Django framework.' },
      { id: 7, name: 'Java Spring Boot', description: 'Develop enterprise-level applications with Spring Boot.' },
      { id: 8, name: 'Machine Learning with TensorFlow', description: 'Learn machine learning concepts and implement models with TensorFlow.' },
      { id: 9, name: 'HTML & CSS Basics', description: 'Get started with web development using HTML and CSS.' },
      { id: 10, name: 'JavaScript Fundamentals', description: 'Master the fundamentals of JavaScript for web development.' },
      { id: 11, name: 'TypeScript Deep Dive', description: 'Explore TypeScript and its features for scalable applications.' },
    ];

    this.filterCourses();
  }

  onTabClick(tab: string) {
    this.selectedTab = tab;
    this.filterCourses();
  }

  private filterCourses() {
    this.filteredCourses = this.courses; // No category filtering, show all courses
  }
}
