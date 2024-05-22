import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPipe',
  standalone: true
})
export class DataPipePipe implements PipeTransform {

  transform(value: any): any {

    const date = new Date(value);
    const formattedDate = date.toLocaleDateString('en-GB', {
     day: 'numeric', month: 'short', year: 'numeric'}
    ).replace(/ /g, '-');
    // return new Date(value).toISOString().substring(0, 10);/

    return formattedDate;
  }

}
