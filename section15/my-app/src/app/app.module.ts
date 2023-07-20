import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';  //template driven approach

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,  //template driven approach
    ReactiveFormsModule   //reuqired for reactive form to work
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
