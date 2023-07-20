import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage:string= "";
  constructor(private route:ActivatedRoute){}
  ngOnInit(){
    this.errorMessage = this.route.snapshot.data['message'];
    this.route.data.subscribe(   //current code data is not going to change as we passed literal string so this is just example
      (data:Data)=>{      //if the data we know is going to change we can also do this
        this.errorMessage = data['message'];
      }
    )
  }
}
