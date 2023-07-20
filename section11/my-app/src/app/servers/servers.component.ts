import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService, private router:Router, private route: ActivatedRoute) {
    //ActivatedRoute inject the current active route 
    //i.e :- the route that loaded this component 
   }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onPageReload(){
    //  /servers = absoulte path
    //  servers = relative path   //problem :- on same page we don't get error
    //for relative path routerLink attribute directive gives error becuase it try to add /servers/servers     //P.S :- i am not able to generate the error
    //navitate() doesn't know which url path we are on so it don't give error 

    this.router.navigate(['servers'], {relativeTo: this.route});  
    //relativeTo by default it is root domain so we don't get error
    //by setting configuration setting  curretly URL given by ActivatedRoute we now get error for relative path
  }

}
