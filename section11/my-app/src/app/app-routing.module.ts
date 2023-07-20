import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { AuthGuard } from "./auth-gaurd.service";
import { authChildGaurd, authDeactivateGaurd, authParentGaurd } from "./auth.guard";
import { canDeactivateGaurd } from "./servers/edit-server/can-deactivate-gaurd.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { serverResolver } from "./servers/server/server-resolver.service";


//array of rountes
const appRountes:Routes = [
    //"" is part of every route so error occur so we use configuration setting pathMatch
    // {path: '', redirectTo:"users", pathMatch: "full" },  //i think it redirect again again even if we reach server as "" is part of each route
    {path: '', component:HomeComponent },            //localHost:4200  //but as "" is first route why it won't load this homeComponent even if we visit "/anyroute" as empty "" is also part of it

    {path: 'users', component:UsersComponent,   //localHost:4200/users   //without /
      children:[
        {path: ':id/:name', component:UserComponent }, //localHost:4200/users/3/shubham   //parameters OR Dynamic segment    //:id and :name is dynamic part
      ]
    },      
    {path: 'servers',

    //DEPERICATED Angular Auth Guard :-
    //  canActivate:[AuthGuard],    //we can protect the route
    //  canActivateChild:[AuthGuard],  //only child route now are protected 
    //NEW WAY Angular Functional Guards:-
    // canActivate:[authParentGaurd],
     
     canActivateChild:[authChildGaurd],
     component:ServersComponent,
     children:[
       {
        path: ':id', component:ServerComponent,
        resolve:{anyNameServer:serverResolver}   //it will call the resolve method and retrive data is stored in the key i.e :- anyNameServer we can subscribe to this data in component
       },        //use     <router-outlet></router-outlet> as placeholer for the child component inside parent component
       {
        path: ':id/edit', component:EditServerComponent,
        // canDeactivate: [canDeactivateGaurd]
        canDeactivate: [authDeactivateGaurd]
      },
     ]
    },
    // {path: 'not-found', component:PageNotFoundComponent},
    {path: 'not-found', component:ErrorPageComponent, data:{message: "Page Not Found!"}},  //static data passing to component
    {path: '**', redirectTo:'/not-found'}
  ];

  
@NgModule({
    imports:[
        RouterModule.forRoot(appRountes)
        // RouterModule.forRoot(appRountes,{useHash:true})   //fallback to older browser for 404 return to root route
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}