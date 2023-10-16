import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { WelcomeComponent } from './welcome/welcome.component';

const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'about',
    // component: AboutComponent,    //we can still using standalone component like this but it is not loaded lazily it is included in main bundle

    //now we can lazy load any standalone component without using forChild and module  //previously we need module to lazy load for just single component 
    loadComponent: () => import('./about/about.component').then(mod=>mod.AboutComponent)   //to load standalone component lazily
  },
  {    //lazy loading work  as expected even for modules
    path: 'dashboard',
    // loadChildren: () =>
    //   import('./dashboard/dashboard-routing.module').then(
    //     (mod) => mod.DashboardRoutingModule
    //   ),


    //without module for standalone component
    loadChildren: () =>
      import('./dashboard/routes').then(
        (mod) => mod.DASHBOARD_ROUTES
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
