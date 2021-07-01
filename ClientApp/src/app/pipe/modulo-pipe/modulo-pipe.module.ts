import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FiltroSolicitudPipe} from '../filtro-solicitud.pipe';
import { HistorialFiltroPipe } from '../historial-filto.pipe';


@NgModule({
  declarations: [FiltroSolicitudPipe, HistorialFiltroPipe],
  exports:[FiltroSolicitudPipe, HistorialFiltroPipe],
  imports: [
    CommonModule
  ]
})
export class ModuloPipeModule { }
