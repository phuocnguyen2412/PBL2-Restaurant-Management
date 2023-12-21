using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL2.Models;
using PBL2.Utility;
using System.Data.SqlClient;
using System.Data;

namespace PBL2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhaCCController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public NhaCCController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        SqlConnection connString;
        SqlCommand cmd;
        //GET
        [Route("GetNhaCC")]
        [AllowCrossSiteJson]
        [HttpGet]
        public async Task<IActionResult> GetNhaCC()
        {
            List<NhaCC> models = new List<NhaCC>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand("SELECT Id, Ten FROM [NhaCungCap]", con);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NhaCC model = new NhaCC();
                model.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                model.TenNhaCC = dt.Rows[i]["Ten"].ToString();
     
                models.Add(model);
            }
            return Ok(models);
        }
        [Route("GetNguyenLieuByNhaCC/{IdNhaCC}")]
        [AllowCrossSiteJson]
        [HttpGet]   
        public async Task<IActionResult> GetNguyenLieuByNhaCC(int IdNhaCC)
        {
            List<NguyenLieu> models = new List<NguyenLieu>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand("SELECT Id, TenNguyenLieu FROM [NguyenLieu] WHERE IdNhaCC = @IdNhaCC", con);
            cmd.Parameters.AddWithValue("@IdNhaCC",IdNhaCC);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NguyenLieu model = new NguyenLieu();
                model.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                model.TenNguyenLieu = dt.Rows[i]["TenNguyenLieu"].ToString();

                models.Add(model);
            }

            return Ok(models);
        }
        
    }
}
