import { Component, OnInit } from '@angular/core';
import { Server } from '../server.model';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-gaurd.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})

export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: Server | undefined;
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const server:Server|undefined = this.serversService.getServer(+this.route.snapshot.params['id']);
    if (!server) return;
    this.server = server;
    this.serverName = this.server.name;
    this.serverStatus = this.server.status; 

    //like in users/user component we have written code for params observable we also have observable for queryParams and fragment
    //below code will have same problem it will not update/render the page again when URL changes
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.allowEdit = this.route.snapshot.queryParams['allowEdit'] === '1' ? true: false;
    // this. = this.route.snapshot.fragment;
    //queryParams and fragment observables solve this issue
    this.route.queryParams.subscribe(   //we can pass function to that update when URL changes need to reflect on page
      (queryParams: Params)=>{
        // this.allowEdit = queryParams['allowEdit']
      }
    );
    this.route.fragment.subscribe();
    //also we need to call ngOnDestroy as this observable don't get removed when component is destroy
  }

  onUpdateServer() {
    if(!this.server)return;
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate():boolean | Observable<boolean> | Promise<boolean>{
    if(!this.server)return true;

    if(!this.allowEdit){  //return if not allowed to edit
      return true;
    }
    else if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved){   //code check for service server amd this server data is same or not
      return confirm("Do you want to discard the changes");
    }
    else if(this.serverName === this.server.name && this.serverStatus === this.server.status){

        return true;
    }
    else return false;
  }
}
