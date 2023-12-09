fetch("http://localhost:5225/api/NhanVien/GetNhanVien")
  .then(function (response) {
    return response.json();
  })
  .then(function (infor_list) {
    infor_list.forEach(function (infor) {
      makeEmployeeOption(maNVorder, infor);
      makeEmployeeOption(maNVResource, infor);
    });
  });

function makeEmployeeOption(select, infor) {
  $(`#${select}`).innerHTML += `
    <option value="${infor.maVN}">${infor.hoTen}</option>
  `;
}
