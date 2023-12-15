fetch("http://localhost:5225/api/NhanVien/GetNhanVien")
    .then(function (response) {
        return response.json();
    })
    .then(function (infor_list) {
   
        infor_list.forEach(function (infor) {
            $(`#maNVorder`).innerHTML += `
        <option value="${infor.hoTen}">${infor.hoTen}</option>
      `;
            $(`#maNVResource`).innerHTML += `
        <option value="${infor.hoTen}">${infor.hoTen}</option>
      `;
        });
    });
