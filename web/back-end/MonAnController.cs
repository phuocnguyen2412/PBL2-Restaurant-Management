using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL2.Models;
using System.Data.SqlClient;
using System.Data;

namespace PBL2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonAnController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public MonAnController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        SqlConnection connString;
        SqlCommand cmd;
        [Route("MonAn")]
        [HttpGet]
        public async Task<IActionResult> GetAllMonAn()
        {
            List<MonAn> models = new List<MonAn>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand("SELECT * FROM MonAn", con);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                MonAn monAn = new MonAn();
                monAn.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                monAn.TenMon = dt.Rows[i]["TenMon"].ToString();
                monAn.GiaMon = Convert.ToInt32(dt.Rows[i]["GiaMon"]);
                monAn.IdNhomMonAn = Convert.ToInt32(dt.Rows[i]["IdNhomMonAn"]);
                monAn.LinkAnh = dt.Rows[i]["LinkAnh"].ToString();
                monAn.ThanhPhan = dt.Rows[i]["ThanhPhan"].ToString();
              
                models.Add(monAn);
            }

            return Ok(models);
        }
    }
}
