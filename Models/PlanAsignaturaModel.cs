using System;
using System.Collections.Generic;
using Entity;

namespace WebProyect.Models
{
    public class PlanAsignaturaInputModel
    {
        public String CodigoPlan{get; set;}
        public Asignatura Asignatura{get; set;}
        public String Descripcion { get; set; }
        public String Presentacion { get; set; }
        public String Justificacion { get; set; }
        public String CompetenciasGrales { get; set; }
        public String CompetenciasEspecificas { get; set; }
        public String Metodologias { get; set; }
        public String  Contenido { get; set; }
        public String ObjetivoGeneral { get; set; }
        public String ObjetivosEspecificos {get; set;}
        public String Estrategias { get; set; }
    }

    public class PlanAsignaturaViewModel : PlanAsignaturaInputModel
    {
        public PlanAsignaturaViewModel()
        {
            
        }


        public PlanAsignaturaViewModel(PlanAsignatura planAsignatura)
        {
            Asignatura=planAsignatura.Asignatura;
            CodigoPlan=planAsignatura.CodigoPlan;
            Descripcion=planAsignatura.Descripcion;
            ObjetivoGeneral=planAsignatura.ObjetivoGeneral;
            ObjetivosEspecificos=planAsignatura.ObjetivosEspecificos;
            Estrategias=planAsignatura.Estrategias;
            Presentacion=planAsignatura.Presentacion;
            Contenido=planAsignatura.Contenido;
            Metodologias=planAsignatura.Metodologias;
            CompetenciasEspecificas=planAsignatura.CompetenciasEspecificas;
            CompetenciasGrales=planAsignatura.CompetenciasGrales;
            Justificacion=planAsignatura.Justificacion;
        }
    }
}