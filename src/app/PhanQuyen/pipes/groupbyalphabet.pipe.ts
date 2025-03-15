import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupByAlphabet' })
export class GroupByAlphabetPipe implements PipeTransform {
  transform(items: any[], key: string): { letter: string, items: any[] }[] {
    if (!items || !key) return [];
    const groups = items.reduce((result, item) => {
      const letter = item[key].charAt(0).toUpperCase();
      if (!result[letter]) { result[letter] = []; }
      result[letter].push(item);
      return result;
    }, {} as { [letter: string]: any[] });
    return Object.keys(groups).sort().map(letter => ({ letter, items: groups[letter] }));
  }
}
