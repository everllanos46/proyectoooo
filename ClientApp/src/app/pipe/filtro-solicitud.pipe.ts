import { Pipe, PipeTransform } from '@angular/core';
import { Solicitud } from '../models/solicitud';

@Pipe({
  name: 'filtroSolicitud'
})
export class FiltroSolicitudPipe implements PipeTransform {

  transform(solicitudes: Solicitud[], estado : string) {
    if(estado == "NO REVISADO") return solicitudes.filter(r=>r.estado=="NO REVISADO")
    if(solicitudes.filter(d=>d.estado).length==0) return null;
    return solicitudes.filter(d=>d.estado)
  }

}
