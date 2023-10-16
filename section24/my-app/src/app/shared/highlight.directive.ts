import { Directive, ElementRef } from '@angular/core';

@Directive({
  //as this is standalone component we remove it form shared module both declaration and export now we directly add it in other standalone component 
  standalone: true, //directive and pipe can also be standalone
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = '#5f5aee';
    this.element.nativeElement.style.color = 'black';
    this.element.nativeElement.style.padding = '0.5rem';
  }
}
