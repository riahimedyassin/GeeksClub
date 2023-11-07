import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone:true
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, type : 'sm' | 'md' | 'lg' = 'sm'): string {
        return value.substring(0,type=='sm' ? 20 : type=='md' ? 40 : 60)+" . . . "
  }

}
