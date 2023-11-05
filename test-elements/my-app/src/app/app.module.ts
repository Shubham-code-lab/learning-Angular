import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './shared/ui/table/table.component';
import { SubjectMulticast1Component } from './subject-multicast1/subject-multicast1.component';
import { SubjectMulticast2Component } from './subject-multicast2/subject-multicast2.component';
import { ElementComponent } from './element/element.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectMulticast1Component,
    SubjectMulticast2Component,
    ElementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
