import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { FooterSectionComponent } from './shared/components/footer-section/footer-section.component';
import { LoginMainComponent } from './auth/login-main/login-main.component';
import { ForgotPasswordPopupComponent } from './auth/forgot-password-popup/forgot-password-popup.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CourseEnrollmentComponent } from './modules/student/components/course-enrollment/course-enrollment.component'; // Import the component
import { MyLearningComponent } from './modules/student/components/my-learning/my-learning.component';
import { StudentsAllCoursesComponent } from './modules/student/components/my-learning/my-learning-sub-comonents/students-all-courses/students-all-courses.component';
import { StudentsMyListsComponent } from './modules/student/components/my-learning/my-learning-sub-comonents/students-my-lists/students-my-lists.component';
import { StudentsWishlistComponent } from './modules/student/components/my-learning/my-learning-sub-comonents/students-wishlist/students-wishlist.component';
import { StudentsArchivedComponent } from './modules/student/components/my-learning/my-learning-sub-comonents/students-archived/students-archived.component';
import { StudentsLearningToolsComponent } from './modules/student/components/my-learning/my-learning-sub-comonents/students-learning-tools/students-learning-tools.component';

export const routes: Routes = [
  { path: 'cyber', component: FooterSectionComponent },
  { path: 'login-main', component: LoginMainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordPopupComponent },
  { path: '', redirectTo: '/login-main', pathMatch: 'full' },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'navbar', component: NavbarComponent },
      { path: 'courses', component: CourseEnrollmentComponent },
      { 
        path: 'my-learning',
        component: MyLearningComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: StudentsAllCoursesComponent},
          { path: "my-lists", component: StudentsMyListsComponent},
          { path: "wishlist", component: StudentsWishlistComponent},
          { path: 'archived', component: StudentsArchivedComponent},
          { path: 'learning-tools', component: StudentsLearningToolsComponent}
        ]

      }
    ]
  },
  
 
  { path: '**', redirectTo: '/login' },
];
