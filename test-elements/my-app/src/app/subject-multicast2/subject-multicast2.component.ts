import { Component,OnDestroy,OnInit } from '@angular/core';
import { SubjectMulticastService } from '../subject-multicast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-multicast2',
  templateUrl: './subject-multicast2.component.html',
  styleUrls: ['./subject-multicast2.component.css']
})
export class SubjectMulticast2Component implements OnInit, OnDestroy {

  private subscription!: Subscription;

  constructor(private subjectMulticastService:SubjectMulticastService){}

  ngOnInit(): void {
    console.log("ngOnInit of Subject2");
    //there subject that emit value on next() in app-component. But at that point subject-multicast1 and subject-multicast2 which are  are not being initialized
    //as component is not being created and ngOnInit has not being called so we are not subscribing to that emit of next() we don't see his console log 
    
    //In case Behavior subject it already has initial value and if we call next() inside app-component it initial value is updated so as soon as the component is initialized we get the last value of next() emitted

    //subject as soon as it next() all of them get the same value if they are being subscribe and not unsubscribe
    //if component is visited twice two subscriber are being created so assuming that they are not unsubscribe in ngOnDestroy they both get same value and execute. even when there component is destroyed even when we are on different route/component


    //THINK this way  :-
    //BehaviorSubject give last value so as soon as we subscribe we have the value the subscriber is executed and give us the value.
    //Subject we only get value as soon as next() is called and also we are subscribing not unsubscribing to it. not on any other time(like behavior subject do [as soon as we subscribe in ngOnInt we get value])


    //Remember to destroy them both as they will sit in memory
    this.subscription = this.subjectMulticastService.multiCastSubject.subscribe(data=>{
      console.log("subject2",data);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
