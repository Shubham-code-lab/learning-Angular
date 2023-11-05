import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// root component used in index.html while other other are used in app.component.html 
import { AppComponent } from './app.component';
//normal compenent
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';   //no extension as typescript knows what extension to find

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]           
})
export class AppModule { }
