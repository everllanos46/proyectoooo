import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { planviejo } from '../models/planviejo';
import { PlanviejoService} from '../services/planviejo.service';
import { HistorialFiltroPipe } from '../pipe/historial-filto.pipe';
@Component({
  selector: 'app-tabla-historial',
  templateUrl: './tabla-historial.component.html',
  styleUrls: ['./tabla-historial.component.css']
})
export class TablaHistorialComponent implements OnInit {

  planesViejos : planviejo[]
  codigoPlan : string;
  
  constructor(private planviejoSerice: PlanviejoService, private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.codigoPlan=this.routeActive.snapshot.params.codigo;
    this.get();
  }

  get(){
    this.planviejoSerice.get().subscribe(resultado=>{
      if(resultado!=null){
        this.planesViejos=resultado;
      }
    })
  }

}
