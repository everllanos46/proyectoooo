import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { environment } from '../../environments/environment';
import { planviejo } from '../models/planviejo';

const ruta = environment.ruta;

@Injectable({
  providedIn: 'root'
})
export class PlanviejoService {

  baseUrl: string;
  constructor(private http: HttpClient,
    private handleErrorService: HandleHttpErrorService,
    @Inject('BASE_URL') baseUrl: string,) {
      this.baseUrl = baseUrl;
     }

  get():Observable<planviejo[]>{
    return this.http.get<planviejo[]>(this.baseUrl+"api/PlanViejo").pipe(
      tap(()=>console.log("Consultado correctamente"))
    )
  }
}
