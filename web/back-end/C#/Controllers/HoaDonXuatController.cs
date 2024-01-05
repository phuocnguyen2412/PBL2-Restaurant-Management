using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL2.Models;
using PBL2.Utility;
using System.Data.SqlClient;
using System.Data;
using Microsoft.JSInterop.Implementation;
using NuGet.Protocol.Plugins;
using System.Drawing.Text;
using System.Reflection;

namespace PBL2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonXuatController : Controller
    {
        private readonly IConfiguration _configuration;
        public HoaDonXuatController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        SqlConnection connString;
        SqlCommand cmd;
        //Get MHD
        [Route("HoaDon")]
        [AllowCrossSiteJson]
        [HttpGet]
        public async Task<IActionResult> GetAllHoaDonChuaThanhToan()
        {
            List<HoaDonXuat> models = new List<HoaDonXuat>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand(
                "SELECT   [Order].Id," +
                            "[Order].MaHoaDon," +
                            "[Order].Ngay," +
                            "[Order].Gio," +
                            "[QuanLyBan].SoBan," +
                            "[OrderItems].Id, " +
                            "[Order].TenNV," +
                            "[MonAn].TenMon," +
                            "[MonAn].GiaMon," +
                            "[OrderItems].SoLuong," +
                            "[OrderItems].PhanTramKhuyenMai," +
                            "[Order].TrangThaiThanhToan " +
                "FROM     [Order]  " +
                "JOIN     [OrderItems] ON [Order].Id     = [OrderItems].IdOrder " +
                "JOIN     [MonAn]      ON [MonAn].Id     = [OrderItems].IdMonAn " +
                "JOIN     [QuanLyBan]  ON [QuanLyBan].Id = [Order].SoBan " +
                "WHERE    [Order].TrangThaiThanhToan     = N'Chưa Thanh Toán'" +
                "ORDER BY [QuanLyBan].SoBan ASC", con);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);

            foreach (DataRow row in dt.Rows)
            {
                string mahoadon = row["MaHoaDon"].ToString();
                HoaDonXuat model;
                var existingItem = models.FirstOrDefault(item => item.MaHoaDon == mahoadon);
                MonAnItem monAn = new MonAnItem
                {
                    IdOrder = Convert.ToInt32(row["Id"]),
                    TenMonAn = row["TenMon"].ToString(),
                    GiaMon = Convert.ToInt32(row["GiaMon"]),
                    SoLuong = Convert.ToInt32(row["SoLuong"]),
                    ThanhTienItem = Convert.ToInt32(row["GiaMon"]) * Convert.ToInt32(row["SoLuong"]),
                    PhanTramKhuyenMaiItem = Convert.ToInt32(row["PhanTramKhuyenMai"]),
                    KhuyenMaiItem = Convert.ToInt32(row["GiaMon"]) * Convert.ToInt32(row["SoLuong"]) * Convert.ToInt32(row["PhanTramKhuyenMai"]) / 100,
                };
                if (existingItem == null)
                {
                    model = new HoaDonXuat();
                    model.MaHoaDon = mahoadon;
                    model.Id = Convert.ToInt32(row["Id"]);
                    model.SoBan = Convert.ToInt32(row["SoBan"]);
                    model.Ngay = row["Ngay"].ToString();
                    model.Gio = row["Gio"].ToString();
                    model.TenNV = row["TenNV"].ToString();
                    model.TrangThai = row["TrangThaiThanhToan"].ToString();
                    model.Items = new List<MonAnItem>();
                    models.Add(model);
                }
                else
                {
                    model = existingItem;
                }

                var existingMonAn = model.Items.FirstOrDefault(item => item.TenMonAn == monAn.TenMonAn);
                if (existingMonAn != null)
                {
                    existingMonAn.SoLuong += monAn.SoLuong;
                    existingMonAn.ThanhTienItem += monAn.ThanhTienItem;
                    existingMonAn.KhuyenMaiItem += monAn.KhuyenMaiItem;
                }
                else
                {
                    model.Items.Add(monAn);
                }

                model.ThanhTien += monAn.ThanhTienItem;
                model.KhuyenMai += monAn.KhuyenMaiItem;
                model.TongCong = model.ThanhTien - model.KhuyenMai;
            }

            return Ok(models);
        }
        [Route("HoaDonXuat")]
        [AllowCrossSiteJson]
        [HttpGet]
        public async Task<IActionResult> GetAllHoaDonDaThanhToan()
        {
            List<HoaDonXuat> models = new List<HoaDonXuat>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand(
                "SELECT [Order].Id," +
                        "[Order].MaHoaDon," +
                        "[Order].Ngay," +
                        "[Order].Gio," +
                        "[QuanLyBan].SoBan," +
                        "[Order].TenNV," +
                        "[MonAn].TenMon," +
                        "[MonAn].GiaMon," +
                        "[OrderItems].SoLuong," +
                        "[OrderItems].PhanTramKhuyenMai," +
                        "[Order].TrangThaiThanhToan " +
                "FROM   [Order]  " +
                "JOIN   [OrderItems] ON [Order].Id     = [OrderItems].IdOrder " +
                "JOIN   [MonAn]      ON [MonAn].Id     = [OrderItems].IdMonAn " +
                "JOIN   [QuanLyBan]  ON [QuanLyBan].Id = [Order].SoBan " +
                "WHERE  [Order].TrangThaiThanhToan = N'Đã Thanh Toán'" +
                "ORDER BY [Order].Id DESC", con);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);

            foreach (DataRow row in dt.Rows)
            {
                string mahoadon = row["MaHoaDon"].ToString();
                HoaDonXuat model;
                var existingItem = models.FirstOrDefault(item => item.MaHoaDon == mahoadon);
                MonAnItem monAn = new MonAnItem
                {
                    TenMonAn = row["TenMon"].ToString(),
                    GiaMon = Convert.ToInt32(row["GiaMon"]),
                    SoLuong = Convert.ToInt32(row["SoLuong"]),
                    ThanhTienItem = Convert.ToInt32(row["GiaMon"]) * Convert.ToInt32(row["SoLuong"]),
                    PhanTramKhuyenMaiItem = Convert.ToInt32(row["PhanTramKhuyenMai"]),
                    KhuyenMaiItem = Convert.ToInt32(row["GiaMon"]) * Convert.ToInt32(row["SoLuong"]) * Convert.ToInt32(row["PhanTramKhuyenMai"]) / 100,
                };
                if (existingItem == null)
                {
                    model = new HoaDonXuat();
                    model.MaHoaDon = mahoadon;
                    model.Id = Convert.ToInt32(row["Id"]);
                    model.SoBan = Convert.ToInt32(row["SoBan"]);
                    model.Ngay = row["Ngay"].ToString();
                    model.Gio = row["Gio"].ToString();
                    model.TenNV = row["TenNV"].ToString();
                    model.TrangThai = row["TrangThaiThanhToan"].ToString();
                    model.Items = new List<MonAnItem>();
                    models.Add(model);
                }
                else
                {
                    model = existingItem;
                }

                var existingMonAn = model.Items.FirstOrDefault(item => item.TenMonAn == monAn.TenMonAn);
                if (existingMonAn != null)
                {
                    existingMonAn.SoLuong += monAn.SoLuong;
                    existingMonAn.ThanhTienItem += monAn.ThanhTienItem;
                    existingMonAn.KhuyenMaiItem += monAn.KhuyenMaiItem;
                }
                else
                {
                    model.Items.Add(monAn);
                }

                model.ThanhTien += monAn.ThanhTienItem;
                model.KhuyenMai += monAn.KhuyenMaiItem;
                model.TongCong = model.ThanhTien - model.KhuyenMai;
            }

            return Ok(models);
        }
        //Find HDX by MHD
        [Route("FindHoaDonXuatByMaHoaDon")]
        [AllowCrossSiteJson]
        [HttpGet]
        public async Task<IActionResult> FindHoaDonXuat(string MaHoaDon)
        {
            List<HoaDonXuat> models = new List<HoaDonXuat>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand(
                "SELECT [Order].Id," +
                       "[Order].MaHoaDon," +
                       "[Order].Ngay," +
                       "[Order].Gio," +
                       "[Order].SoBan," +
                       "[Order].TenNV," +
                       "[MonAn].TenMon," +
                       "[MonAn].GiaMon," +
                       "[OrderItems].SoLuong," +
                       "[OrderItems].PhanTramKhuyenMai," +
                       "[Order].TrangThaiThanhToan " +
                "FROM   [Order]  " +
                "JOIN   [OrderItems] ON [Order].Id     = [OrderItems].IdOrder " +
                "JOIN   [MonAn]      ON [MonAn].Id     = [OrderItems].IdMonAn " +
                "JOIN   [QuanLyBan]  ON [QuanLyBan].Id = [Order].SoBan " +
                "WHERE [Order].MaHoaDon = @MaHoaDon AND [Order].TrangThaiThanhToan = N'Đã Thanh Toán'", con);

            cmd.Parameters.AddWithValue("@MaHoaDon", MaHoaDon);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);

            foreach (DataRow row in dt.Rows)
            {
                string mahoadon = row["MaHoaDon"].ToString();
                HoaDonXuat model;
                var existingItem = models.FirstOrDefault(item => item.MaHoaDon == mahoadon);
                MonAnItem monAn = new MonAnItem
                {
                    TenMonAn = row["TenMon"].ToString(),
                    GiaMon = Convert.ToInt32(row["GiaMon"]),
                    SoLuong = Convert.ToInt32(row["SoLuong"]),
                    ThanhTienItem = Convert.ToInt32(row["GiaMon"]) * Convert.ToInt32(row["SoLuong"]),
                    PhanTramKhuyenMaiItem = Convert.ToInt32(row["PhanTramKhuyenMai"]),
                    KhuyenMaiItem = Convert.ToInt32(row["GiaMon"]) * Convert.ToInt32(row["SoLuong"]) * Convert.ToInt32(row["PhanTramKhuyenMai"]) / 100,
                };
                if (existingItem == null)
                {
                    model = new HoaDonXuat();
                    model.MaHoaDon = mahoadon;
                    model.Id = Convert.ToInt32(row["Id"]);
                    model.SoBan = Convert.ToInt32(row["SoBan"]);
                    model.Ngay = row["Ngay"].ToString();
                    model.Gio = row["Gio"].ToString();
                    model.TenNV = row["TenNV"].ToString();
                    model.TrangThai = row["TrangThaiThanhToan"].ToString();
                    model.Items = new List<MonAnItem>();
                    models.Add(model);
                }
                else
                {
                    model = existingItem;
                }

                var existingMonAn = model.Items.FirstOrDefault(item => item.TenMonAn == monAn.TenMonAn);
                if (existingMonAn != null)
                {
                    existingMonAn.SoLuong += monAn.SoLuong;
                    existingMonAn.ThanhTienItem += monAn.ThanhTienItem;
                    existingMonAn.KhuyenMaiItem += monAn.KhuyenMaiItem;
                }
                else
                {
                    model.Items.Add(monAn);
                }

                model.ThanhTien += monAn.ThanhTienItem;
                model.KhuyenMai += monAn.KhuyenMaiItem;
                model.TongCong = model.ThanhTien - model.KhuyenMai;
            }

            return Ok(models);
        }
        //Find HDX by Date
        [Route("FindHoaDonXuatByDate")]
        [AllowCrossSiteJson]
        [HttpGet]
        public async Task<IActionResult> FindHoaDonXuatByDate(string Ngay)
        {
            List<HoaDonXuat> models = new List<HoaDonXuat>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand(
                "SELECT [Order].Id," +
                       "[Order].MaHoaDon," +
                       "[Order].Ngay," +
                       "[Order].Gio," +
                       "[Order].SoBan," +
                       "[Order].TenNV," +
                       "[MonAn].TenMon," +
                       "[MonAn].GiaMon," +
                       "[OrderItems].SoLuong," +
                       "[OrderItems].PhanTramKhuyenMai," +
                       "[Order].TrangThaiThanhToan " +
                "FROM   [Order]  " +
                "JOIN   [OrderItems] ON [Order].Id     = [OrderItems].IdOrder " +
                "JOIN   [MonAn]      ON [MonAn].Id     = [OrderItems].IdMonAn " +
                "JOIN   [QuanLyBan]  ON [QuanLyBan].Id = [Order].SoBan " +
                "WHERE  [Order].Ngay = @Ngay AND [Order].TrangThaiThanhToan = N'Đã Thanh Toán'", con);
            cmd.Parameters.AddWithValue("Ngay", Ngay);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);

            foreach (DataRow row in dt.Rows)
            {
                string mahoadon = row["MaHoaDon"].ToString();
                HoaDonXuat model;
                var existingItem = models.FirstOrDefault(item => item.MaHoaDon == mahoadon);
                MonAnItem monAn = new MonAnItem
                {
                    TenMonAn = row["TenMon"].ToString(),
                    GiaMon = Convert.ToInt32(row["GiaMon"]),
                    SoLuong = Convert.ToInt32(row["SoLuong"]),
                    ThanhTienItem = Convert.ToInt32(row["GiaMon"]) * Convert.ToInt32(row["SoLuong"]),
                    PhanTramKhuyenMaiItem = Convert.ToInt32(row["PhanTramKhuyenMai"]),
                    KhuyenMaiItem = Convert.ToInt32(row["GiaMon"]) * Convert.ToInt32(row["SoLuong"]) * Convert.ToInt32(row["PhanTramKhuyenMai"]) / 100,
                };
                if (existingItem == null)
                {
                    model = new HoaDonXuat();
                    model.MaHoaDon = mahoadon;
                    model.Id = Convert.ToInt32(row["Id"]);
                    model.SoBan = Convert.ToInt32(row["SoBan"]);
                    model.Ngay = row["Ngay"].ToString();
                    model.Gio = row["Gio"].ToString();
                    model.TenNV = row["TenNV"].ToString();
                    model.TrangThai = row["TrangThaiThanhToan"].ToString();
                    model.Items = new List<MonAnItem>();
                    models.Add(model);
                }
                else
                {
                    model = existingItem;
                }

                var existingMonAn = model.Items.FirstOrDefault(item => item.TenMonAn == monAn.TenMonAn);
                if (existingMonAn != null)
                {
                    existingMonAn.SoLuong += monAn.SoLuong;
                    existingMonAn.ThanhTienItem += monAn.ThanhTienItem;
                    existingMonAn.KhuyenMaiItem += monAn.KhuyenMaiItem;
                }
                else
                {
                    model.Items.Add(monAn);
                }

                model.ThanhTien += monAn.ThanhTienItem;
                model.KhuyenMai += monAn.KhuyenMaiItem;
                model.TongCong = model.ThanhTien - model.KhuyenMai;
            }

            return Ok(models);
        }
        //DELETE
        [Route("DeleteOrder")]
        [AllowCrossSiteJson]
        [HttpDelete]
        public async Task<IActionResult> DeleteOrder(int Id)
        {
            try
            {
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                con.Open();
                {
                    SqlCommand cmd = new SqlCommand(
                        "UPDATE [NguyenLieu] " +
                        "SET SoLuongTonKho = SoLuongTonKho + [OrderItems].SoLuong * [MonAnItems].SoLuongCan " +
                        "From [NguyenLieu] Join [MonAnItems] on [MonAnItems].IdNguyenLieu = [NguyenLieu].Id " +
                        "Join [MonAn] on [MonAn].Id = [MonAnItems].IdMonAn " +
                        "Join [OrderItems] on [OrderItems].IdMonAn = [MonAn].Id " +
                        "WHERE [OrderItems].IdOrder = @Id " +
                        "DELETE FROM [OrderItems] WHERE IdOrder = @Id " +
                        "DELETE FROM [Order] WHERE Id=@Id" , con);
                    cmd.Parameters.AddWithValue("Id", Id);
                    cmd.ExecuteNonQuery();
                }
                con.Close();
                return Ok(new { Message = "Da xoa Order!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}





