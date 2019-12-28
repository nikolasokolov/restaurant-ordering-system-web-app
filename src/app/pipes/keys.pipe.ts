import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keyToArray' })
export class KeyToArrayPipe implements PipeTransform {
  transform(obj: object, args: any[] = null): any {
    const array = [];
    Object.keys(obj).forEach(key => {
      array.push({
        value: obj[key],
        key
      });
    });
    return array;
  }
}
