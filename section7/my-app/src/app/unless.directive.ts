import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";


@Directive({
    selector:'[appUnless]'
})

export class UnlessDirective{
    @Input() set appUnless(condition: boolean) {   //appunless same name used as selector
        if(!condition){
            this.vcRef.createEmbeddedView(this.templateRef);  //create view in this view contianer
        }
        else{
            this.vcRef.clear();
        }
    }

    //give access to tempalte tag <ng-tempalte>
                                     //what                           //where          
    constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef){

    }
}

