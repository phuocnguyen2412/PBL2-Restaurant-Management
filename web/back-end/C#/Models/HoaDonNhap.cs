using System.ComponentModel.DataAnnotations;

namespace PBL2.Models
{
    public class HoaDonNhap
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int MaHoaDon { get; set; }
        public string Ngay { get; set; }
        public string Gio { get; set; }
        public string TenNV { get; set; }
        public string TenNhaCC { get; set; }
        public string SDT { get; set; }
        public string DiaChi { get; set; }
        public List<NguyenLieuItem> Items { get; set; }
        public float ThanhTien { get; set; }
    }
    public class NguyenLieuItem
    { 
        public string TenNguyenLieu { get; set; }
        public float SoLuong { get; set; }
        public int DonGia { get; set; }
        public string DonVi { get; set; }
        public float ThanhTienItem { get; set; }
    }
}
