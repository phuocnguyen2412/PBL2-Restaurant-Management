using Microsoft.AspNetCore.Mvc;
using PBL2.Models;
using System;
using System.Data.SqlClient;
using System.Text;

namespace PBL2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string SimpleHash(string input)
        {
            const int prime = 31; 
            long hash = 0;

            foreach (char c in input)
            {
                hash = (hash * prime) + c ;
            }

            return hash.ToString();
        }

        private User GetIdFromDatabase(string username, string hashpassword)
        {
            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand("SELECT MaNV, ChucVu FROM [Users] Join [NhanVien] On [NhanVien].Id = [Users].MaNV WHERE Username = @Username AND Password = @Password", con))
                {
                    cmd.Parameters.AddWithValue("@Username", username);
                    cmd.Parameters.AddWithValue("@Password", hashpassword);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            int MaNV = reader.GetInt32(reader.GetOrdinal("MaNV"));
                            string ChucVu = reader.GetString(reader.GetOrdinal("ChucVu"));
                            return new User { MaNV = MaNV , ChucVu = ChucVu};
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }
        [HttpPost]
        [Route("Auth")]
        public IActionResult Auth(User model)
        {
            try
            {
                string hashedPassword = SimpleHash(model.Password);
                var user = GetIdFromDatabase(model.Username, hashedPassword);

                if (user != null)
                {
                    return Ok(new { MaNV = user.MaNV, ChucVu = user.ChucVu , Message = "1" });
                }
                else
                {
                    return Unauthorized(new { Message = "0" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("ChangePassword")]
        public IActionResult ChangePassword(User model)
        {
            try
            {
                if (model.Password.Length < 8)
                {
                    return BadRequest(new { Message = "Mật khẩu phải có ít nhất 8 ký tự" });
                }
            
                string hashedPassword = SimpleHash(model.Password);
         
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    con.Open();
                    string sql = "UPDATE [Users] SET Password = @Password WHERE MaNV = @MaNV";
                    using (SqlCommand cmd = new SqlCommand(sql, con))
                    {
                        cmd.Parameters.AddWithValue("@Password", hashedPassword);
                        cmd.Parameters.AddWithValue("@MaNV", model.MaNV);

                        cmd.ExecuteNonQuery();
                    }
                }

                return Ok(new { Message = "Đổi mật khẩu thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}