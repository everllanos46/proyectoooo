import { Component, OnInit } from '@angular/core';

import { Docente } from '../models/docente';
import { DocentesService } from '../services/docentes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../@base/alert-modal/alert-modal.component';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  docente: Docente
  constructor(private docenteService: DocentesService, private modalService: NgbModal, private router: Router) { }

  
  ngOnInit() {
    this.docente=JSON.parse(sessionStorage.getItem('userCurrency'))
    
  }

  delete(identificacion:String){
    this.docenteService.delete(identificacion).subscribe(resultado=>{
      if(resultado!=null){
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Info: Se ha eliminado un docente';
        this.router.navigate(['/login'])
      }
    }
    )
  }

  modify(){
    this.docenteService.modify(this.docente).subscribe(resultado=>{
      if(resultado!=null){
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Info: Se ha modificado un docente';
        sessionStorage.setItem('userCurrency', JSON.stringify(this.docente))
      }
    })
  }

}
