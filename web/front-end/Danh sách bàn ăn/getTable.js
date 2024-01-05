const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
getBill();
function getBill() {
    fetch("http://localhost:5225/api/HoaDonXuat/HoaDon")
        .then(function (response) {
            return response.json();
        })
        .then(function (bills) {
            showBill(bills);
            return bills;
        })
        .then(function (bills) {
            moreDishInput();
            if ($(".modal-backdrop")) $(".modal-backdrop").remove();
            return bills;
        })
        .then((bills) => {
            //XUẤT HÓA ĐƠN
            $$(".bill-finish").forEach(function (btn) {
                btn.onclick = function (event) {
                    event.preventDefault();
                    const date = new Date();
                    const data = {
                        maHoaDon: btn.name,
                        ngay: `${date.getDate()}/${
                            date.getMonth() + 1
                        }/${date.getFullYear()}`,
                        gio: `${date.getHours()}:${date.getMinutes()}`,
                    };
                    updateBill(data);
                };
            });

            // POST_ORDERITEM
            $$(".confirm-moreDishInput").forEach(function (btn) {
                btn.onclick = function (event) {
                    event.preventDefault();
                    $$(`.MoreDish${btn.name}`).forEach(function (input, i) {
                        const data = {
                            maHoaDon: btn.name,
                            tenNV: $(`#tenNVMoreDish${btn.name}`).value,
                            soBan: $(`#soBanMoreDish${btn.name}`).value,
                            trangThaiMon: "string",
                            ngay: "string",
                            gio: "string",
                            phanTramKhuyenMai: $(
                                `.phanTramKhuyenMaiMoreDish${btn.name}-${
                                    index - i - 1
                                }`
                            ).value,
                            ghiChu: $(
                                `#ghiChuMoreDish${btn.name}-${index - i - 1}`
                            ).value,
                            idMonAn: $(
                                `.idMonAnMoreDish${btn.name}-${index - i - 1}`
                            ).value,
                            soLuong: $(
                                `.soLuongMonAnMoreDish${btn.name}-${
                                    index - i - 1
                                }`
                            ).value,
                        };
                        console.log(data);
                        if (data.soLuong > 0) {
                            postOrder(data);
                        }
                    });
                };
            });

            //DELETE_ORDERITEM

            $$(".delete-orderItem").forEach(function (btn) {
                btn.onclick = function (event) {
                    event.preventDefault();
                    const OrderItem = {
                        id: btn.id,
                        idMonAn: $(`#idMonAn${btn.id}`).value,
                        soLuong: $(`#soLuong${btn.id}`).value,
                    };
                    deleteOrderItem(btn.id);
                };
            });
        });
}

