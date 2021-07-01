import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Docente } from '../models/docente';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';



const ruta = environment.ruta;
@Injectable({
  providedIn: 'root'
})
export class DocentesService {


  baseUrl: string;
  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;
  constructor(private http: HttpClient,
    
    private handleErrorService: HandleHttpErrorService,
    @Inject('BASE_URL') baseUrl: string,) {
    this.baseUrl = baseUrl;
    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(sessionStorage.getItem('userCurrency')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  post(docente: Docente): Observable<Docente> {
    debugger
    return this.http.post<Docente>(this.baseUrl + "api/Docente", docente).pipe(tap(
      _ => this.handleErrorService.log("Datos Registrados")
    ), catchError(this.handleErrorService.handleError<Docente>("Docente Registrado", null)))
  }

  

  login(login: Login): Observable<Login> {
    return this.http.post<Login>(this.baseUrl + "api/Docente/Login", login).pipe(tap(a => {
      this.handleErrorService.log("Datos Registrados")
      sessionStorage.setItem("userCurrency", JSON.stringify(a))
    }
    ), catchError(this.handleErrorService.handleError<Login>("Docente Registrado", null)))
  }

  search(identificacion: String) {
    return this.http.get<Docente>(this.baseUrl + "api/Docente/" + identificacion).pipe(
      tap(() => console.log("Buscado correctamente"))
    )
  }

  get(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.baseUrl + "api/Docente").pipe(
      tap(() => console.log("Consultado correctamente"))
    )
  }

  delete(identificacion: String) {
    return this.http.delete(this.baseUrl + "api/Docente" + "/" + identificacion).pipe(
      tap(() => console.log("Eliminado correctamente"))
    )
  }

  modify(docente: Docente) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put(this.baseUrl + "api/Docente" + "/people", docente, httpOptions).pipe(
      tap(() => console.log("Modificado correctamente"))
    )
  }

  public get currentUserValue(): Login {
    return this.currentUserSubject.value;
  }


}
export class Login {
  user: string
  pass: string
  token : string
}
