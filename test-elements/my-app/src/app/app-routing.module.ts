import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectMulticast1Component } from './subject-multicast1/subject-multicast1.component';
import { SubjectMulticast2Component } from './subject-multicast2/subject-multicast2.component';
import { ElementComponent } from './element/element.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.component').then((m) => m.HomeModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'subject1',
    component: SubjectMulticast1Component
  },
  {
    path: 'subject2',
    component: SubjectMulticast2Component
  },
  {
    path: 'element',
    component: ElementComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
