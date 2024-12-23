import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {
  transform(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      // Limita el texto a la longitud máxima y agrega puntos suspensivos
      return text.substr(0, maxLength) + '...';
    }
  }
}
