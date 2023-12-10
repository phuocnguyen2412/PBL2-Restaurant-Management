function findEmployeeByName(name) {
  // Kiểm tra xem id có tồn tại không
  if (!id) {
    console.error("ID is required");
    return;
  }

  fetch(`url_of_your_api/employees/${name}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((infor) => {
      $("#employee-info").innerHTML = `
        <tr>
            <td class="text-center">${infor.maNV}</td>
            <td>${infor.hoTen}</td>
            <td class="text-center">${infor.gioiTinh}</td>
            <td class="text-center">${infor.cccd}</td>

            <td>${infor.thuongTru}</td>
            <td>${infor.email}</td>

            <td class="text-center">${infor.ngaySinh}</td>
            <td class="text-center">${infor.chucVu}</td>
            <td
                class="d-flex align-items-center justify-content-center"
            >
                <button id="update-${infor.maNV}" class="btn btn-info me-2"></button
                ><button id="delete-${infor.maNV}" class="btn btn-danger"></button>
            </td>
        </tr>
        `;
    })
    .catch((error) => {
      function showSuccessToast() {
        toast({
          title: "Thất bại thành công!",
          message: "Không tồn tại tên nhân viên đã nhập",
          type: "error",
          duration: 5000,
        });
      }
      showSuccessToast();
    });
}

$("#findEmployeeByName").onclick = function (event) {
  event.preventDefault();
  findEmployeeById($("#hoVaTen-timkiem").value);
};
