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
    ]
  },
  { path: '**', redirectTo: '/login' }
];