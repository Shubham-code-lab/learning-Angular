//Custom Pipe
//also add this pipe in the app module declaration

import { Pipe, PipeTransform } from "@angular/core";

//we can use this name to use this pipe
@Pipe({
    name: 'shorten'
})

export class ShortenPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {    //parameterized pipe we can also omit the second argument
        let newStr = value;
        if(value.length > args[0])
            newStr = value.substr(0,10) + '...';  //start at index 0 and 10 character 
        return newStr;
    }
}