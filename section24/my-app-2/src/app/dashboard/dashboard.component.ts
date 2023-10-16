import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],  //to get access to routerLink in template file
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
