import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//it is a library package that give state management solution for managing our app wide state (state = date used in one or more component)
//may be used instead of the complex state in components or services

//SELECTOR (Optional):- reading and extracting data from the store
//ACTION :- to store data in the store we need to dispatch action 
//REDUCER :- action are picked up by reducer which contain logic to change the data in the store
//EFFECTS :- side-effect that should olso trigger when ACTION occur (which is occur when we not only want to change date from the store but also make i.e :- HTTP request to change data from the server)

export class AppComponent {

}
