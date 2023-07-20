import { Component } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options:IsActiveMatchOptions = {
    matrixParams: 'ignored',
    queryParams:'ignored',
    paths: 'subset',
    fragment: 'ignored'
  }
}
