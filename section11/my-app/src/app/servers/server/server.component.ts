import { Component, OnDestroy, OnInit } from '@angular/core';
import { Server } from '../server.model';
import { ServersService } from '../servers.service';
import { Subscription } from 'rxjs';
import { Router, Params, ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: Server|undefined;
  paramsSubscription!:Subscription; 
  
  constructor(private serversService: ServersService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {

    //Using resolver and Observable
    this.route.data.subscribe(
      (data: Data)=>{
        this.server = data['anyNameServer'];    //using the resolver  the anyNameServer key is named we define a key in app-router module of this component
      }
    );

    //OR  it same logic code to get server from the route but diffrent technique.

    //Using route params and Observabe
    // let server:Server | undefined = this.serversService.getServer(+this.route.snapshot.params['id']);  //make sure to type convert as it return string 
    // this.paramsSubscription = this.route.params.subscribe(   //the funtion passed inside execute when params changed which is async
    //   (params:Params)=>{  //pamams is same as this.route.snapshot.params
    //     this.server = this.serversService.getServer(+params['id']);  
    //   }
    // );  
    // if(!server)return;
    // this.server = server;
  }

  onEdit(){
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling:"preserve"});  //merge will merge current and previous params  //while preserve will keep it   
  }

  ngOnDestroy(){  
    this.paramsSubscription.unsubscribe();
  }

}
