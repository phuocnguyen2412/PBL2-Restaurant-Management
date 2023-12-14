function findInputBillById(name) {
  const id = $("#billID").value
  // Kiểm tra xem id có tồn tại không
  if (!id) {
    console.error("ID is required");
    return;
  }

  fetch(`http://localhost:5225/api/HoaDonNhap/FindHoaDonNhapByMaHoaDon?MaHoaDon=${id}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
   
})
    .then((response) => {
      console.log(response.ok)
      return response.json();
    })
    .then((infor) => {
      console.log(infor)
      if (infor.length==0) {
        throw new Error(`Error: ${response.status}`);
      }
      showBill(infor)
    })
    .catch((error) => {
      console.log(error)
        function showSuccessToast() {
            toast({
                title: "Thất bại!",
                message: "Không tồn tại tên nhân viên đã nhập",
                type: "error",
                duration: 5000,
            });
        }
        showSuccessToast();
    });
}

$("#findBillByID").onclick = function (event) {

  event.preventDefault();
  findInputBillById($("#billID").value);
};
