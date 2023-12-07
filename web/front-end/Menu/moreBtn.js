const moreButton = $$(".more");
moreButton.forEach(function (button) {
    button.onclick = function (e) {
        e.preventDefault();
        $("#resource-input-table").innerHTML += `   
            <tr class="input-row">
                <td>
                    <input type="text" name="" id="idNguyenLieu" />
                </td>
                <td>
                    <input type="number" name="soLuongNguyenLieu" id="" />
                </td>
                <td>
                    <input
                        type="number"
                        name=""
                        id="donGia"
                    />
                </td>
            </tr>
        `;
    };
});
