using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL2.Models;
using PBL2.Utility;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.JsonPatch;
using System.Text;
using System.Security.Cryptography;

namespace PBL2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVienController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public NhanVienController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        SqlConnection connString;
        SqlCommand cmd;
        //GET
        [Route("GetNhanVien")]
        [AllowCrossSiteJson]
        [HttpGet]
        public async Task<IActionResult> GetNhanVien()
        {
            List<NhanVien> models = new List<NhanVien>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand("SELECT * FROM NhanVien", con);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NhanVien model = new NhanVien();
                model.HoTen = dt.Rows[i]["HoTen"].ToString();
                model.GioiTinh = dt.Rows[i]["GioiTinh"].ToString();
                model.Email = dt.Rows[i]["Email"].ToString();
                model.NgaySinh = dt.Rows[i]["NgaySinh"].ToString();
                model.CCCD = dt.Rows[i]["CCCD"].ToString();
                model.ThuongTru = dt.Rows[i]["ThuongTru"].ToString();
                model.ChucVu = dt.Rows[i]["ChucVu"].ToString();
                model.Id = Convert.ToInt32(dt.Rows[i]["Id"]);

                models.Add(model);
            }
            return Ok(models);
        }
        //POST
        [Route("PostNhanVien")]
        [AllowCrossSiteJson]
        [HttpPost]
        public async Task<IActionResult> PostNhanVien(NhanVien model)
        {
            try
            {
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                con.Open();
                {
                    SqlCommand cmd = new SqlCommand("INSERT INTO [NhanVien] (HoTen,GioiTinh,Email,NgaySinh,CCCD,ThuongTru,ChucVu) VALUES (@HoTen,@GioiTinh,@Email,@NgaySinh,@CCCD,@ThuongTru,@ChucVu); SELECT SCOPE_IDENTITY()", con);
                    cmd.Parameters.AddWithValue("HoTen", model.HoTen);
                    cmd.Parameters.AddWithValue("GioiTinh", model.GioiTinh);
                    cmd.Parameters.AddWithValue("Email", model.Email);
                    cmd.Parameters.AddWithValue("NgaySinh", model.NgaySinh);
                    cmd.Parameters.AddWithValue("CCCD", model.CCCD);
                    cmd.Parameters.AddWithValue("ThuongTru", model.ThuongTru);
                    cmd.Parameters.AddWithValue("ChucVu", model.ChucVu);
                
                int id = Convert.ToInt32(cmd.ExecuteScalar());
                string hashedCCCD = SimpleHash(model.CCCD);
                    using (SqlCommand cmd1 = new SqlCommand("INSERT INTO [Users] (Username, Password,MaNV) VALUES (@Username, @Password, @MaNV)", con))
                    {
                        cmd1.Parameters.AddWithValue("@Username", model.Email);
                        cmd1.Parameters.AddWithValue("@Password", hashedCCCD);
                        cmd1.Parameters.AddWithValue("@MaNV", id);
                        cmd1.ExecuteNonQuery();
                    }
                }
                con.Close();
                return Ok(new { Message = "Da tao ban ghi!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        private string SimpleHash(string input)
        {
            const int prime = 31; 
            long hash = 0;

            foreach (char c in input)
            {
                hash = (hash * prime) + c;
            }
            return hash.ToString();
        }
        //UPDATE
        [Route("PutNhanVien")]
        [AllowCrossSiteJson]
        [HttpPut]
        public async Task<IActionResult> PutNhanVien(NhanVien model)
        {
            try
            {
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                con.Open();
                {
                    SqlCommand cmd = new SqlCommand("UPDATE [NhanVien] SET HoTen=@HoTen, GioiTinh=@GioiTinh, Email=@Email, NgaySinh=@NgaySinh, CCCD=@CCCD, ThuongTru=@ThuongTru, ChucVu=@ChucVu WHERE Id=@Id", con);
                    cmd.Parameters.AddWithValue("Id",model.Id);
                    cmd.Parameters.AddWithValue("HoTen", model.HoTen);
                    cmd.Parameters.AddWithValue("GioiTinh", model.GioiTinh);
                    cmd.Parameters.AddWithValue("Email", model.Email);
                    cmd.Parameters.AddWithValue("NgaySinh", model.NgaySinh);
                    cmd.Parameters.AddWithValue("CCCD", model.CCCD);
                    cmd.Parameters.AddWithValue("ThuongTru", model.ThuongTru);
                    cmd.Parameters.AddWithValue("ChucVu", model.ChucVu);
                    cmd.ExecuteNonQuery();
                }
                con.Close();
                return Ok(new { Message = "Da cap nhat ban ghi!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //DELETE
        [Route("DeleteNhanVien")]
        [AllowCrossSiteJson]
        [HttpDelete]
        public async Task<IActionResult> DeleteNhanVien(int Id, int MaNV)
        {
            try
            {
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                con.Open();
                {
                    SqlCommand cmd = new SqlCommand(
                        "DELETE FROM [Users] WHERE MaNV = @MaNV " +
                        "DELETE FROM [NhanVien] WHERE Id=@Id  ", con);
                    cmd.Parameters.AddWithValue("Id", Id);
                    cmd.Parameters.AddWithValue("MaNV", MaNV);

                    cmd.ExecuteNonQuery();
                }
                con.Close();
                return Ok(new { Message = "Da xoa ban ghi!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //GET NVPV
        [Route("GetNhanVienPhucVu")]
        [AllowCrossSiteJson]
        [HttpGet]
        public async Task<IActionResult> GetNhanVienPhucVu()
        {
            List<NhanVien> models = new List<NhanVien>();

            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand("SELECT HoTen FROM NhanVien WHERE ChucVu = N'Nhân viên phục vụ'", con))
                {
                    using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        adapter.Fill(dt);

                        foreach (DataRow row in dt.Rows)
                        {
                            NhanVien nhanVien = new NhanVien();

                            nhanVien.HoTen = row["HoTen"].ToString();
                          
                            models.Add(nhanVien);
                        }
                    }
                }
            }
            return Ok(models);
        }
        //GET PVK
        [Route("GetNhanVienKho")]
        [AllowCrossSiteJson]
        [HttpGet]
        public async Task<IActionResult> GetNhanVienKho()
        {
            List<NhanVien> models = new List<NhanVien>();

            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand("SELECT HoTen FROM NhanVien WHERE ChucVu = N'Nhân viên kho'", con))
                {
                    using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        adapter.Fill(dt);

                        foreach (DataRow row in dt.Rows)
                        {
                            NhanVien nhanVien = new NhanVien();

                            nhanVien.HoTen = row["HoTen"].ToString();

                            models.Add(nhanVien);
                        }
                    }
                }
            }
            return Ok(models);
        }
        //GET NVB MaNV
        [Route("GetNhanVienByMaNV")]
        [AllowCrossSiteJson]
        [HttpGet]
        public async Task<IActionResult> GetNhanVienByMaNV(int MaNV)
        {
            List<NhanVien> models = new List<NhanVien>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand("SELECT * FROM NhanVien WHERE Id = @MaNV ", con);
            cmd.Parameters.AddWithValue("@MaNV", MaNV);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NhanVien model = new NhanVien();
                model.HoTen = dt.Rows[i]["HoTen"].ToString();
                model.GioiTinh = dt.Rows[i]["GioiTinh"].ToString();
                model.Email = dt.Rows[i]["Email"].ToString();
                model.NgaySinh = dt.Rows[i]["NgaySinh"].ToString();
                model.CCCD = dt.Rows[i]["CCCD"].ToString();
                model.ThuongTru = dt.Rows[i]["ThuongTru"].ToString();
                model.ChucVu = dt.Rows[i]["ChucVu"].ToString();
                model.Id = Convert.ToInt32(dt.Rows[i]["Id"]);

                models.Add(model);
            }
            return Ok(models);
        }
        // GET NV by TEN
        [Route("GetNhanVienByName")]
        [AllowCrossSiteJson]
        [HttpGet]
        public async Task<IActionResult> GetNhanVienByName(string TenNV)
        {
            List<NhanVien> models = new List<NhanVien>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand("SELECT * FROM NhanVien WHERE HoTen LIKE '%' + @TenNV + '%' ", con);
            cmd.Parameters.AddWithValue("@TenNV", TenNV);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                NhanVien model = new NhanVien();
                model.HoTen = dt.Rows[i]["HoTen"].ToString();
                model.GioiTinh = dt.Rows[i]["GioiTinh"].ToString();
                model.Email = dt.Rows[i]["Email"].ToString();
                model.NgaySinh = dt.Rows[i]["NgaySinh"].ToString();
                model.CCCD = dt.Rows[i]["CCCD"].ToString();
                model.ThuongTru = dt.Rows[i]["ThuongTru"].ToString();
                model.ChucVu = dt.Rows[i]["ChucVu"].ToString();
                model.Id = Convert.ToInt32(dt.Rows[i]["Id"]);

                models.Add(model);
            }
            return Ok(models);
        }
    }
}