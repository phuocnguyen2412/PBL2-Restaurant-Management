let index = 1;
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

        $$(".more-dish-bill").forEach(function (btn) {
            btn.onclick = function (e) {
                console.log(btn.name);
                e.preventDefault();
                $(`.more-dish-bill-${btn.name}`).innerHTML += `   
					<tr class="more-input-row-dish MoreDish${btn.name}">
						<td>
							<select
								type="text"
								name="idMonAnMoreDish${btn.name}-${index}"
								class="idMonAnMoreDish${btn.name}-${index}"
							>
							</select>
						</td>
						<td>
							<input
								type="number"
								name="soLuongMonAn${index}"
								class="soLuongMonAnMoreDish${btn.name}-${index}"
								value="0"
							/>
						</td>
						<td>
							<input
								value ="0";
								type="number"
								name="phanTramKhuyenMaiMoreDish${btn.name}-${index}"
								class="phanTramKhuyenMaiMoreDish${btn.name}-${index}"
							/>
						</td>
						<td>
                                <input type="textarea" name="ghiChu0" id="ghiChuMoreDish${btn.name}-${index}" />
						</td>
					</tr>
				`;

                $(`.idMonAnMoreDish${btn.name}-${index}`).innerHTML = dishes;
                index++;
                console.log(index);
            };
        });
        $$(".delete-dish-bill").forEach(function (btn) {
            btn.onclick = function () {
                $(`.more-dish-bill-${btn.name}`).innerHTML = ` `;
                index = 1;
            };
        });
    });
