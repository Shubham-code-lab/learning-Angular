import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubjectMulticastService } from '../subject-multicast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-multicast1',
  templateUrl: './subject-multicast1.component.html',
  styleUrls: ['./subject-multicast1.component.css']
})
export class SubjectMulticast1Component implements OnInit , OnDestroy{

  private subscription!: Subscription;

  constructor(private subjectMulticastService:SubjectMulticastService){}

  ngOnInit(): void {
    console.log("ngOnInit of Subject1");
    this.subscription = this.subjectMulticastService.multiCastSubject.subscribe(data=>{
      console.log("subject1",data);
    })
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
