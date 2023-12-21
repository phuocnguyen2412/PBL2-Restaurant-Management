using System.ComponentModel.DataAnnotations;
using System.Security.AccessControl;

namespace PBL2.Models

{
    public class NhanVien
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string HoTen { get; set; }
        public string GioiTinh { get; set; }
        public string Email { get; set; } 
        public string NgaySinh { get; set; } 
        public string CCCD { get; set; } 
        public string ThuongTru { get; set; } 
        public string ChucVu { get; set; } 
    }
}
