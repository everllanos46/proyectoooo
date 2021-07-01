import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Docente } from '../models/docente';
import { environment } from '../../environments/environment';
import { Asignatura } from '../models/asignatura';


const ruta = environment.ruta;
@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  baseUrl: string;
  constructor(private http: HttpClient,
    private handleErrorService: HandleHttpErrorService,
    @Inject('BASE_URL') baseUrl: string,) {
      this.baseUrl = baseUrl;
     }

    get():Observable<Asignatura[]>{
      return this.http.get<Asignatura[]>(this.baseUrl+"api/Asignatura").pipe(
        tap(()=>console.log("Consultado correctamente"))
      )
    }

    modify(asignatura: Asignatura){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
      return this.http.put(this.baseUrl+"api/Asignatura"+"/asignatura", asignatura, httpOptions).pipe(
        tap(()=>console.log("Modificado correctamente"))
      )
    }

    delete(codigo: String){
      return this.http.delete(this.baseUrl+"api/Asignatura"+"/"+codigo).pipe(
        tap(()=>console.log("Eliminado correctamente"))
      )
    }
}
