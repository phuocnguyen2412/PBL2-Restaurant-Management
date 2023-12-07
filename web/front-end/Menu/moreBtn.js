const moreButton = $$(".more");
moreButton.forEach(function (button) {
    button.onclick = function (e) {
        e.preventDefault();
        $("#resource-input-table").innerHTML += `   
            <tr class="input-row">
                <td>
                    <input
                        type="text"
                        name="idNguyenLieu"
                        class="idNguyenLieu"
                    />
                </td>
                <td>
                    <input
                        type="number"
                        name="soLuong"
                        class="soLuong"
                    />
                </td>
                <td>
                    <input
                        type="number"
                        name="donGia"
                        class="donGia"
                    />
                </td>
            </tr>
        `;
    };
});
