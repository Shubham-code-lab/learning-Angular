//we no longer need dashboard-module and dashboard-routing anymore

import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { TodayComponent } from "./today/today.component";

export const DASHBOARD_ROUTES: Route[] = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'today',
        component: TodayComponent,
        //OR if you want to lazy load that component
        // loadComponent: () => import('./today/today.component').then(mod=>mod.TodayComponent) 
    }
];