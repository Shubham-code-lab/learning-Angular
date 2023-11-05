import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  //unlock http client angular offer in entire project
import { HTTP_INTERCEPTORS } from '@angular/common/http';  //

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth.interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  //if we have multiple interceptor we then order is important
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],//multi: true = user multiple interceptor so not remove previous one
  bootstrap: [AppComponent]
})
export class AppModule {}
