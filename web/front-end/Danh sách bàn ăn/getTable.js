showBill();
function showBill() {
    fetch("http://localhost:5225/api/HoaDonXuat/HoaDon")
        .then(function (response) {
            return response.json();
        })
        .then(function (bills) {
            let bill_list = bills.map(function (bill) {
                return `
                            <div id="bill-${bill.maHoaDon}"class="col-4 card ">
                                <div class="card-header text-center">${bill.soBan}</div>
                                <div class="card-body">
                                    Tạo bởi: ${bill.tenNV}<br />
                                    Trạng thái: ${bill.trangThai}
                                </div>
                                <div class="card-footer d-grid">
                                <button id="${bill.maHoaDon}" class="btn btn-outline-success inputDish mb-2" data-bs-toggle="modal" data-bs-target="#modal-${bill.maHoaDon}">Thêm món ăn</button>

                                    <button id="open-detail-bill-id${bill.maHoaDon}"class="btn btn-outline-success">Chi tiết</button>
                                </div>
                            </div>
                        `;
            });

            $("#bill-list").innerHTML = bill_list.join("");

            // detail bill
            let detail_bill_list = bills.map(function (bill) {
                return `
                    <div
                        id="detail-bill-${bill.maHoaDon}"
                        class="card new-layer detail-bill"
                        style="display: none;z-index: 10;"
                    >
                        <div class="container">
                            <div class="card-header">
                                <button class="btn btn-danger close-${bill.maHoaDon} float-end p-1 m-1">
                                    <i class="ti-close"></i>
                                </button>
                                <button id="${bill.maHoaDon}" class="btn btn-success bill-finish float-end p-1 m-1">Xuất hoá đơn</button>
                                <h4 class="text-center">Hóa đơn ID${bill.maHoaDon}</h4>
                            </div>
                            <div class="card-body">
                                <table class="table">
                                    <thead>
                                        <tr class="table-success">
                                            <th style="padding-left: 10px">
                                                Tên món ăn
                                            </th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>% Khuyến mãi</th>
                                            <th>Thành tiền</th>
                                            <th>Khuyến mãi</th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="table-detail-bill-${bill.maHoaDon}"
                                    ></tbody>
                                </table>
                                <div class="row">
                                    <div class="col-6 bill-img d-flex ">
                                        <img src="../Danh sách hoá đơn xuất/img/QRcode.jpg" alt="">
                                    </div>
                                    <div class="col-6">
                                        <h4> Tổng tiền: </h4> <h2>${bill.tongCong} VNĐ </h2> <br />
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <h4 class="text-center">
                                    Cảm ơn quý khách đã ủng hộ nhà hàng của chúng tôi!
                                </h4>
                            </div>
                        </div>
                    </div>
                    `;
            });

            $(".detail-bill-list").innerHTML = detail_bill_list.join("");

            bills.forEach(function (bill) {
                let items = bill.items.map(function (i) {
                    return `
                            <tr>
                                <td style="padding-left: 10px">${i.tenMonAn}</td>
                                <td>${i.soLuong}</td>
                                <td>${i.giaMon}</td>
                                <td>${i.phanTramKhuyenMaiItem}</td>
                                <td>${i.thanhTienItem}</td>
                                <td>${i.khuyenMaiItem}</td>
        
                            </tr>
                        `;
                });
                $(`.table-detail-bill-${bill.maHoaDon}`).innerHTML =
                    items.join("") +
                    ` <tr><td style="padding-left: 10px"></td><td></td> <td></td> <td></td><td>${bill.thanhTien}</td> <td>${bill.khuyenMai}</td></tr>`;

                $(`#open-detail-bill-id${bill.maHoaDon}`).onclick =
                    function () {
                        $(`#detail-bill-${bill.maHoaDon}`).style.display =
                            "flex";
                    };
                $(`.close-${bill.maHoaDon}`).onclick = function () {
                    $(`#detail-bill-${bill.maHoaDon}`).style.display = "none";
                };
            });


            //MoreDish
            bills.forEach(function(bill){
                $(".moreDishBill").innerHTML +=`
                    <div class="modal" id="modal-${bill.maHoaDon}">
                        <div class="modal-dialog modal-dialog-centered modal-xl ">
                            <div class="modal-content">

                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title">${bill.soBan}</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <!-- Modal body -->
                            <div class="modal-body">
                                <input
                                name=""
                                id="idHoaDonMoreDish"
                                value="${bill.maHoaDon}"
                                style="display: none;"
                                />
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <td style="padding-left: 10px">Tên món ăn</td>
                                            <td align="center">Số lượng</td>
                                            <td align="center">% khuyến mãi</td>
                                            <td align="center">Ghi chú</td>
                                        </tr>
                                    </thead>
                                    <tbody id="dish-input-table">
                                        <tr class="input-row-dish MoreDish${bill.maHoaDon}">
                                            <td>
                                                <select
                                                    type="text"
                                                    name="idMonAn0"
                                                    class="idMonAnMoreDish${bill.maHoaDon}-0 idmonAn"
                                                ></select>
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="soLuongMonAnMoreDish0"
                                                    class="soLuongMonAnMoreDish${bill.maHoaDon}-0"
                                                    value="0"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    value="0"
                                                    type="number"
                                                    name="phanTramKhuyenMaiMoreDish0"
                                                    class="phanTramKhuyenMaiMoreDish${bill.maHoaDon}-0"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="textarea"
                                                    name="ghiChuMoreDish0"
                                                    id="ghiChuMoreDish${bill.maHoaDon}-0"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button class="more-dish btn btn-dark">Thêm món ăn</button>
                            </div>

                            <!-- Modal footer -->
                            <div class="modal-footer">
                                <button
                                    id="${bill.maHoaDon}"
                                    class="btn btn-dark float-end confirm-moreDishInput"
                                >
                                    Xác nhận
                                </button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </div>

                            </div>
                        </div>
                    </div>
                `;
                    
            })
            return bills;
        })

        .then(function (bills) {
            let date = new Date();
            $$(".bill-finish").forEach(function (btn) {
                function handleUpdateBill(event) {
                    let order = {
                        maHoaDon: btn.id,
                        gio: `${date.getHours()}:${date.getMinutes()}`,
                        ngay: `${date.getDate()}/${
                            date.getMonth() + 1
                        }/${date.getFullYear()}`,
                    };
                    console.log(order);
                    fetch("http://localhost:5225/api/Order/Xuathoadonbutton", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(order),
                    }).then(() => {
                        $(`#detail-bill-${btn.id}`).remove();
                        showBill();
                        toast({
                            title: "Thành công!",
                            message: "Đã xuất hóa đơn thành công ",
                            type: "success",
                            duration: 5000,
                        });
                    });
                }
                btn.onclick = function (event) {
                    event.preventDefault();
                    handleUpdateBill();
                };
            });
           
        })
        .then(()=>{
            console.log(document.querySelectorAll(".confirm-moreDishInput"))
$$(".confirm-moreDishInput").forEach(function(btn){
 
    btn.onclick = function (event) {
        
        event.preventDefault();
        $$(`.MoreDish${btn.id}`).forEach(function (dish, index) {
            
            console.log(data)
            if (data.soLuong > 0) {
                fetch("http://localhost:5225/api/Order/PostOrder", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((orderItem) => {
                        toast({
                            title: "thành công!",
                            message:
                                "Thêm món thành công!",
                            type: "success",
                            duration: 5000,
                        });
    
                        showBill();
                        const modal = new bootstrap.Modal(document.getElementById(`modal-${btn.id}`));
modal.hide();
                    })
                    .catch((error) => {
                        toast({
                            title: "Thất bại!",
                            message:
                                "Thêm món thất bại",
                            type: "error",
                            duration: 5000,
                        });
                    });
            } else {
                toast({
                    title: "Thất bại!",
                    message: "Số lượng phải lớn hơn 0!",
                    type: "error",
                    duration: 5000,
                });
            }
        });
    };
    
})

        })
}
