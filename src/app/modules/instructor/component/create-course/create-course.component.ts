import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export class CreateCourseComponent {
  title: string = '';
  description: string = '';

  goBack() {
    console.log('Back button clicked');
  }

  saveAndNext() {
    console.log('Form saved:', { title: this.title, description: this.description });
  }
}
