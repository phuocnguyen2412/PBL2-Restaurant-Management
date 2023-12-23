fetch("http://localhost:5225/api/NhaCC/GetNhaCC")
    .then(function (response) {
        return response.json();
    })
    .then(function (infor_list) {
        nhaCC_list = infor_list.map(function (infor) {
            return `<option value="${infor.id}">${infor.tenNhaCC}</option>`;
        });
        $(`#idNhaCungCap`).innerHTML += nhaCC_list.join("");

        return infor_list;
    });
