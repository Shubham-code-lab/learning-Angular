//name start with @ are decrator

import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: "[appBasicHighlight]"    //can be used as an attibute on element
})

export class BasicHighlightDirective{
//1] Directly changing element value using DOM manipulation   
    // constructor(private elementRef: ElementRef){   //ElementRef  //will select the element on which this directive attribute is created through injection
    // }
    
    // ngOnInit(){
    //     this.elementRef.nativeElement.style.backgroundColor = "green";   //not good to access element directly
    // }


//2]
    //better approach //angular also work along with service worker were we don't have access to DOM so renderer2 help us with it to apply style instead of apply directly by above method
    /*
    constructor(private elementRef: ElementRef, private renderer: Renderer2){   //ElementRef  //will select the element on which this directive attribute is created though injection
    }

    ngOnInit(){
        // this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "blue");  //inital color
    }
    //OR
//2]    
    @HostBinding('style.backgroundColor') varBackgroundColor:string = "blue";   //initial color //will not work set initial color for this variable in ngOnInit


//3]    
    @HostListener('mouseenter')  anyNameMethod1(eventData: Event){
        // this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "yellow");  //using  render2
        this.varBackgroundColor = "yellow";   //using hostBinding
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
    @HostBinding('style.backgroundColor') varBackgroundColor:string | any;   //initial color is set in ngOnInit as element is render in DOM
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