//problem :- 
//we got boiler plate code in our component like @component decorator, and module are getting imported into one another

//we can delete this module as no required as our app component /root component is also standalone component
//main.ts


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
// import { SharedModule } from './shared/shared.module';
// import { DetailsComponent } from './welcome/details/details.component';

@NgModule({
  declarations: [
    // AppComponent, 
    // WelcomeComponent, 
    // DetailsComponent    //no need to declare standalone component
  ],
  imports: [
    BrowserModule,
    // SharedModule,    //only detailComponent is using so we directly imported it that component

    //as detail is standalone it don't know about other component that has been imported in this import array 
    //so highlight directive which is part of the shared module it not available to it 
    // DetailsComponent           //either import  it in module //OR //import it in the component itself given that the component we import to is also standalone component

    // WelcomeComponent   
  ],
  providers: [],
  // bootstrap: [AppComponent],
})
export class AppModule {}
