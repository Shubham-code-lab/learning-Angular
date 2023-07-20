import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,   //default true now pipe get recalculated when data (i.e :- servers array of app component when we click onAddServer to add server to the servers array) changes which can cost lot of performance
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {     //value is servers
    if(value.length === 0){  //value can be dataType
      return value;
    }
    console.log(value);
    const resultArray = [];
    for(const item of value){
      if(item[propName] === filterString)
        resultArray.push(item);
    }
    return resultArray;
  }

}
