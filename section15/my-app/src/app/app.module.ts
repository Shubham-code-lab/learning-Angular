import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  //template driven approach

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponent } from './reactive/reactive.component';
import { TemplateComponent } from './template/template.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'reactive', component: ReactiveComponent },
  { path: 'template', component: TemplateComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,  //template driven approach
    ReactiveFormsModule   //required for reactive form to work
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
