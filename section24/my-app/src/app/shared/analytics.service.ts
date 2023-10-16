import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })   
//OR
//as we are not using app-module anymore we can provide it in main.ts


export class AnalyticsService {
  registerClick() {
    console.log('Clicked!');
  }
}
