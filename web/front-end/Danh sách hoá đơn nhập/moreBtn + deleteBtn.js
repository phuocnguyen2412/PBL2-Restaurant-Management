let index = 1;

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
                resource_list.forEach(function (infor) {
                    $(`.idNguyenLieu${index}`).innerHTML = resources.join("");
                });
            });

            $(".more").onclick = function (event) {
                event.preventDefault();
                $(".moreResource").innerHTML += `   
                        <tr class="input-row">
                            <td>
                                <select
                                    type="text"
                                    name="idNguyenLieu${index}"
                                    class="idNguyenLieu${index} w-100"
                                >
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="soLuong${index}"
                                    class="soLuong${index}"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="donGia${index}"
                                    class="donGia${index}"
                                />
                            </td>
                        </tr>
                    `;

                $(`.idNguyenLieu${index}`).innerHTML = resources.join("");
                ++index;
            };

            $(".deleteMore").onclick = function () {
                index = 1;
                $(".moreResource").innerHTML = ` `;
            };

            return resources;
        });
};
