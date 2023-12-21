using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PBL2.Models;
using System.Data.SqlClient;
using System.Data;
using System;
using Microsoft.DotNet.Scaffolding.Shared.Project;

namespace PBL2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonNhapController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public HoaDonNhapController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        SqlConnection connString;
        SqlCommand cmd;
        [Route("HoaDonNhap")]
        [HttpGet]
        public async Task<IActionResult> GetHoaDonNhap()
        {
            List<HoaDonNhap> models = new List<HoaDonNhap>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand(
                "SELECT [HoaDonKho].Id, " +
                       "[HoaDonKho].MaHoaDon, " +
                       "[HoaDonKho].Ngay, " +
                       "[HoaDonKho].Gio," +
                       "[HoaDonKho].TenNV," +
                       "[NhaCungCap].Ten, " +
                       "[NhaCungCap].SoDienThoai, " +
                       "[NhaCungCap].DiaChi, " +
                       "[NguyenLieu].TenNguyenLieu," +
                       "[DonViNguyenLieu].DonVi," +
                       "[HoaDonKhoItems].DonGia," +
                       "[HoaDonKhoItems].SoLuong " +
                "FROM  [HoaDonKho] " +
                "Join  [HoaDonKhoItems]  On [HoaDonKho].Id       = [HoaDonKhoItems].IdHoaDonKho " +
                "Join  [NguyenLieu]      On [NguyenLieu].Id      = [HoaDonKhoItems].IdNguyenLieu " +
                "Join  [NhaCungCap]      On [NhaCungCap].Id      = [NguyenLieu].IdNhaCC " +
                "Join  [DonViNguyenLieu] ON [DonViNguyenLieu].Id = [NguyenLieu].IdDonViNguyenLieu ", con);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow row in dt.Rows)
            {
                int HoaDonKhoId = Convert.ToInt32(row["MaHoaDon"]);
                HoaDonNhap model;
                var existingItem = models.FirstOrDefault(item => item.MaHoaDon == HoaDonKhoId);
                NguyenLieuItem nguyenLieu = new NguyenLieuItem
                {
                    TenNguyenLieu = row["TenNguyenLieu"].ToString(),
                    DonVi = row["DonVi"].ToString(),
                    DonGia = Convert.ToInt32(row["DonGia"]),
                    SoLuong = Convert.ToSingle(row["SoLuong"]),
                    ThanhTienItem = Convert.ToInt32(row["SoLuong"]) * Convert.ToInt32(row["DonGia"])
                };
                if (existingItem == null)
                {
                    model = new HoaDonNhap();
                    model.Id = Convert.ToInt32(row["Id"]);
                    model.MaHoaDon = HoaDonKhoId;
                    model.Ngay = row["Ngay"].ToString();
                    model.Gio = row["Gio"].ToString();
                    model.TenNV = row["TenNV"].ToString();
                    model.TenNhaCC = row["Ten"].ToString();
                    model.SDT = row["SoDienThoai"].ToString();
                    model.DiaChi = row["DiaChi"].ToString();
                    model.Items = new List<NguyenLieuItem>();
                    models.Add(model);
                }
                else
                {
                    model = existingItem;
                }
                var existingNguyenLieu = model.Items.FirstOrDefault(item => item.TenNguyenLieu == nguyenLieu.TenNguyenLieu);
                if (existingNguyenLieu != null)
                {
                    existingNguyenLieu.SoLuong += nguyenLieu.SoLuong;
                    existingNguyenLieu.ThanhTienItem += nguyenLieu.ThanhTienItem;
                }
                else
                {
                    model.Items.Add(nguyenLieu);
                }

                model.ThanhTien += nguyenLieu.ThanhTienItem;
            }
            return Ok(models);
        }
        //Find HoaDonNhap By MaHoaDon
        [Route("FindHoaDonNhapByMaHoaDon")]
        [HttpGet]
        public async Task<IActionResult> FindHoaDonNhap(int MaHoaDon)
        {
            List<HoaDonNhap> models = new List<HoaDonNhap>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand(
                "SELECT [HoaDonKho].Id, " +
                       "[HoaDonKho].MaHoaDon, " +
                       "[HoaDonKho].Ngay, " +
                       "[HoaDonKho].Gio," +
                       "[HoaDonKho].TenNV," +
                       "[NhaCungCap].Ten, " +
                       "[NhaCungCap].SoDienThoai, " +
                       "[NhaCungCap].DiaChi, " +
                       "[NguyenLieu].TenNguyenLieu," +
                       "[DonViNguyenLieu].DonVi," +
                       "[HoaDonKhoItems].DonGia," +
                       "[HoaDonKhoItems].SoLuong " +
                "FROM  [HoaDonKho] " +
                "Join  [HoaDonKhoItems]  On [HoaDonKho].Id       = [HoaDonKhoItems].IdHoaDonKho " +
                "Join  [NguyenLieu]      On [NguyenLieu].Id      = [HoaDonKhoItems].IdNguyenLieu " +
                "Join  [NhaCungCap]      On [NhaCungCap].Id      = [NguyenLieu].IdNhaCC " +
                "Join  [DonViNguyenLieu] ON [DonViNguyenLieu].Id = [NguyenLieu].IdDonViNguyenLieu " +
                "Where [HoaDonKho].MaHoaDon = @MaHoaDon", con);

            cmd.Parameters.AddWithValue("MaHoaDon", MaHoaDon);

            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow row in dt.Rows)
            {
                int HoaDonKhoId = Convert.ToInt32(row["MaHoaDon"]);
                HoaDonNhap model;
                var existingItem = models.FirstOrDefault(item => item.MaHoaDon == HoaDonKhoId);
                NguyenLieuItem nguyenLieu = new NguyenLieuItem
                {
                    TenNguyenLieu = row["TenNguyenLieu"].ToString(),
                    DonVi = row["DonVi"].ToString(),
                    DonGia = Convert.ToInt32(row["DonGia"]),
                    SoLuong = Convert.ToSingle(row["SoLuong"]),
                    ThanhTienItem = Convert.ToInt32(row["SoLuong"]) * Convert.ToInt32(row["DonGia"])
                };
                if (existingItem == null)
                {
                    model = new HoaDonNhap();
                    model.Id = Convert.ToInt32(row["Id"]);
                    model.MaHoaDon = HoaDonKhoId;
                    model.Ngay = row["Ngay"].ToString();
                    model.Gio = row["Gio"].ToString();
                    model.TenNV = row["TenNV"].ToString();
                    model.TenNhaCC = row["Ten"].ToString();
                    model.SDT = row["SoDienThoai"].ToString();
                    model.DiaChi = row["DiaChi"].ToString();
                    model.Items = new List<NguyenLieuItem>();
                    models.Add(model);
                }
                else
                {
                    model = existingItem;
                }
                var existingNguyenLieu = model.Items.FirstOrDefault(item => item.TenNguyenLieu == nguyenLieu.TenNguyenLieu);
                if (existingNguyenLieu != null)
                {
                    existingNguyenLieu.SoLuong += nguyenLieu.SoLuong;
                    existingNguyenLieu.ThanhTienItem += nguyenLieu.ThanhTienItem;
                }
                else
                {
                    model.Items.Add(nguyenLieu);
                }

                model.ThanhTien += nguyenLieu.ThanhTienItem;
            }
            return Ok(models);
        }
        //Find HoaDonNhap By Date
        [Route("FindHoaDonNhapByDate")]
        [HttpGet]
        public async Task<IActionResult> FindHoaDonNhap(string Ngay)
        {
            List<HoaDonNhap> models = new List<HoaDonNhap>();
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand(
                "SELECT [HoaDonKho].Id, " +
                       "[HoaDonKho].MaHoaDon, " +
                       "[HoaDonKho].Ngay, " +
                       "[HoaDonKho].Gio," +
                       "[HoaDonKho].TenNV," +
                       "[NhaCungCap].Ten, " +
                       "[NhaCungCap].SoDienThoai, " +
                       "[NhaCungCap].DiaChi, " +
                       "[NguyenLieu].TenNguyenLieu," +
                       "[DonViNguyenLieu].DonVi," +
                       "[HoaDonKhoItems].DonGia," +
                       "[HoaDonKhoItems].SoLuong " +
                "FROM  [HoaDonKho] " +
                "Join  [HoaDonKhoItems]  On [HoaDonKho].Id       = [HoaDonKhoItems].IdHoaDonKho " +
                "Join  [NguyenLieu]      On [NguyenLieu].Id      = [HoaDonKhoItems].IdNguyenLieu " +
                "Join  [NhaCungCap]      On [NhaCungCap].Id      = [NguyenLieu].IdNhaCC " +
                "Join  [DonViNguyenLieu] ON [DonViNguyenLieu].Id = [NguyenLieu].IdDonViNguyenLieu " +
                "Where [HoaDonKho].Ngay = @Ngay", con);

            cmd.Parameters.AddWithValue("Ngay", Ngay);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow row in dt.Rows)
            {
                int HoaDonKhoId = Convert.ToInt32(row["MaHoaDon"]);
                HoaDonNhap model;
                var existingItem = models.FirstOrDefault(item => item.MaHoaDon == HoaDonKhoId);
                NguyenLieuItem nguyenLieu = new NguyenLieuItem
                {
                    TenNguyenLieu = row["TenNguyenLieu"].ToString(),
                    DonVi = row["DonVi"].ToString(),
                    DonGia = Convert.ToInt32(row["DonGia"]),
                    SoLuong = Convert.ToSingle(row["SoLuong"]),
                    ThanhTienItem = Convert.ToInt32(row["SoLuong"]) * Convert.ToInt32(row["DonGia"])
                };
                if (existingItem == null)
                {
                    model = new HoaDonNhap();
                    model.Id = Convert.ToInt32(row["Id"]);
                    model.MaHoaDon = HoaDonKhoId;
                    model.Ngay = row["Ngay"].ToString();
                    model.Gio = row["Gio"].ToString();
                    model.TenNV = row["TenNV"].ToString();
                    model.TenNhaCC = row["Ten"].ToString();
                    model.SDT = row["SoDienThoai"].ToString();
                    model.DiaChi = row["DiaChi"].ToString();
                    model.Items = new List<NguyenLieuItem>();
                    models.Add(model);
                }
                else
                {
                    model = existingItem;
                }
                var existingNguyenLieu = model.Items.FirstOrDefault(item => item.TenNguyenLieu == nguyenLieu.TenNguyenLieu);
                if (existingNguyenLieu != null)
                {
                    existingNguyenLieu.SoLuong += nguyenLieu.SoLuong;
                    existingNguyenLieu.ThanhTienItem += nguyenLieu.ThanhTienItem;
                }
                else
                {
                    model.Items.Add(nguyenLieu);
                }

                model.ThanhTien += nguyenLieu.ThanhTienItem;
            }
            return Ok(models);
        }
    }
}
