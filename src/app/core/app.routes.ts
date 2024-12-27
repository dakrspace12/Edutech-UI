import { Routes } from '@angular/router';
import { LoginComponent } from '../shared/features/auth/login/login.component';
import { RegisterComponent } from '../shared/features/auth/register/register.component';
import { DashboardComponent } from '../shared/components/dashboard/dashboard.component';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';

import { LoginMainComponent } from '../shared/features/auth/login-main/login-main.component';

import { ForgotPasswordPopupComponent } from '../shared/features/auth/forgot-password-popup/forgot-password-popup.component';


// Define the routes
export const routes: Routes = [
  //Route for the Login-main-page
  {path: '', component: LoginMainComponent},
  // Route for the login page
  { path: 'login', component: LoginComponent },

  // Route for the register page
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordPopupComponent},

  // Default route to redirect to login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  //pop for forgot password

  { path: 'forgot-password', component: ForgotPasswordPopupComponent },

  // Route for the layout with child routes (dashboard in this case)
  {
    path: 'layout',
    component: LayoutComponent,  // Assuming you have a LayoutComponent
    canActivate: [AuthGuard],  // Protect layout route
    children: [
      { path: 'dashboard', component: DashboardComponent }  // Nested route for dashboard
    ]
  },

  // Catch-all route for unknown paths, redirecting to login
  { path: '**', redirectTo: '/login' }
];
