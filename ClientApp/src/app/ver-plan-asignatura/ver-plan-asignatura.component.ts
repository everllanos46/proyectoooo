import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Asignatura } from '../models/asignatura';
import { PlanAsignatura } from '../models/plan-asignatura';
import { Unidad } from '../models/unidad';
import { PlanasignaturaService } from '../services/planasignatura.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AsignaturaService } from '../services/asignatura.service';
import { AlertModalComponent } from '../@base/alert-modal/alert-modal.component';

@Component({
  selector: 'app-ver-plan-asignatura',
  templateUrl: './ver-plan-asignatura.component.html',
  styleUrls: ['./ver-plan-asignatura.component.css']
})
export class VerPlanAsignaturaComponent implements OnInit {

  planAsignatura : PlanAsignatura= new PlanAsignatura();
  asignatura : Asignatura;
  unidades: string[];
  titulosUnidades: string[]=[];
  contenidosGral: string[]= [];
  Unidades: Unidad[]=[]
  unidad:Unidad;


  constructor(private router: Router, private routeActive: ActivatedRoute, private planAsignaturaService : PlanasignaturaService,private modalService: NgbModal,private asignaturaService : AsignaturaService ) { 
    
  }
  ID=''
  abrir(){
    this.router.navigateByUrl('/solicitud/'+this.ID);
  }
  ngOnInit(): void {
    var contenidoTemp;
    this.asignatura= new Asignatura();
    const id=this.routeActive.snapshot.params.codigoAsignatura;
    this.ID=id
    this.planAsignaturaService.searchAsignatura(this.ID).subscribe(resultado=>{
      if(resultado!=null){
        this.planAsignatura=resultado;   
        this.asignatura=this.planAsignatura.asignatura
        this.unidades=(this.planAsignatura.contenido.split(";"))
        this.unidades.forEach(u=>{
          this.unidad=new Unidad();
          this.unidad.titulo=u.split(":")[0];
          contenidoTemp=u.split(":")[1];
          this.unidad.contenido=contenidoTemp.split(".");
          this.Unidades.push(this.unidad);
        })
      }
    })
    
    
  }

  delete(){
    this.asignaturaService.delete(this.planAsignatura.asignatura.codigo).subscribe(resultado=>{
      if(resultado!=null){
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Info: Plan Eliminado';
        this.router.navigate(['/asignaturas'])
      }
    }
    )
  }


  

}

