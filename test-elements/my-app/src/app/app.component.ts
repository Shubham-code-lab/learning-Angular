import { Component, OnInit } from '@angular/core';
import { SubjectMulticastService } from './subject-multicast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'template-outlet';

  constructor(private subjectMulticastService:SubjectMulticastService){}

  ngOnInit(): void {
    this.subjectMulticastService.multiCastSubject.next(`${Math.ceil(Math.random()*10 + 1)}`);  
  }

  updateSubject(){
    this.subjectMulticastService.multiCastSubject.next(`${Math.ceil(Math.random()*10 + 1)}`);  
  }
}
