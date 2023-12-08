const moreButton = $$(".more");
moreButton.forEach(function (button,index) {
    button.onclick = function (e) {
        e.preventDefault();
        $("#resource-input-table").innerHTML += `   
            <tr class="input-row">
                <td>
                    <input
                        type="text"
                        name="idNguyenLieu${index++}"
                        class="idNguyenLieu${index}"
                    />
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
    };
});
