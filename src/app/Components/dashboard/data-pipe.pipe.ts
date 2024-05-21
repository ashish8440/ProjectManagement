import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPipe',
  standalone: true
})
export class DataPipePipe implements PipeTransform {

  transform(value: any): any {
    return new Date(value).toISOString().substring(0, 10);
  }

}
