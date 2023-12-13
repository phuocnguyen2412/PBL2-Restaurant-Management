$$(".more-dish").forEach(function (button, index) {
  button.onclick = function (e) {
    e.preventDefault();
    $("#dish-input-table").innerHTML += `   
            <tr class="input-row-dish">
                <td>
                    <select
                        type="text"
                        name="idMonAn${index++}"
                        class="idMonAn${index}"
                    >
                    </select>
                </td>
                <td>
                    <input
                        type="number"
                        name="soLuongMonAn${index}"
                        class="soLuongMonAn${index}"
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
                          <input type="textarea${index}" name="ghiChu0" id="ghiChu0" />
                        </td>
            </tr>
        `;
  };
});
