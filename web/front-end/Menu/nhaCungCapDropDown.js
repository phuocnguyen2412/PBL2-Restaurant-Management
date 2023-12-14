fetch("http://localhost:5225/api/NhaCC/GetNhaCC")
    .then(function (response) {
        return response.json();
    })
    .then(function (infor_list) {
        infor_list.forEach(function (infor) {
            $(`#idNhaCungCap`).innerHTML += `
        <option value="${infor.id}">${infor.tenNhaCC}</option>
      `;
        });
        return infor_list;
    })
    .then(function (infor_list) {
        $(`#idNhaCungCap`).onchange = function () {
            let id = $("#idNhaCungCap").value;
            fetch(`http://localhost:5225/api/NhaCC/GetNguyenLieuByNhaCC/${id}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (resource_list) {
                    let resources = resource_list.map(function (resource) {
                        return `
            <option value="${resource.id}">${resource.tenNguyenLieu}</option>
          `;
                    });

                    $$(".input-row").forEach(function (input, index) {
                        console.log($(`.idNguyenLieu${index}`));
                        resource_list.forEach(function (infor) {
                            $(`.idNguyenLieu${index}`).innerHTML =
                                resources.join("");
                        });
                    });
                    return resource_list;
                });
        };
    });
