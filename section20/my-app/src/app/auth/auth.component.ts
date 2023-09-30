import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService,authResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading:boolean;
  error:string | null = null;
  

  constructor(private authService: AuthService, private router:Router){
    this.isLoading = false;
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm:NgForm){
    if(!authForm.valid)return;

    this.isLoading = true;
    const password = authForm.value.password;
    const email  = authForm.value.email;

    let authObs: Observable<authResponseData>;

    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }
    else{
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe({
        next: (responseData:authResponseData)=>{
          console.log(responseData);
          this.isLoading = false;
          this.router.navigate(['recipes']);
        },
        error: (errorMessage)=>{
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      }
    );

    authForm.reset();
  } 
}
