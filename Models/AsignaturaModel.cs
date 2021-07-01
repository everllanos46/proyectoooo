using System;
using Entity;
using System.ComponentModel.DataAnnotations;

namespace WebProyect.Models
{
    public class AsignaturaInputModel
    {
        [Required(ErrorMessage = "El código es requerido")]
        public String Codigo { get; set; }
        [Required(ErrorMessage = "El nombre de la asignatura es requerido")]
        public String NombreAsignatura { get; set; }
        [Required(ErrorMessage = "El número de créditos es requerido")]
        public int Creditos { get; set; }
        [Required(ErrorMessage = "El programa académico es requerido")]
        public String ProgramaAcademico { get; set; }
        [Required(ErrorMessage = "HDD es requerido")]
        public int HDD { get; set; }
        [Required(ErrorMessage = "HTP es requerido")]
        public int HTP { get; set; }
        [Required(ErrorMessage = "HTI es requerido")]
        public int HTI { get; set; }
        public int HTT { get; set; }
        public String Prerequisitos { get; set; }
        public String Corequisitos { get; set; }
        [Required(ErrorMessage = "Departamento Oferente es requerido")]
        public String DepartamentoOferente { get; set; }
        [Required(ErrorMessage = "Tipo de asignatura es requerido")]
        public String TipoAsignatura { get; set; }
        [CamposValidation(ErrorMessage="Habilitable debe ser SI o NO")]
        public String Habilitable { get; set; }
        [CamposValidation(ErrorMessage="Validable debe ser SI o NO")]
        public String Validable { get; set; }
        [CamposValidation(ErrorMessage="Homologable debe ser SI o NO")]
        public String Homologable { get; set; }
    }

    public class CamposValidation : ValidationAttribute{ 
        protected override ValidationResult IsValid(object value, ValidationContext context){
            if(value.ToString().ToUpper().Equals("SI") || value.ToString().ToUpper().Equals("NO") ){
                return ValidationResult.Success;
            }else{ 
                return new ValidationResult(ErrorMessage);
            }
        }
    }

    public class AsignaturaViewModel : AsignaturaInputModel
    {
        public AsignaturaViewModel()
        {
            
        }

        public AsignaturaViewModel(Asignatura asignatura)
        {
            Codigo = asignatura.Codigo;
            NombreAsignatura= asignatura.NombreAsignatura;
            Creditos= asignatura.Creditos;
            ProgramaAcademico= asignatura.ProgramaAcademico;
            HDD= asignatura.HDD;
            HTT= asignatura.HTT;
            HTP= asignatura.HTP;
            HTI= asignatura.HTI;
            Prerequisitos= asignatura.Prerequisitos;
            Corequisitos= asignatura.Corequisitos;
            DepartamentoOferente= asignatura.DepartamentoOferente;
            TipoAsignatura= asignatura.TipoAsignatura;
            Habilitable= asignatura.Habilitable;
            Validable= asignatura.Validable;
            Homologable= asignatura.Homologable;
        }
    }
}