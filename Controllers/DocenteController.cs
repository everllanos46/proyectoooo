

using Microsoft.AspNetCore.Mvc;
using BLL;
using Entity;
using DAL;
using WebProyect.Models;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using WebProyect.Service;
using Microsoft.Extensions.Options;
using WebProyect.Config;

namespace WebProyect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class DocenteController : ControllerBase
    {
        
        private DocenteService _service;
        private ServiciosJwt _serviceJwt; 

        public DocenteController(AsignaturaContext asignaturaContext, IOptions<AppSetting> appSettings)
        {
            _service = new DocenteService(asignaturaContext);
            _serviceJwt = new ServiciosJwt(appSettings);
        }
        [Authorize]
        [HttpPost]
        public ActionResult<DocenteViewModel> GuardarDocente(DocenteInputModel docenteInputModel){
            Docente docente = Mapear(docenteInputModel);
            var Response = _service.GuardarDocente(docente);
            if(Response.Error){
                ModelState.AddModelError("Error al guardar al docente", Response.Mensaje);
                var detalleProblemas = new ValidationProblemDetails(ModelState);
                if(Response.Estado.Equals("EXISTE")){
                    detalleProblemas.Status=StatusCodes.Status302Found;
                }
                if(Response.Error.Equals("ERROR")){
                    detalleProblemas.Status=StatusCodes.Status500InternalServerError;
                }
                return BadRequest(detalleProblemas);
            }
            return Ok(Response.Docente);
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<LoginModel> Login(LoginModel login){
            var Response = _service.LoginDocente(login.User, login.Pass);
            if(Response.Error){
                ModelState.AddModelError("Error al iniciar sesión", Response.Mensaje);
                var detalleProblemas = new ValidationProblemDetails(ModelState);
                    detalleProblemas.Status=StatusCodes.Status404NotFound;
                return BadRequest(detalleProblemas);
            }
            var userResponse= _serviceJwt.GenerarToken(Response.Docente);
            return Ok(userResponse);
        }
        [Authorize]
        [HttpGet("{identificacion}")]
        public ActionResult<DocenteViewModel> BuscarDocente(string identificacion){
            var Response = _service.ConsultarDocentes();
            if(Response.Error){
                 ModelState.AddModelError("Error al buscar al docente", Response.Mensaje);
                var detalleProblemas = new ValidationProblemDetails(ModelState);
                detalleProblemas.Status=StatusCodes.Status404NotFound;
                return BadRequest(detalleProblemas);
            }
            var docente = Response.Docentes.Find(p=>p.Identificacion.Equals(identificacion));
            return Ok(docente);
        }
        [Authorize]
        [HttpDelete("{identificacion}")]
        public ActionResult<DocenteViewModel> BorrarPersona(string identificacion){
             var Response = _service.EliminarDocente(identificacion);
            if(Response.Error){
                ModelState.AddModelError("Error al consultar a las personas", Response.Mensaje);
                var detalleProblemas = new ValidationProblemDetails(ModelState);
                detalleProblemas.Status=StatusCodes.Status500InternalServerError;

                return BadRequest(detalleProblemas);
            }
            return Ok(Response);
        }
         [Authorize]
         [HttpPut("people")]
         public ActionResult<DocenteViewModel> ModificarPersona(DocenteViewModel docenteViewModel){
            Docente docente = Mapear(docenteViewModel);
            var Response = _service.EditarDocente(docente);
            if(Response.Error){
                ModelState.AddModelError("Error al modificar al docente", Response.Mensaje);
                var detalleProblemas = new ValidationProblemDetails(ModelState);
                detalleProblemas.Status=StatusCodes.Status500InternalServerError;

                return BadRequest(detalleProblemas);
            }
            return Ok(Response);
        }
        [Authorize]
        [HttpGet]
        public ActionResult<DocenteViewModel> ConsultarDocentes( ){
            var Response = _service.ConsultarDocentes();
            if(Response.Error){
                ModelState.AddModelError("Error al consultar a las personas", Response.Mensaje);
                var detalleProblemas = new ValidationProblemDetails(ModelState);
                detalleProblemas.Status=StatusCodes.Status500InternalServerError;

                return BadRequest(detalleProblemas);
            }
            return Ok(Response.Docentes.Select(d=> new DocenteViewModel(d)));
        }

        private Docente Mapear(DocenteInputModel docenteInputModel){
            var docente = new Docente{
                Identificacion=docenteInputModel.Identificacion,
                Correo=docenteInputModel.Correo,
                Nombre=docenteInputModel.Nombre,
                Apellido=docenteInputModel.Apellido,
                Ciudad=docenteInputModel.Ciudad,
                Direccion=docenteInputModel.Direccion,
                Foto=docenteInputModel.Foto,
                Pais=docenteInputModel.Pais,
                SobreDocente=docenteInputModel.SobreDocente,
                Password=docenteInputModel.Pass,
                Usuario=docenteInputModel.Usuario
            };
            return docente;
        }
    }
}