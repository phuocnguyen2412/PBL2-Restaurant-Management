fetch("http://localhost:5225/api/NhanVien/GetNhanVien")
  .then(function (response) {
    return response.json();
  })
  .then(function (infor_list) {
    infor_list.forEach(function (infor) {
      
      $(`#idNhaCungCap`).innerHTML += `
    <option value="${infor.id}">${infor.ten}</option>
  `;
    });
  });

function makeEmployeeOption(select, infor) {
  $(`#${select}`).innerHTML += `
    <option value="${infor.id}">${infor.ten}</option>
  `;
}
