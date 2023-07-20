import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit, OnDestroy {
  user?: {id: number, name: string};
  paramsSubscription!:Subscription; 
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id:this.route.snapshot.params['id'],           //retriving dynamic part from the url   //localHost:4200/users/3/shubham  
      name:this.route.snapshot.params['name']
    };


    //[routerLink]="['/users', 10, 'Anna']"    //absolute path
    //when we are on same page and our page don't reinitialize because page is already rendered even when our dynamic params changes
    //because we can't pause code to wait for when the params changes somthing similar to click event
    //Observable are feature added by third party package but used by angular which allow us to work with asyncronic task
    //observable easy way to subscribe to some event which is async
    //the subscribe contain async function that execute when params change
    //below is only used we know compoenent we are on will loaded witin the component such as link click which load same component with diffrent data otherwise just snapshot is okay
    this.paramsSubscription = this.route.params.subscribe(   //the funtion passed inside execute when params changed which is async
      (params:Params)=>{  //pamams is same as this.route.snapshot.params
        if(this.user){
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      }
    );
  }

  ngOnDestroy(){  
    //Route Observable subscribstion stay in memory even when component is destroyed so we have to explicitly destroy it
    this.paramsSubscription.unsubscribe();
  }

}

//query parameter
//hash segment


