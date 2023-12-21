using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;
using PBL2.Models;
using PBL2.Utility;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Text;
using System.Reflection;
using System.Security.Cryptography.Pkcs;
using static PBL2.Controllers.OrderController;

namespace PBL2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public OrderController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [Route("PostOrder")]
        [AllowCrossSiteJson]
        [HttpPost]
        public async Task<IActionResult> PostOrder(Order model)
        {
            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await con.OpenAsync();
                using (SqlTransaction transaction = con.BeginTransaction())
                {
                    try
                    {
                        bool CoDuNguyenLieu = KiemTraNguyenLieu(con, transaction, model.IdMonAn, model.SoLuong);
                        if (!CoDuNguyenLieu)
                        {
                            transaction.Rollback();
                            return BadRequest(new { Message = "Không đủ nguyên liệu tồn kho!" });
                        }

                        using (SqlCommand cmdOrder = new SqlCommand(
                            "INSERT INTO [Order] (MaHoaDon, TenNV, Ngay, Gio, SoBan, TrangThaiThanhToan) " +
                            "VALUES (@MaHoaDon, @TenNV, @Ngay, @Gio, @SoBan, N'Chưa thanh toán'); SELECT SCOPE_IDENTITY()", con, transaction))
                        {
                            cmdOrder.Parameters.Add("@MaHoaDon", SqlDbType.NVarChar).Value = model.MaHoaDon;
                            cmdOrder.Parameters.Add("@TenNV", SqlDbType.NVarChar).Value = model.TenNV;
                            cmdOrder.Parameters.Add("@Ngay", SqlDbType.VarChar).Value = model.Ngay;
                            cmdOrder.Parameters.Add("@Gio", SqlDbType.NVarChar).Value = model.Gio;
                            cmdOrder.Parameters.Add("@SoBan", SqlDbType.Int).Value = model.SoBan;

                            int orderId = Convert.ToInt32(await cmdOrder.ExecuteScalarAsync());

                            using (SqlCommand cmdOrderItems = new SqlCommand(
                                "INSERT INTO [OrderItems] (IdOrder, TrangThaiMon, IdMonAn, SoLuong, PhanTramKhuyenMai, GhiChu) " +
                                "VALUES (@IdOrder, @TrangThaiMon, @IdMonAn, @SoLuong, @PhanTramKhuyenMai, @GhiChu)", con, transaction))
                            {
                                cmdOrderItems.Parameters.Add("@IdOrder", SqlDbType.Int).Value = orderId;
                                cmdOrderItems.Parameters.Add("@TrangThaiMon", SqlDbType.NVarChar).Value = model.TrangThaiMon;
                                cmdOrderItems.Parameters.Add("@IdMonAn", SqlDbType.Int).Value = model.IdMonAn;
                                cmdOrderItems.Parameters.Add("@SoLuong", SqlDbType.Int).Value = model.SoLuong;
                                cmdOrderItems.Parameters.Add("@PhanTramKhuyenMai", SqlDbType.Int).Value = model.PhanTramKhuyenMai;
                                cmdOrderItems.Parameters.Add("@GhiChu", SqlDbType.NVarChar).Value = model.GhiChu;

                                await cmdOrderItems.ExecuteNonQueryAsync();
                            }
                        }

                        transaction.Commit();
                        return Ok(new { Message = "Đã đặt món thành công!" });
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return BadRequest(ex.Message);
                    }
                }
            }
        }

        private bool KiemTraNguyenLieu(SqlConnection ketNoi, SqlTransaction transaction, int IdMonAn, int SoLuongMonAn)
        {
            using (SqlCommand cmdKiemTra = new SqlCommand(
                "SELECT COUNT(SoLuongTonKho) " +
                "FROM [NguyenLieu] " +
                "JOIN [MonAnItems] ON [MonAnItems].IdNguyenLieu = [NguyenLieu].Id " +
                "WHERE [MonAnItems].IdMonAn = @Id AND [NguyenLieu].SoLuongTonKho >= ([MonAnItems].SoLuongCan * @SoLuongMonAn) ", ketNoi, transaction))
            {
                cmdKiemTra.Parameters.Add("@Id", SqlDbType.Int).Value = IdMonAn;
                cmdKiemTra.Parameters.Add("@SoLuongMonAn", SqlDbType.Int).Value = SoLuongMonAn;
                int soLuong = (int)cmdKiemTra.ExecuteScalar();

                using (SqlCommand cmdKiemTra1 = new SqlCommand(
                "SELECT COUNT (IdNguyenLieu) " +
                "FROM [MonAnItems] " +
                "WHERE [MonAnItems].IdMonAn = @Id", ketNoi, transaction))
                {

                    cmdKiemTra1.Parameters.Add("@Id", SqlDbType.Int).Value = IdMonAn;


                    int nguyenLieu = (int)cmdKiemTra1.ExecuteScalar();
                    return soLuong == nguyenLieu;
                }
            }
        }

        [Route("Xuathoadonbutton")]
        [AllowCrossSiteJson]
        [HttpPut]
        public async Task<IActionResult> Xuathoadon(hoadon model)
        {
            try
            {
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                con.Open();
                {
                    SqlCommand cmd = new SqlCommand("UPDATE [Order] SET Ngay=@Ngay, Gio = @Gio, TrangThaiThanhToan=N'Đã Thanh Toán' WHERE MaHoaDon=@MaHoaDon", con);
                    cmd.Parameters.AddWithValue("MaHoaDon",model.MaHoaDon);
                    cmd.Parameters.AddWithValue("Ngay", model.Ngay);
                    cmd.Parameters.AddWithValue("Gio", model.Gio);
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
        public class hoadon 
        { 
            public string MaHoaDon { get; set; }
            public string Ngay { get; set; }
            public string Gio { get; set; }

        }
    }
}

