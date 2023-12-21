using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Runtime.Serialization;

namespace PBL2.Models
{
    public class HoaDonKho
    { 
        public int MaHoaDon { get; set; }
        public string Ngay { get; set; }   
        public string Gio {  get; set; }
        public int IdNhaCC { get; set; }
        public string TenNV { get; set; }
        public int IdNguyenLieu { get; set; }
        public float SoLuong { get; set; }
        public int DonGia { get; set; }
    }
}
