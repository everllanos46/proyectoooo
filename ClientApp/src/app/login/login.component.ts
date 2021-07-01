import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DocentesService, Login } from '../services/docentes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../@base/alert-modal/alert-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login : Login
  @Output() eventLogin= new EventEmitter<boolean>();
  constructor(private docenteService: DocentesService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.login = new Login()
    var userCurrency = sessionStorage.getItem('userCurrency')
    if (userCurrency != null) {
      this.router.navigate(["/dashboard"])
    }
  }

  logueo(){
    this.docenteService.login(this.login).subscribe(r=>{
      if(r!=null){
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.cuerpo = 'Info: Sesión iniciada correctamente!';
        this.eventLogin.emit(true);
        this.router.navigate(["/dashboard"])
        
      } 
    })
  }

}
