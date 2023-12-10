const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

fetch("http://localhost:5225/api/HoaDonXuat/HoaDonXuat")
    .then(function (response) {
        return response.json();
    })
    .then(function (bills) {
        // bill
        let bill_list = bills.map(function (bill) {
            return `
                    <div id="bill-${bill.maHoaDon}"class="col-3 card ">
                        <div class="card-header">ID hóa đơn: ${bill.maHoaDon}</div>
                        <div class="card-body">
                            Ngày: ${bill.ngay} <br />
                            Giờ: ${bill.gio} <br />
                            Tạo bởi: ${bill.hoTen}<br />
                        
                            Thành tiền: ${bill.tongCong}<br />
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
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody
                                class="table-detail-bill-${bill.maHoaDon}"
                            ></tbody>
                        </table>
                        <div class="row">
                            <div class="col-6 bill-img">
                                <img src="./img/QRcode.jpg" alt="" />
                            </div>
                            <div class="col-6">
                                Thời gian: ${bill.thoiGian} <br />
                                Tạo bởi: ${bill.hoTen}<br />
                             
                                Thành tiền: ${bill.thanhTien} <br />
                                % Khuyến mãi: ${bill.phanTramKhuyenMai}<br />
                                Khuyến mãi: ${bill.khuyenMai} <br />
                                Tổng tiền:${bill.tongCong} <br />
                                Trạng thái: ${bill.trangThai}
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
                        <td>${i.thanhTienItem}</td>
                    </tr>
                `;
            });
            $(`.table-detail-bill-${bill.maHoaDon}`).innerHTML = items.join("");

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
                    trangThaiThanhToan: "Đã thanh toán",
                };
                console.log(order)
                fetch("http://localhost:5225/api/UpdateTime/UpdateThoiGian", {
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


