import { Component } from '@angular/core';
import { DetailsComponent } from './details/details.component';

@Component({
  imports: [DetailsComponent],       //as detail component is also standalone component we have to make this component standalone to use that other component
  standalone: true,
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {}
