import { Component, OnInit } from '@angular/core';

@Component({
  //we can have any css selector id and pesudo class are not supported
  // selector: 'app-servers',
  //OR
  selector:'[app-servers]',   //css attribute selector


  // WE CAN WRITE THE HTML HERE USING template option 
  templateUrl: './servers.component.html',
  //OR
  // template:`
  // <app-server></app-server>
  // <h6>template</h6>
  // <app-server></app-server>`,

  //we can aloos write css directly here
  styleUrls: ['./servers.component.css']
  //OR
  // styles:[`
  // h6{
  //   background-color:red
  // }
  // `]
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = "No server created";
  serverName = "";
  serversArray = ["server 1", "server 2"];

  constructor(){
    setTimeout(()=>{
      this.allowNewServer = true;
    },
    2000)
  }

  onCreateServer(){
    this.serverCreationStatus = "server is created  " + this.serverName;
    this.serversArray.push("server " + this.serversArray.length+1);
  }

  onUpdateServerName(event:Event){
    if(event.currentTarget instanceof HTMLInputElement){
      this.serverName = event.currentTarget.value;
    }
  }

  ngOnInit(){

  }
}
