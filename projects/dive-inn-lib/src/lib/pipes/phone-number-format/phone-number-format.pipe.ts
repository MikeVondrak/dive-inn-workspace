import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFormat'
})
export class PhoneNumberFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
