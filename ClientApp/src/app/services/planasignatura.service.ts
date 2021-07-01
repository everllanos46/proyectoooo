import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { environment } from '../../environments/environment';
import { PlanAsignatura } from '../models/plan-asignatura';


const ruta = environment.ruta;
@Injectable({
  providedIn: 'root'
})
export class PlanasignaturaService {

  baseUrl: string;
  constructor(private http: HttpClient,
    private handleErrorService: HandleHttpErrorService,
    @Inject('BASE_URL') baseUrl: string,) {
      this.baseUrl = baseUrl;
     }

    post(planAsignatura : PlanAsignatura) : Observable<PlanAsignatura> {
      return this.http.post<PlanAsignatura>(this.baseUrl+"api/PlanAsignatura",planAsignatura).pipe(tap(
        _=>this.handleErrorService.log("Plan registrado")),
        catchError(this.handleErrorService.handleError<PlanAsignatura>("Plan registrado",null))
        )
    }

    get():Observable<PlanAsignatura[]>{
      return this.http.get<PlanAsignatura[]>(this.baseUrl+"api/PlanAsignatura").pipe(
        tap(()=>console.log("Consultado correctamente"))
      )
    }

    searchAsignatura(codigo: String): Observable<PlanAsignatura>{
      return this.http.get<PlanAsignatura>(this.baseUrl+"api/Asignatura/"+codigo).pipe(
        tap(()=>console.log("Buscado correctamente"))
      )
    }

    search(codigo: String): Observable<PlanAsignatura>{
      return this.http.get<PlanAsignatura>(this.baseUrl+"api/PlanAsignatura/"+codigo).pipe(
        tap(()=>console.log("Buscado correctamente"))
      )
    }

    modify(planAsignatura: PlanAsignatura){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
      return this.http.put(this.baseUrl+"api/Asignatura"+"/asignatura", planAsignatura, httpOptions).pipe(
        tap(()=>console.log("Modificado correctamente"))
      )
    }


}
