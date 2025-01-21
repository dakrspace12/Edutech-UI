import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Updated HttpClient module provider
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { jwtInterceptor } from './app/core/interceptors/jwt.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])), // Modern way to provide HttpClient
    importProvidersFrom(BrowserAnimationsModule), provideAnimationsAsync(), provideCharts(withDefaultRegisterables()),
  ],
}).catch(err => console.error(err));
