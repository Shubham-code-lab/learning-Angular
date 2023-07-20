import { 
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges, 
  DoCheck, 
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild, 
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated  //default css style are scoped  i.e:- p{css} only for this component p[ngcontnet_gap_2] as it attach this attibute to the element and only aply to those
  // encapsulation: ViewEncapsulation.None  //global css applied  i.e:- p{css}  for all component p tag get the css
  // encapsulation: ViewEncapsulation.Native  //shadow dom behaviour
})
export class ServerElementComponent implements 
OnInit,
OnChanges,
DoCheck, 
AfterContentInit, 
AfterContentChecked, 
AfterViewInit, 
AfterViewChecked,
OnDestroy {
  // @Input() element!: {name:string, content:string, type:string};     //decorator that allow parent component to bind to this property
  //OR
  @Input("aliasNameElement") element!: {name:string, content:string, type:string};     //decorator that allow parent component to bind to this property
  @Input() name!:string;
  @ViewChild("heading", { static: false }) header!:ElementRef;   //when we can access see below
  @ContentChild('contentParagraph', {static: false}) contentPara!: ElementRef;     //where we can access as it is content project in this component by parent

  constructor(){
    console.log("Constructor is called run whenerver for each time this component is initilaize");
  }
  ngOnInit(): void {
    console.log("ng OnInit run after Construcor is executed every time");
    console.log("accessing DOM element", this.header.nativeElement.textContent);    //error
    console.log("accessing DOM element", this.contentPara.nativeElement.textContent);    //error
  }
  ngOnChanges(chages:SimpleChanges){
    console.log("ngOnChanges called after contructor and later everytime when @Input data changed");
    console.log("ngOnChanges changes object contain old value and new value of changed value",chages);
  }
  ngDoCheck(){
    console.log("ngDoCheck called after ngOnInit and later when angular check for any changes [i.e promise return, button click, or any changes]");
  }
  ngAfterContentInit(): void {
    console.log("ngAfterContentInit run only once when our content is project using ng-content");
    console.log("accessing DOM element", this.contentPara.nativeElement.textContent);
  }
  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked run  after ngAfterContentInit and also during change detection cycle similar to ngDoCheck");
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit run only once after ngAfterContentChecked");
    console.log("accessing DOM element", this.header.nativeElement.textContent);
  }
  ngAfterViewChecked(){
    console.log("ngAfterViewChecked run once after ngAfterViewInit and also during change detection cycle similar to ngDoCheck");
  }
  ngOnDestroy(): void {
    console.log("ngOnDestroy called when one of this component is destoryed");
  }
}
