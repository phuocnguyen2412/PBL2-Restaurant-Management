fetch(`http://localhost:5225/api/MonAn/MonAn`)
    .then(function (response) {
        return response.json();
    })
    .then(function (dish_list) {
        let dishes = dish_list.map(function (dish) {
            return `
                <option value="${dish.id}">${dish.tenMon}</option>
            `;
        });

        dishes = dishes.join("");
        $$(".more-dish").forEach(function (button, index) {
            button.onclick = function (e) {
                e.preventDefault();
                $("#dish-input-table").innerHTML += `   
                    <tr class="input-row-dish">
                        <td>
                            <select
                                type="text"
                                name="idMonAn${++index}"
                                class="idMonAn${index} idMonAn"
                            >
                            </select>
                        </td>
                        <td>
                            <input
                                type="number"
                                name="soLuongMonAn${index}"
                                class="soLuongMonAn${index}"
                                value="0"
                            />          
                        </td>
                        <td>
                            <input
                                value ="0";
                                type="number"
                                name="phanTramKhuyenMai${index}"
                                class="phanTramKhuyenMai${index}"
                            />
                        </td>
                        <td>
                                    <input type="textarea" name="ghiChu0" id="ghiChu${index}" />
                                </td>
                    </tr>
                `;

                $(`.idMonAn${index}`).innerHTML = dishes;
            };
        });
    });
