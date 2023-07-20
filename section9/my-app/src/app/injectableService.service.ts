import { Injectable } from "@angular/core";

@Injectable()

export class InjectableService{
    simpleLog(){
        console.log('This is an injectable service');
    }
}