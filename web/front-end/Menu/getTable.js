

fetch("http://localhost:5225/api/HoaDonXuat/HoaDon")
    .then(function (response) {
        return response.json();
    })
    .then(function (bills) {
        console.log(bills)
        let bill_list = bills.map(function (bill) {
            return `
                    <div id="bill-${bill.maHoaDon}"class="col-3 card ">
                        <div class="card-header">${bill.soBan}</div>
                        <div class="card-body">
                            Tạo bởi: ${bill.hoTen}<br />
                            Trạng thái: ${bill.trangThai}
                        </div>
                        <div class="card-footer d-grid">
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
                            Cảm ơn quý khánh đã ủng hộ nhà hàng của chúng tôi!
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
            $(`.table-detail-bill-${bill.maHoaDon}`).innerHTML = items.join("") + ` <tr><td style="padding-left: 10px"></td><td></td> <td></td> <td></td><td>${bill.thanhTien}</td> <td>${bill.tongCong}</td></tr>`;

            $(`#open-detail-bill-id${bill.maHoaDon}`).onclick = function () {
                $(`#detail-bill-${bill.maHoaDon}`).style.display = "flex";
            };
            $(`.close-${bill.maHoaDon}`).onclick = function () {
                $(`#detail-bill-${bill.maHoaDon}`).style.display = "none";
            };
        });
        return bills;
    })

    .then(function (bill_list) {
        const bills = [];
        bill_list.forEach(function (bill) {
            bills[bill.id] = bill;
        });
        let date = new Date();
        $$(".bill-finish").forEach(function (btn) {
            function handleUpdateBill(event) {
                let order = {
                    maHoaDon: btn.id,
                    gio: `${date.getHours()}:${
                        date.getMinutes()}`,
                    ngay: `${date.getDate()}/${
                        date.getMonth() + 1
                    }/${date.getFullYear()}`,
                };
                console.log(order)
                fetch("http://localhost:5225/api/Order/Xuathoadonbutton", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(order),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }

                        return response.json();
                    })
                    .then((orderItem) => {
                        location.reload();
                        function showSuccessToast() {
                            toast({
                                title: "Thành công!",
                                message: "Đã xuất hóa đơn thành công ",
                                type: "success",
                                duration: 5000,
                            });
                        }
                        showSuccessToast();
                    })
                    .catch((error) => {
                        function showSuccessToast() {
                            toast({
                                title: "Thất bại!",
                                message: "Xuất hóa đơn thất bại do lỗi API",
                                type: "error",
                                duration: 5000,
                            });
                        }
                        showSuccessToast();
                    });
            }
            btn.onclick = function () {
                handleUpdateBill();
            };
        });
    });


