//pipes are the feature that are built into Angular 2 which allow us to transform output in your template
//there are pipes are for different type of the output and also for asynchronous and synchronous data
//i.e :- userName = 'Max' then using pipe we only change output of the data not the property value of userName {{ userName | uppercase }}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShortenPipe } from './shorten.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
