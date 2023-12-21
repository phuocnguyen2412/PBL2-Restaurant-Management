using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace PBL2.Models
{
    public class NguyenLieu 
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public float SoLuongTonKho { get; set; }
        public string DonVi { get; set; }
        public string TenNguyenLieu { get; set; }
        public int IdNhaCC { get; set; }
    }
}
