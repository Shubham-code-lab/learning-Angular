import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated:boolean = false;
  subjectObservable!: Subscription;

  constructor(private userService:UserService) {}

  ngOnInit() {
    this.subjectObservable = this.userService.activatedEmitter.subscribe(
      (didActivate:boolean)=>{
        this.userActivated = didActivate;
      }
    )
  }

  ngOnDestroy(): void {
    this.subjectObservable.unsubscribe();
  }
}
