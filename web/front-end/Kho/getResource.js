fetch("http://localhost:5225/api/NguyenLieu/NguyenLieu")
    .then(function (response) {
        return response.json();
    })
    .then(function (resources) {
        let resource_list = resources.map(function (resource) {
            return `
                    <tr>
                        <td style="padding-left: 10px;">${resource.tenNguyenLieu}</td>
                        <td align="center">${resource.soLuongTonKho}</td>
                        <td align="center">${resource.donVi}</td>
                    </tr>
                `;
        });

        document.querySelector("#resource-list").innerHTML +=
            resource_list.join("");
    });
