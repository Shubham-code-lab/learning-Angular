import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLoadServers(id: number){
    //complex calculation
    // this.router.navigate(['/servers']);   //something similar to what we do in html like [routerLink]="['users']"
    //    '/servers' is abosulte path which diffrent from 'servers'



    //redirect by passing query parameter,hash fragment
    //#loading is fragment we can only have one  http://localhost:4200/servers/5/edit?allowEdit=1#loading 
    this.router.navigate(['/servers', id, 'edit'], {queryParams:{allowEdit: '1'}, fragment:'loading'});

  }

  onLogIn(){
    this.authService.login();
  }

  onLogOut(){
    this.authService.logout();
  }

}
