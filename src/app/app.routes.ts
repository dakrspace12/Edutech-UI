import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { FooterSectionComponent } from './shared/components/footer-section/footer-section.component';
import { LoginMainComponent } from './auth/login-main/login-main.component';
import { ForgotPasswordPopupComponent } from './auth/forgot-password-popup/forgot-password-popup.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CourseEnrollmentComponent } from './modules/student/components/course-enrollment/course-enrollment.component'; 
import { CourseContentComponent } from './modules/student/components/course-content/course-content.component';
import { StudentsMyListsComponent } from './modules/student/components/my-learning/my-learning-sub-comonents/students-my-lists/students-my-lists.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';
import { StudentsLearningToolsComponent } from './modules/student/components/my-learning/my-learning-sub-comonents/students-learning-tools/students-learning-tools.component';
import { StudentsArchivedComponent } from './modules/student/components/my-learning/my-learning-sub-comonents/students-archived/students-archived.component';
import { StudentsWishlistComponent } from './modules/student/components/my-learning/my-learning-sub-comonents/students-wishlist/students-wishlist.component';
import { StudentsAllCoursesComponent } from './modules/student/components/my-learning/my-learning-sub-comonents/students-all-courses/students-all-courses.component';
import { MyLearningComponent } from './modules/student/components/my-learning/my-learning.component';
import { HomeSectionComponent } from './modules/student/components/home-section/home-section.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ManageCoursesComponent } from './modules/admin/components/manage-courses/manage-courses.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { ManageUsersComponent } from './modules/admin/components/manage-users/manage-users.component';
import { InstructorLayoutComponent } from './shared/components/instructor-layout/instructor-layout.component';
import { AccountSettingsComponent } from './modules/admin/components/account-settings/account-settings.component';
import { AdminSidebarComponent } from './modules/admin/components/admin-sidebar/admin-sidebar.component';
import { RoleGuard } from './core/guards/role.guard';
import { MessagesComponent } from './modules/student/components/sidebar-component/messages/messages.component';
import { InstructorDashboardComponent } from './modules/instructor/instructor-dashboard/instructor-dashboard.component';
import { CreateCourseComponent } from './modules/instructor/component/create-course/create-course.component';
import path from 'path';


export const routes: Routes = [
  { path: 'cyber', component: FooterSectionComponent },
  { path: 'login-main', component: LoginMainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordPopupComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: '/login-main', pathMatch: 'full' },

  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['ROLE_USER'] },
    children: [
      { path: 'dashboard', component: HomeSectionComponent },
      { path: 'navbar', component: NavbarComponent },
      { path: 'courses', component: CourseEnrollmentComponent },
      { path: 'courses/:id', component: CourseContentComponent },
      {
        path: 'my-learning',
        component: MyLearningComponent,
        canActivate: [authGuard],
        children: [
          { path: '', component: StudentsAllCoursesComponent },
          { path: 'my-lists', component: StudentsMyListsComponent },
          { path: 'wishlist', component: StudentsWishlistComponent },
          { path: 'archived', component: StudentsArchivedComponent },
          { path: 'learning-tools', component: StudentsLearningToolsComponent }
        ],
      },
      { path: 'messagess', component: MessagesComponent }
     ],
  },
  {
    path: 'admin-layout',
    component: AdminLayoutComponent,
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['ROLE_ADMIN'] },
    children: [

      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'manage-courses', component: ManageCoursesComponent },
      { path: 'manage-users', component: ManageUsersComponent }
    ],
  },
  {
    path: 'instructor-layout', 
    component: InstructorLayoutComponent,
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['ROLE_INSTRUCTOR'] }, 
    children: [
   {path:'', component: InstructorDashboardComponent},
    { path: 'create-courses', component: CreateCourseComponent }
    ]},
  { path: '**', redirectTo: '/login' }, 
];