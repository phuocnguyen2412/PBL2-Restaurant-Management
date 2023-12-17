fetch("http://localhost:5225/api/NhanVien/GetNhanVienKho")
    .then(function (response) {
        return response.json();
    })
    .then(function (infor_list) {
   
        infor_list.forEach(function (infor) {
            $(`#maNVResource`).innerHTML += `
        <option value="${infor.hoTen}">${infor.hoTen}</option>
      `;
        });
    });
