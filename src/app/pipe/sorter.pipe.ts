import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: any[], key: string, direction: string = 'up'): any[] {
    if(!Array.isArray(value) || !key){
      return value;
    }
    return value.sort((a, b) => {
      if(typeof a[key]==='number' && typeof b[key]==='number'){
          if(direction == 'up')
            return a[key]-b[key];
          else
            return b[key]-a[key];
      } else {
          if(direction == 'up')
            return String(a[key]).toLowerCase().localeCompare(String(b[key]).toLowerCase());
          else
            return String(b[key]).toLowerCase().localeCompare(String(a[key]).toLowerCase());
      }
    });
  }

}
