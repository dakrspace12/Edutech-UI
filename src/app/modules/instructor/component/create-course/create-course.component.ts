import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from 'src/app/core/services/authservice/auth.service';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export class CreateCourseComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: AuthService,
  ) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submitForm(){
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;  // ✅ Fix: Correctly getting form data

      this.apiService.postData(formData).subscribe({
        next: (response) => {
          alert('Course posted successfully')
          console.log('Course posted successfully', response);
        },
        error: (error) => {
          alert('Error posting data')
          console.error('Error posting data', error);
        }
      });
    }
  }
  goBack() {
    console.log('Back button clicked');
  }

}
