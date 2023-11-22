import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  @ViewChild('formElement') signUpForm!: NgForm;


  onSubmit(formElement: NgForm) {
    console.log(formElement);
    console.log("on submit");
  }

  // onSubmit(){
  //   console.log(this.signUpForm);
  // }
}
