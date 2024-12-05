import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lpaCtc'
})
export class LpaCtcPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(value: number, format: string = 'lpa'): string {
    if (format === 'ctc') {
      return '₹' + (value / 100000).toFixed(2) + ' CTC'; // Convert to Lakhs and add 'CTC'
    } else if (format === 'lpa') {
      return '₹' + (value / 100000).toFixed(2) + ' LPA'; // Convert to Lakhs and add 'LPA'
    } else {
      return value.toString(); // Default behavior, just return the value
    }
  }

}
