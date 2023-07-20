//name start with @ are decrator

import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: "[appBasicHighlight]"    //can be used as an attibute on element
})

export class BasicHighlightDirective{
    // constructor(private elementRef: ElementRef){   //ElementRef  //will select the element on which this directive attribute is created
    // }
    
    // ngOnInit(){
    //     this.elementRef.nativeElement.style.backgroundColor = "green";
    // }



    //better approach //angular also work along with service worker were we don't have access to DOM so renderer2 help us with it
    /*
    constructor(private elementRef: ElementRef, private renderer: Renderer2){   //ElementRef  //will select the element on which this directive attribute is created
    }

    ngOnInit(){
        // this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "blue");  //inital color
    }

    @HostBinding('style.backgroundColor') varBackgroundColor:string = "blue";   //iniial color

    @HostListener('mouseenter')  anyNameMethod1(eventData: Event){
        // this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "yellow");
        this.varBackgroundColor = "yellow";
    }

    @HostListener('mouseleave')  anyNameMethod2(eventData: Event){
        // this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "red");
        this.varBackgroundColor = "red";
    }
    */


    //custom event binding on custom directive
    @Input('appBasicHighlight') defaultColor:string | any;   //if alias name is same as selector name then we can directly set value appBasicHighlight = "blue" in property 
    @Input() onHoverColor:string | any;   // no default value
    @Input() onSettleColor:string = "Red";    //defalt value is blue
    @HostBinding('style.backgroundColor') varBackgroundColor:string | any;   //iniial color in ngOnInit
    constructor(private elementRef: ElementRef, private renderer: Renderer2){   //ElementRef  //will select the element on which this directive attribute is created
    }

    ngOnInit(){
        // this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "blue");  //inital color
        this.varBackgroundColor = this.defaultColor;
    }

    @HostListener('mouseenter')  anyNameMethod1(eventData: Event){
        // this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "yellow");
        this.varBackgroundColor = this.onHoverColor;
    }

    @HostListener('mouseleave')  anyNameMethod2(eventData: Event){
        // this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "red");
        this.varBackgroundColor = this.onSettleColor;
    }
}