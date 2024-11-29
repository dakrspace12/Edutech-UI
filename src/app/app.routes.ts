import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';

// Define the routes
export const routes: Routes = [
  // Route for the login page
  { path: 'login', component: LoginComponent },

  // Route for the register page
  { path: 'register', component: RegisterComponent },

  // Default route to redirect to login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Route for the layout with child routes (dashboard in this case)
  {
    path: 'layout',
    component: LayoutComponent,  // Assuming you have a LayoutComponent
    children: [
      { path: 'dashboard', component: DashboardComponent }  // Nested route for dashboard
    ]
  },

  // Catch-all route for unknown paths, redirecting to login
  { path: '**', redirectTo: '/login' }
];
