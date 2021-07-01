using Microsoft.AspNetCore.Mvc;
using BLL;
using Entity;
using DAL;
using WebProyect.Models;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace WebProyect.Controllers
{
    [Authorize]
     [Route("api/[controller]")]
    [ApiController]
    public class PlanViejoController : ControllerBase
    {

        private PlanAsignaturaService _planAsignaturaService;

        public PlanViejoController(AsignaturaContext asignaturaContext)
        {
            _planAsignaturaService = new PlanAsignaturaService(asignaturaContext);
        }

        [HttpGet]
        public ActionResult<PlanViejoViewModel> ConsultarPlanesViejos( ){
            var Response = _planAsignaturaService.ConsultarPlanViejo();
            if(Response.Error){
                ModelState.AddModelError("Error al consultar a las asignaturas", Response.Mensaje);
                var detalleProblemas = new ValidationProblemDetails(ModelState);
                detalleProblemas.Status=StatusCodes.Status500InternalServerError;

                return BadRequest(detalleProblemas);
            }
            return Ok(Response.PlanesViejos.Select(p=> new PlanViejoViewModel(p)));
        }


        
    }
}