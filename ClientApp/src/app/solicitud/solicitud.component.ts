import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalComponent } from '../@base/alert-modal/alert-modal.component';
import { PlanAsignatura } from '../models/plan-asignatura';
import { Solicitud } from '../models/solicitud';
import { PlanasignaturaService } from '../services/planasignatura.service';
import { SolicitudService } from '../services/solicitud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AsignaturaService } from '../services/asignatura.service';
import { Docente } from '../models/docente';





@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  form1: boolean = true;
  form2: boolean = true;
  form3: boolean = true;
  form4: boolean=true;
  planAsignatura : PlanAsignatura = new PlanAsignatura();
  plan: PlanAsignatura = new PlanAsignatura();
  solicitud : Solicitud = new Solicitud();
  docente : Docente;
  
  constructor(private routeActive: ActivatedRoute, private planAsignaturaService:PlanasignaturaService, private router: Router, private solicitudService : SolicitudService, private modalService: NgbModal 
   ,private asignaturaService : AsignaturaService ) { }

  ngOnInit(){
    this.docente=JSON.parse(sessionStorage.getItem('userCurrency'))
    const id=this.routeActive.snapshot.params.codigoPlan;
    this.planAsignaturaService.searchAsignatura(id).subscribe(resultado=>{
      if(resultado!=null){
        this.planAsignatura=resultado;
        this.plan=this.planAsignatura
      }
    })
  }

 

  guardar(){
    this.solicitud.planSolicitud=this.plan;
    this.solicitud.estado="NO REVISADO";
    this.solicitud.solicitante=this.docente.identificacion
    this.solicitudService.post(this.solicitud).subscribe(resultado=>{
      if(resultado!=null){
        this.solicitud=resultado;
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Info: Solicitud registrada';
      }
    });
  }

  delete(){
    this.asignaturaService.delete(this.plan.asignatura.codigo).subscribe(resultado=>{
      if(resultado!=null){
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Info: Plan Eliminado';
        this.router.navigate(['/asignaturas'])
      }
    }
    )
  }

  bandera(){
    this.form1 = !this.form1;
  }
  bandera2(){
    this.form2 = !this.form2;
  }
  bandera3(){
    this.form3=!this.form3;
  }
  bandera4(){
    this.form4=!this.form4;
  }

}
