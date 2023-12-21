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
    public class HoaDonKhoController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public HoaDonKhoController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("PostHoaDonKho")]
        [AllowCrossSiteJson]
        [HttpPost]
        public async Task<IActionResult> PostHoaDonKho(HoaDonKho model)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(
                        "INSERT INTO [HoaDonKho] (MaHoaDon,Ngay, Gio, TenNV) " +
                        "VALUES (@MaHoaDon,@Ngay, @Gio, @TenNV); SELECT SCOPE_IDENTITY();", con))
                    {
                        cmd.Parameters.AddWithValue("MaHoaDon", model.MaHoaDon);
                        cmd.Parameters.AddWithValue("@Ngay", model.Ngay);
                        cmd.Parameters.AddWithValue("@Gio", model.Gio);
                        cmd.Parameters.AddWithValue("@TenNV", model.TenNV);

                        int idHoaDonKho = Convert.ToInt32(cmd.ExecuteScalar());
                        using (SqlCommand cmdItems = new SqlCommand(
                            "INSERT INTO [HoaDonKhoItems] (IdHoaDonKho, IdNguyenLieu, SoLuong, DonGia) " +
                            "VALUES (@IdHoaDonKho, @IdNguyenLieu, @SoLuong, @DonGia);", con))
                        {
                            cmdItems.Parameters.AddWithValue("@IdHoaDonKho", idHoaDonKho);
                            cmdItems.Parameters.AddWithValue("@IdNguyenLieu", model.IdNguyenLieu);
                            cmdItems.Parameters.AddWithValue("@SoLuong", model.SoLuong);
                            cmdItems.Parameters.AddWithValue("@DonGia", model.DonGia);

                            cmdItems.ExecuteNonQuery();
                        }
                    }
                }
                return Ok(new { Message = "Đã tạo bản ghi!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

