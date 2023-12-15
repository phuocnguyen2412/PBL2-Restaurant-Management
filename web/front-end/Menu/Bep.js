function Show(orderItem) {
    $("#orderItem-list").innerHTML += `
        <div id="orderItem-${orderItem_list.list.length - 1}"
            class="col-4 card">
        <div class="card-header">
            <input id="btn-done-${
                orderItem_list.list.length - 1
            }"class="btn-done" type="checkbox" />
            <h4 class="text-center">Món ăn hóa đơn ${orderItem.maHoaDon}</h4>
        </div>
        <div class="card-body">
            Bàn số: ${orderItem.soBan} <br />
            Tên món ăn: ${orderItem.tenMon} <br /> Số lượng: ${
        orderItem.soLuong
    }  <br />
            Ghi chú: ${orderItem.ghiChu} 
        </div>
        <div class="card-footer">
            <table>
                <table class="table table-bordered">
                    <thead>
                        <tr class="table-success">
                            <th>Mã nguyên liệu</th>
                            <th style="padding-left: 10px">
                                Tên nguyên liệu
                            </th>
                            <th>Số lượng</th>
                            <th>Đơn vị</th>
                        </tr>
                    </thead>
                    <tbody class="table-resource-orderItem">
                        <tr>
                            <td>....</td>
                            <td>....</td>
                            <td>....</td>
                            <td>....</td>
                        </tr>
                    </tbody>
                </table>
            </table>
        </div>
    </div>
        `;
}
