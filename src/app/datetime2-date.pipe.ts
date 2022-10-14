import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime2Date'
})
export class Datetime2DatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): Date {
    console.log(value)
    return new Date(value.seconds * 1000);
  }

}
