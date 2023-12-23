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
    public class NguyenLieuController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public NguyenLieuController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        SqlConnection connString;
        SqlCommand cmd;
        [Route("NguyenLieu")]
        [HttpGet]
        public async Task<IActionResult> GetNguyenLieu()
        {
            List<NguyenLieu> models = new List<NguyenLieu>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand(
                "SELECT [NguyenLieu].Id," +
                       "[NguyenLieu].TenNguyenLieu," +
                       "[DonViNguyenLieu].DonVi," +
                       "[NguyenLieu].SoLuongTonKho " +
                "FROM   [NguyenLieu] " +
                "JOIN   [DonViNguyenLieu] ON [DonViNguyenLieu].Id = [NguyenLieu].IdDonViNguyenLieu ", con);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow row in dt.Rows)
            {
                NguyenLieu model = new NguyenLieu();
                model.Id = Convert.ToInt32(row["Id"]);
                model.TenNguyenLieu = row["TenNguyenLieu"].ToString();
                model.DonVi = row["DonVi"].ToString();
                model.SoLuongTonKho = Convert.ToSingle(row["SoLuongTonKho"]);
                models.Add(model);
            }
            return Ok(models);
        }
        [Route("UpdateNguyenLieu")]
        [AllowCrossSiteJson]
        [HttpPut]
        public async Task<IActionResult> ADDNguyenLieu(int Id, int MaHoaDon)
        {
            try
            {
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                con.Open();
                {
                    SqlCommand cmd = new SqlCommand(
                        "UPDATE [NguyenLieu] " +
                        "SET [NguyenLieu].SoLuongTonKho += [HoaDonKhoItems].SoLuong " +
                        "FROM [NguyenLieu] " +
                        "Join [HoaDonKhoItems] On [NguyenLieu].Id = [HoaDonKhoItems].IdNguyenLieu " +
                        "Join [HoaDonKho] On [HoaDonKho].Id = [HoaDonKhoItems].IdHoaDonKho " +
                        "WHERE [NguyenLieu].Id = @Id AND [HoaDonKho].MaHoaDon = @MaHoaDon ", con);
                    cmd.Parameters.AddWithValue("Id", Id);
                    cmd.Parameters.AddWithValue("MaHoaDon", MaHoaDon);

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
        [Route("CapNhatNguyenLieuTonKho")]
        [AllowCrossSiteJson]
        [HttpPut]
        public async Task<IActionResult> GiamSoLuongNguyenLieu(int Id, string MaHoaDon)
        {
            try
            {
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            
                con.Open();
                {

                    SqlCommand cmd = new SqlCommand(
                        "UPDATE [NguyenLieu] " +
                        "SET [NguyenLieu].SoLuongTonKho -= ([MonAnItems].SoLuongCan * [OrderItems].SoLuong) " +
                        "FROM [NguyenLieu] " +
                        "Join [MonAnItems] On [NguyenLieu].Id = [MonAnItems].IdNguyenLieu " +
                        "Join [MonAn] On [MonAn].Id = [MonAnItems].IdMonAn " +
                        "Join [OrderItems] On [OrderItems].IdMonAn = [MonAn].Id " +
                        "Join [Order] On [OrderItems].IdOrder = [Order].Id " +
                        "WHERE [MonAnItems].IdMonAn = @Id AND [Order].MaHoaDon = @MaHoaDon ", con);
                    cmd.Parameters.AddWithValue("Id", Id);
                    cmd.Parameters.AddWithValue("MaHoaDon", MaHoaDon);
                    cmd.ExecuteNonQuery();

                    return Ok(new { Message = "Đã cập nhật nguyên liệu tồn kho" });
                }    
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
