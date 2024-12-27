import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password-popup-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule
  ],
  templateUrl: './forgot-password-popup-admin.component.html',
  styleUrls: ['./forgot-password-popup-admin.component.scss']
})
export class ForgotPasswordPopupAdminComponent {
  @Output() close = new EventEmitter<void>();
  email: string = '';
  mobile: string = '';
  selectedOption: string = 'email';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const payload = {
      email: this.selectedOption === 'email' ? this.email : null,
      mobile: this.selectedOption === 'mobile' ? this.mobile : null
    };

    this.http.post('http://your-backend-endpoint/api/forgot-password', payload)
      .subscribe(response => {
        console.log('Password reset link sent!', response);
        this.closePopup();
      }, error => {
        console.error('Error sending reset link', error);
      });
  }

  closePopup() {
    this.close.emit();
  }
}
