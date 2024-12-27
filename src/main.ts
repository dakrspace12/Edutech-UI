import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/core/app.component';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Updated HttpClient module provider
import { routes } from './app/core/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { jwtInterceptor } from './app/shared/interceptors/jwt.interceptor';
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])), // Modern way to provide HttpClient
    importProvidersFrom(BrowserAnimationsModule), provideAnimationsAsync(),
  ],
}).catch(err => console.error(err));
