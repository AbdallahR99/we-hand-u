import { Pipe, PipeTransform } from '@angular/core';
import { replaceMultiple } from '../utils/replace-multiple';

@Pipe({
  name: 'mdReplacement',
  standalone: true,
})
export class MdReplacementPipe implements PipeTransform {
  transform(
    value: string | object | undefined,
    keysToReplace: string[] = [],
    replaceWith: string[] = []
  ): string | object | undefined {
    // debugger;
    if (!value) {
      return value;
    }
    if (typeof value === 'object') {
      return value;
    }
    if (!keysToReplace.length) {
      return value;
    }
    if (!replaceWith.length) {
      return value;
    }
    if (keysToReplace.length !== replaceWith.length) {
      return value;
    }
    if (typeof value === 'string') {
      return replaceMultiple(value, keysToReplace, replaceWith);
      const regex = new RegExp(keysToReplace.join('|'), 'g');
      value = value?.toString()?.replace(regex, (matched) => {
        const index = keysToReplace.indexOf(matched);
        return replaceWith[index];
      });
    }
    return value;
  }
}
