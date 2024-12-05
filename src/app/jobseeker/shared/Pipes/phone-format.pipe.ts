import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (value && value.startsWith('+91')) {
      // Remove any existing hyphens
      value = value.replace(/-/g, '');
      
      // Add a hyphen after the +91 prefix
      value = value.replace('+91', '+91-');
    }
    return value;
  }
}
