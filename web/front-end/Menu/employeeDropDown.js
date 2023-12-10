fetch("http://localhost:5225/api/NhanVien/GetNhanVien")
  .then(function (response) {
    return response.json();
  })
  .then(function (infor_list) {
    console.log(infor_list)
    infor_list.forEach(function (infor) {
      $(`#maNVorder`).innerHTML += `
        <option value="${infor.id}">${infor.hoTen}</option>
      `;
      $(`#maNVResource`).innerHTML += `
        <option value="${infor.id}">${infor.hoTen}</option>
      `;
      // makeEmployeeOption(maNVorder, infor);
      // makeEmployeeOption(maNVResource, infor);
    });
  });

function makeEmployeeOption(select, infor) {
  console.log($(`#${select}`))
  $(`#${select}`).innerHTML += `
    <option value="${infor.id}">${infor.hoTen}</option>
  `;
}
