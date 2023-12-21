using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace PBL2.Models
{
    public class HoaDonXuat
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string MaHoaDon { get; set; }
        public string SoBan { get; set; }
        public string Ngay { get; set; }
        public string Gio { get; set; }
        public string TenNV { get; set; }
        public List<MonAnItem> Items { get; set; }
        public int ThanhTien { get; set; }
        public int KhuyenMai { get; set; }
        public int TongCong { get; set; }
        public string TrangThai { get; set; }
    }
    public class MonAnItem
    {
        public string TenMonAn { get; set; }
        public int GiaMon { get; set; }
        public int SoLuong { get; set; }
        public int ThanhTienItem { get; set; }
        public int PhanTramKhuyenMaiItem { get; set; }
        public int KhuyenMaiItem { get; set; }
    }
}
