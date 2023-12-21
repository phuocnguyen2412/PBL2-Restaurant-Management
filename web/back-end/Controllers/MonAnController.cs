using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL2.Models;
using System.Data.SqlClient;
using System.Data;
using PBL2.Utility;

namespace PBL2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonAnController : Controller
    {
        private readonly IConfiguration _configuration;
        public MonAnController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        SqlConnection connString;
        SqlCommand cmd;
        [Route("MonAn")]
        [AllowCrossSiteJson]
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
                MonAn model = new MonAn();
                model.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                model.TenMon = dt.Rows[i]["TenMon"].ToString();
                model.GiaMon = Convert.ToInt32(dt.Rows[i]["GiaMon"]);
                model.IdNhomMonAn = Convert.ToInt32(dt.Rows[i]["IdNhomMonAn"]);
                model.LinkAnh = dt.Rows[i]["LinkAnh"].ToString();
                model.ThanhPhan = dt.Rows[i]["ThanhPhan"].ToString();
                models.Add(model);
            }
            return Ok(models);
        }
    }
}
