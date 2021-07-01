using Entity;
namespace WebProyect.Controllers
{
    public class LoginModel
    {
        public LoginModel(Docente docente)
        {
            User=docente.Usuario;
            Pass=docente.Password;
        }
        public LoginModel()
        {
            
        }
        public string User { get; set; }
        public string Pass { get; set;}
        public string Token{get; set;}
    }
}