using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Entity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebProyect.Config;
using WebProyect.Models;
using WebProyect.Controllers;

namespace WebProyect.Service
{
    public class ServiciosJwt
    {
        private readonly AppSetting _appSetting;
        public ServiciosJwt(IOptions<AppSetting> appSetting)
        {
            _appSetting = appSetting.Value;
        }

        public LoginModel GenerarToken(Docente docente)
        {
            if(docente == null)
                return null;
            
            var usuarioResponse = new LoginModel(docente);
           
            
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSetting.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, docente.Usuario.ToString()),
                    new Claim(ClaimTypes.Role, "Docente"),
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            usuarioResponse.Token = tokenHandler.WriteToken(token);

            return usuarioResponse;
        }
    }
}