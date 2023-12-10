function postHoaDonItem() {
  $$(".input-row").forEach(function (row, index) {
    postData = {
      idHoaDonKho: $("#idHoaDonKho").value,
      idNguyenLieu: $(`.idNguyenLieu${index}`).value,
      soLuong: $(`.soLuong${index}`).value,
      donGia: $(`.donGia${index}`).value,
    };

    console.log(postData);

    fetch("http://localhost:5225/api/HoaDonKhoItems/PostHoaDonKhoItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.ok) {
          throw "lỗi";
        }
        return response.json();
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
        function showSuccessToast() {
          toast({
            title: "Thất bại!",
            message: "Không thể thêm hóa đơn do lỗi API",
            type: "error",
            duration: 5000,
          });
        }
        showSuccessToast();
      });
  });
}
function postHoaDon() {
  let order = {
    // id: 0,
    ngay: $("#NgayNhap").value,
    gio: $("#gioNhap").value,
    idNhaCC: $("#idNhaCungCap").value,
    maNV: $("#maNVResource").value,
  };
  console.log(order);
  //POST HoaDon
  fetch("http://localhost:5225/api/OrderItems/PostOrderItems", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      if (!response.ok) {
        throw "lỗi";
      }
      return response.json();
    })
    .then((orderItem) => {
      function showSuccessToast() {
        toast({
          title: "Thành công!",
          message: "Đã tạo hóa đơn thành công",
          type: "success",
          duration: 5000,
        });
      }
      showSuccessToast();
    })
    .catch((orderItem) => {
      function showSuccessToast() {
        toast({
          title: "Thất bại!",
          message: "Tạo hóa đơn thất bại",
          type: "error",
          duration: 5000,
        });
      }
      showSuccessToast();
    });
}
function SubmitResourceBill(event) {
  postHoaDon().then(() => {
    postHoaDonItem();
  });
}

$("#btn-submit-resource-bill").addEventListener("click", function (event) {
  event.preventDefault();
  SubmitResourceBill(event);
});
