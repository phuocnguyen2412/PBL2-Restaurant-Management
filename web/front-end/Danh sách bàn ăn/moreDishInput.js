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
        $$(".more-dish-bill").forEach(function (btn, index) {
            btn.onclick = function (e) {
                console.log(btn.name);
                e.preventDefault();
                $(`#dish-input-table-${btn.name}`).innerHTML += `   
					<tr class="more-input-row-dish.MoreDish${btn.name}">
						<td>
							<select
								type="text"
								name="idMonAnMoreDishBill${btn.name}-${++index}"
								class="idMonAnMoreDishBill${btn.name}-${index}"
							>
							</select>
						</td>
						<td>
							<input
								type="number"
								name="soLuongMonAn${index}"
								class="soLuongMonAnMoreDishBill${btn.name}-${index}"
								value="0"
							/>
						</td>
						<td>
							<input
								value ="0";
								type="number"
								name="phanTramKhuyenMaiMoreDishBill${btn.name}-${index}"
								class="phanTramKhuyenMaiMoreDishBill${btn.name}-${index}"
							/>
						</td>
						<td>
                                <input type="textarea" name="ghiChu0" id="ghiChuMoreDishBill${
                                    btn.name
                                }-${index}" />
						</td>
					</tr>
				`;

                $(`.idMonAnMoreDishBill${btn.name}-${index}`).innerHTML =
                    dishes;
            };
        });
    });
