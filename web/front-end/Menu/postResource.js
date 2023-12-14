
function postHoaDon() {
  let date = new Date();
  $$(".input-row").forEach(function (row, index) {
    postData = {
      gio: `${date.getHours()}:${
        date.getMinutes()}`,
    ngay: `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()}`,
      idNhaCC: $("#idNhaCungCap").value,
      maNV: $("#maNVResource").value,
      maHoaDon: $("#idHoaDonKho").value,
      idNguyenLieu: $(`.idNguyenLieu${index}`).value,
      soLuong: $(`.soLuong${index}`).value,
      donGia: $(`.donGia${index}`).value,
    };

    console.log(postData);

    fetch("http://localhost:5225/api/HoaDonKho/PostHoaDonKho", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.message)
        if (response.message != "Đã tạo bản ghi!") {
          throw "lỗi";
        }
        return response;
      })
      .then((message) => {
        function showSuccessToast() {
          toast({
            title: "Thành công!",
            message: "Đã thêm hóa đơn thành công!",
            type: "success",
            duration: 5000,
          });
        }
        showSuccessToast();
      })
      .catch((message) => {
        function showErrorToast() {
          toast({
            title: "Thất bại!",
            message: "Không thể thêm hóa đơn do lỗi API!!!!",
            type: "error",  
            duration: 5000,
          });
        }
        showErrorToast();
      });
})}

$("#btn-submit-resource-bill").addEventListener("click", function (event) {
  event.preventDefault();
  postHoaDon();
});
