import { Component } from '@angular/core';


//@component is decorator
@Component({
  selector: 'app-root',     //selector porperty which assign a string as value //used in index.html file
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
