import { Pipe, PipeTransform } from '@angular/core';
import {planviejo} from '../models/planviejo';
@Pipe({
  name: 'historialFiltro'
})
export class HistorialFiltroPipe implements PipeTransform {

  transform(planes: planviejo[], idPlan: string) {
    return planes.filter(p=>p.codigoPlan==idPlan);
  }

}
