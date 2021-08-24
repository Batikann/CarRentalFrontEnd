import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'filterCar',
})
export class FilterCarPipe implements PipeTransform {
  transform(value: CarDetailDto[], filterCar: string): CarDetailDto[] {
    filterCar = filterCar ? filterCar.toLocaleLowerCase() : '';
    return filterCar
      ? value.filter(
          (c) => c.carName.toLocaleLowerCase().indexOf(filterCar) !== -1
        )
      : value;
  }
}
