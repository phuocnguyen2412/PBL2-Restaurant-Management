using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace PBL2.Models
{
    public class Order
    {
        public string MaHoaDon { get; set; }
        public string TenNV { get; set; }
        public string Ngay { get; set; }
        public string Gio { get; set; }
        public int SoBan { get; set; }
        public int PhanTramKhuyenMai { get; set; }
        public string TrangThaiMon { get; set; }
        public int IdMonAn { get; set; }
        public int SoLuong { get; set; }
        public string GhiChu { get; set; }
    }
}
