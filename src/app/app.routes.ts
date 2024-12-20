import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';

import { LoginMainComponent } from './pages/login-main/login-main.component';

import { ForgotPasswordPopupComponent } from './pages/forgot-password-popup/forgot-password-popup.component';


// Define the routes
export const routes: Routes = [
  //Route for the Login-main-page
  {path: 'login-main', component: LoginMainComponent},
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
