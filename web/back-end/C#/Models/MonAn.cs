using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;
using System.Runtime.Serialization;

namespace PBL2.Models
{
    public class MonAn
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string TenMon { get; set; }
        public int GiaMon { get; set; }
        public int IdNhomThucPham { get; set; }
        public string LinkAnh { get; set; }
        public string ThanhPhan {  get; set; }
    }
}