function showBill(bills) {
    let bill_list = bills.map(function (bill) {
        return `
                            <div id="bill-${bill.maHoaDon}"class="col-4 card ">
                                <div class="card-header text-center"> Bàn số ${bill.soBan}</div>
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
                                <button class="btn btn-danger close-${
                                    bill.maHoaDon
                                } float-end p-1 m-1">
                                    <i class="ti-close"></i>
                                </button>
                                <button name="${
                                    bill.maHoaDon
                                }" class="btn btn-success bill-finish float-end p-1 m-1">Xuất hoá đơn</button>
                                <h4 class="text-center">Hóa đơn ID ${
                                    bill.maHoaDon
                                }</h4>
                            </div>
                            <div class="card-body">
                                <table class="table">
                                    <thead>
                                        <tr class="table-success">
                                            <th style="padding-left: 10px">
                                                Tên món ăn
                                            </th>
                                            <th class="text-center" >Số lượng</th>
                                            <th class="text-center" >Đơn giá</th>
                                            <th class="text-center" >% Khuyến mãi</th>
                                            <th class="text-center" >Thành tiền</th>
                                            <th class="text-center" >Khuyến mãi</th>
                                            <th class="text-center" ></th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="table-detail-bill-${
                                            bill.maHoaDon
                                        }"
                                    ></tbody>
                                </table>
                                <div class="row">
                                    <div class="col-6 bill-img d-flex ">
                                        <img src="../Danh sách hoá đơn xuất/img/QRcode.jpg" alt="">
                                    </div>
                                    <div class="col-6">
                                        <h4 class="text-center"> Tổng tiền: </h4> <h2  class="text-center">${
                                            bill.tongCong / 1000
                                        }.000 VNĐ </h2> <br />
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
                                <td style="padding-left: 10px">${
                                    i.tenMonAn
                                }</td>
                                <td class="text-center" >${i.soLuong}</td>
                                <td class="text-center" >${
                                    i.giaMon / 1000
                                }.000 </td>
                                <td class="text-center" >${
                                    i.phanTramKhuyenMaiItem
                                }</td>
                                <td class="text-center" >${
                                    i.thanhTienItem / 1000
                                }.000</td>
                                <td class="text-center" >${
                                    i.khuyenMaiItem / 1000
                                }.000</td>
                                <td class="text-center" > <span id="${
                                    i.idOrder
                                }" class="material-symbols-outlined delete-orderItem" style="cursor: pointer;">
                                close
                                </span> </td>
                                <input
                                    
                                    id= "idMoAn${i.idOrder}"
                                    value="${i.idMonAn}"
                                    style="display: none;"
                                /><input
                                    
                                    id="soLuong${i.idOrder}"
                                    value="${i.soLuong}"
                                    style="display: none;"
                                />
                            </tr>
                        `;
        });
        $(`.table-detail-bill-${bill.maHoaDon}`).innerHTML =
            items.join("") +
            ` <tr><td style="padding-left: 10px"></td><td></td> <td></td> <td></td><td class="text-center" >${
                bill.thanhTien / 1000
            }.000</td> <td class="text-center" >${
                bill.khuyenMai / 1000
            }.000</td></tr>`;

        $(`#open-detail-bill-id${bill.maHoaDon}`).onclick = function () {
            $(`#detail-bill-${bill.maHoaDon}`).style.display = "flex";
        };
        $(`.close-${bill.maHoaDon}`).onclick = function () {
            $(`#detail-bill-${bill.maHoaDon}`).style.display = "none";
        };
    });

    //MoreDish
    let MoreInputDish = bills.map(function (bill) {
        return `
        <div class="modal" id="modal-${bill.maHoaDon}">
                        <div class="modal-dialog modal-dialog-centered modal-xl ">
                            <div class="modal-content">

                            <!-- Modal Header -->
                            <div class="modal-header">
                                <span>Thêm món ăn</span>
                                <button type="button " class="btn-close float-end" data-bs-dismiss="modal"></button>
                            </div>

                            <!-- Modal body -->
                            <div class="modal-body">
                            <h4 class="modal-title text-center mb-3">Bàn số ${bill.soBan}</h4>
                                <input
                                    name=""
                                    id="tenNVMoreDish${bill.maHoaDon}"
                                    value="${bill.tenNV}"
                                    style="display: none;"
                                />
                                <input
                                name=""
                                id="soBanMoreDish${bill.maHoaDon}"
                                value="${bill.soBan}"
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
                                  
                                    <tbody class="more-dish-bill-${bill.maHoaDon}">
                                    </tbody>
                                </table>
                                <button name="${bill.maHoaDon}" class="more-dish-bill btn btn-dark">Thêm món ăn</button>
                                <button name="${bill.maHoaDon}" class="delete-dish-bill btn btn-dark">Xóa món ăn</button>
                            </div>

                            <!-- Modal footer -->
                            <div class="modal-footer">
                                <button
                                    name="${bill.maHoaDon}"
                                    class="btn btn-primary float-end confirm-moreDishInput"
                                >
                                    Xác nhận
                                </button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </div>

                            </div>
                        </div>
                    </div>
    
    `;
    });
    $(".moreDishBill").innerHTML = MoreInputDish.join("");
}
