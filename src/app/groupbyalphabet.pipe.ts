import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupbyalphabet'
})
export class GroupbyalphabetPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
