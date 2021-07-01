import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Principal',  icon: 'design_app', class: '' },
    { path: '/docentes', title: 'Docentes',  icon:'users_single-02', class: '' },
    { path: '/asignaturas', title: 'Asignaturas',  icon:'location_map-big', class: '' },
    { path: '/registrar', title: 'Registrar Docentes',  icon:'users_single-02', class: '' },
    { path: '/registrarAsignatura', title: 'Registrar Asignatura',  icon:'users_single-02', class: '' },
    { path: '/verSolicitudes', title: 'Ver Solicitudes',  icon:'users_single-02', class: '' }
];

export const ROUTE: RouteInfo[] = [
  { path: '/login', title: 'Principal',  icon: 'design_app', class: '' },
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    var userCurrency = sessionStorage.getItem('userCurrency')
    if (userCurrency != null) {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }else{
      this.menuItems= ROUTE.filter(menuItem => menuItem);
    }
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };

  llenarSide(){
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }


}
