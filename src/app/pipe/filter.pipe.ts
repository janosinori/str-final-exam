import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], phrase: string, key: string = ''): any {
    if(!Array.isArray(value) || !phrase || !key){
      return value;
    }
    if(Number(phrase)){
      return value.filter(item => Number(item[key]) == Number(phrase));
    } else {
      phrase = phrase.toLowerCase();
      return value.filter(item => String(item[key]).toLowerCase().includes(phrase));
    }
  }
}
