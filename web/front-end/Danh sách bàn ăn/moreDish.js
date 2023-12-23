let index_input = 0;
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
        $$(".more-dish").forEach(function (button) {
            button.onclick = function (e) {
                e.preventDefault();
                $("#dish-input-table").innerHTML += `   
                    <tr class="input-row-dish">
                        <td>
                            <select
                                type="text"
                                name="idMonAn${index_input}"
                                class="idMonAn${index_input} idMonAn"
                            >
                            </select>
                        </td>
                        <td>
                            <input
                                type="number"
                                name="soLuongMonAn${index_input}"
                                class="soLuongMonAn${index_input}"
                                value="0"
                            />          
                        </td>
                        <td>
                            <input
                                value ="0";
                                type="number"
                                name="phanTramKhuyenMai${index_input}"
                                class="phanTramKhuyenMai${index_input}"
                            />
                        </td>
                        <td>
                                    <input type="textarea" name="ghiChu0" id="ghiChu${index_input}" />
                                </td>
                    </tr>
                `;

                $(`.idMonAn${index_input}`).innerHTML = dishes;
                index_input++;
            };
        });
    });
