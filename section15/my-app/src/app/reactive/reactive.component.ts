import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, AbstractControl,AsyncValidatorFn,ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  genders = ['male', 'female'];
  //Form is just Group of control/FormGroup
  signupForm!:FormGroup;
  forbiddenNames:Array<string>=["shubham","jeevan"];

  ngOnInit(){
    //initilaize before the component is rendered
    this.signupForm = new FormGroup({ //Control are key value pair
      //FormControl accept couple of argument 
      //first :- inital value/state
      //second:- single validator/Array of validator
      //third:-  async validator/Array of async validator
      "userData": new FormGroup({          //nesting formGroup
        // 'username': new FormControl(null, Validators.required),
        'username': new FormControl(null, [Validators.required,this.validateForbiddenName.bind(this)]),
        'email': new FormControl(null, 
          [
            Validators.required, 
            Validators.email,
            // this.testv,
             this.forbiddenEmails,
            // this.forbiddenEmailsValidator,
           // this.forbiddenEmails2,

          ],
          ),
      }),
      'gender': new FormControl('male'),   //radio button is also value
      'hobbies': new FormArray([]) 
    });

    //Status and value changes
    this.signupForm.valueChanges.subscribe(
      (value)=>{console.log("valueChanges", value)}
    )
    this.signupForm.statusChanges.subscribe(
      (status)=>{console.log("statusChanges", status)}
    )

    //pre-fill form using setValues 
    this.signupForm.setValue({   //we ommit some value if we want
      'userData':{
        'username':"Saurabh",
        'email':"shubham@gmail.com",
      },
      'gender': 'female',
      'hobbies': []
    })
  }

  onSubmit(){
    console.log(this.signupForm);
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getHobbies(){
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  validateForbiddenName(control: FormControl):{[s:string]:boolean} | null{
    if(this.forbiddenNames.includes(control.value)){
      return {"nameIsForbidden":true};
    }
    return null;    //nothing or null
  }

  isValidName(): boolean {
    return this.signupForm.get('userData.username')?.errors?.['nameIsForbidden'] || false;
  }

  isNameRequired():boolean{
    return this.signupForm.get('userData.username')?.errors?.['required'] || false;
  }

  forbiddenEmails(control: AbstractControl): Promise<any> | Observable<any> { 
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  forbiddenEmails2(control: FormControl): Promise<any> | Observable<any> {   //not working
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  forbiddenEmailsValidator(): AsyncValidatorFn {  //not working
    return (control: AbstractControl): Promise<ValidationErrors | null> =>
    {
      return new Promise( (resolve, reject) => {
        setTimeout(() => {
          if(control.value === 'test@test.com') {
            resolve({'emailIsForbidden': true});
          }
          else {
            resolve(null);
          }
        }, 3000);
      });
    }
  }

  testv(control: AbstractControl) {
    console.log("testv",control.value);
    if(control.value === 'test@test.com') {
      return {'emailIsForbidden': true};
    }
    else {
      return null;
    }
  }

}
