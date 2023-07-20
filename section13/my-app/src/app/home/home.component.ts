import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private firstObsSubscription!: Subscription;

  private customObservable!: Subscription;
  // private
  constructor() { }

  ngOnInit() {
    //this observable is not provided by angular so need to destroy manualy otherwise new instance of this observable is created it will cause memory leak, lot of resource used slow the website
    this.firstObsSubscription = interval(1000)  //event is emitted every second
    .subscribe(count =>{ 
      console.log("using interval ",count);
    })

    // this.route.params    //params is an observable/construct/(stream of data/i.e :- route parameter) to which we subscribe to get infomation about change in data
    //observable can complete or not as :-
    //1 user clciking button we don't know when will it occur or when will user stop clicking button
    //2 http request is completed just once
    //this.route.params is obserable provided by angular we don't have unsubscribe it manually angular does it for us

    //custom Observable
    const customObsSubscription = Observable.create((observer:any)=>{
      let count = 0;
      setInterval(()=>{
        observer.next(count);
        if(count == 2)
          observer.complete();      //Obserable is complete it is unsubscribe
        if(count == 3 )
          observer.error(new Error("Count is greater than 3"));   // observable after error is cancelled we need not explicitly unsubscibe it
        count++;
      }, 1000)
    })

    //we can modify observable before we subscribe usefull when we want to change data retrived by angular provided observable i.e :- this.route.params
    const operatorsCustomObsSubscription = customObsSubscription.pipe(
      filter(                //this act same as javascript filter
        (data:number)=>{
          return data > 0;    //this will skip when data is 0 and pass rest of data when it is greater than 0 to map() operator 
        }
      ),
      map(
        (data:number)=>{
          return `Round ${data}`;
        }
      )
    )

    // this.customObservable = customObsSubscription.subscribe(   
    this.customObservable = operatorsCustomObsSubscription.subscribe(  //we are subscribing to the observable retrun by operator which will modify, filter or any other suff we want to do to data when we subscribe it
      (data: any)=>{
        console.log("using custom observer ",data);
      },
      (error:Error)=>{
        console.log(error);
        alert(error.message);
      },
      (()=>{    //we don't get any data fro complete if error occur first it don't call complete
        console.log("Completed");
      })
    )
  }

  ngOnDestroy(){
    this.firstObsSubscription.unsubscribe();
    this.customObservable.unsubscribe();
  }
}
