import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';

// import {RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import {AppRoutingModule} from './app-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-gaurd.service';
import { canDeactivateGaurd } from './servers/edit-server/can-deactivate-gaurd.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { serverResolver } from './servers/server/server-resolver.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // RouterModule.forRoot(appRountes)            //to let angular know about routing
    AppRoutingModule                     //cleaner way to mantain routes in other files for ease of reading
  ],
  providers: [ServersService, AuthService, AuthGuard, canDeactivateGaurd, serverResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
