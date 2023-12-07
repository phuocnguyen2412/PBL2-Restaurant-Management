using System.Data.SqlTypes;
using System.Runtime.Serialization;

namespace PBL2.Models
{
    public class MonAn
    {
        [DataMember(Name = "Id")]
        public int Id { get; set; }
        [DataMember(Name = "TenMon")]
        public string TenMon { get; set; }
        [DataMember(Name = "GiaMon")]
        public int GiaMon { get; set; }
        [DataMember(Name = "IdNhomMonAn")]
        public int IdNhomMonAn { get; set; }
        [DataMember(Name = "LinkAnh")]
        public string LinkAnh { get; set; }
        [DataMember(Name = "ThanhPhan")]
        public string ThanhPhan {  get; set; }
    }
}
