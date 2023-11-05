import { enableProdMode } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import { environment } from './environments/environment';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AnalyticsService } from './app/shared/analytics.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent,
  // {
  //   providers: [AnalyticsService]     //as we are not using app-module anymore we can provide it in main.ts
  // }
);



//we don't need module we need module as root component is standalone

// platformBrowserDynamic().bootstrapModule(AppModule)
  // .catch(err => console.error(err));
