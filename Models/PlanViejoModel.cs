using System;
using System.Collections.Generic;
using Entity;

namespace WebProyect.Models
{
    public class PlanViejoInputModel
    {
        public String CodigoPlanViejo{ get; set;}
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

    public class PlanViejoViewModel : PlanViejoInputModel{ 
        public PlanViejoViewModel()
        {
            
        }

        public PlanViejoViewModel(PlanViejo planViejo)
        {
            CodigoPlanViejo=planViejo.CodigoPlanViejo;
            Asignatura=planViejo.Asignatura;
            CodigoPlan=planViejo.CodigoPlan;
            Descripcion=planViejo.Descripcion;
            ObjetivoGeneral=planViejo.ObjetivoGeneral;
            ObjetivosEspecificos=planViejo.ObjetivosEspecificos;
            Estrategias=planViejo.Estrategias;
            Presentacion=planViejo.Presentacion;
            Contenido=planViejo.Contenido;
            Metodologias=planViejo.Metodologias;
            CompetenciasEspecificas=planViejo.CompetenciasEspecificas;
            CompetenciasGrales=planViejo.CompetenciasGrales;
            Justificacion=planViejo.Justificacion;
        }
    }
}