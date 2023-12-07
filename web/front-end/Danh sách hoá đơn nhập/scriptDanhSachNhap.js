const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

fetch("http://localhost:5225/api/HoaDonKho/HoaDonKho")
    .then(function (response) {
        return response.json();
    })
    .then(function (bills) {
        // bill
        let bill_list = bills.map(function (bill) {
            return `
                    <div class="col-3 card">
                        <div class="card-header">ID hóa đơn nhập: ${bill.id}</div>
                        <div class="card-body">
                            Nhà cung cấp: ${bill.nhaCC}<br />
                            Mã nhà cung cấp: ${bill.idNhaCC}<br />
                            Ngày: ${bill.ngay} <br />
                            Giờ: ${bill.gio} <br />
                            Tạo bởi: ${bill.taoBoi}<br />
                            Mã NV: ${bill.id}<br />
                            Thành tiền: ${bill.tongCong}<br />
                        </div>
                        <div class="card-footer d-grid">
                        <button class="btn btn-outline-success">
                                Chi tiết
                            </button>
                        </div>
                    </div>
                `;
        });

        $("#bill-list").innerHTML = bill_list.join("");

        // detail bill
        let detail_bill_list = bills.map(function (bill) {
            return `
                <div
                    id="detail-bill-${bill.id}"
                    class="card new-layer detail-bill"
                    style="display: none; z-index: 10"
                >
                    <div class="container">
                        <div class="card-header">
                            <button
                                class="btn-close close float-end p-1 mt-3"
                            ></button>
                            <h4 class="text-center">Hóa đơn nhập ID1</h4>
                        </div>
                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr class="table-success">
                                        <th style="padding-left: 10px">
                                            Tên Nguyên liệu
                                        </th>
                                        <th>Mã nguyên liệu</th>
                                        <th>Số lượng</th>
                                        <th>Đơn vị</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="padding-left: 10px">...</td>
                                        <td>...</td>
                                        <td>...</td>
                                        <td>...</td>
                                    </tr>
                                    <tr>
                                        <td>Tổng tiền</td>
                                        <td>....</td>
                                    </tr>
                                </tbody>
                            </table>
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
            $(`.table-detail-bill-${bill.id}`).innerHTML = items.join("");

            $(`#open-detail-bill-id${bill.id}`).onclick = function () {
                $(`#detail-bill-${bill.id}`).style.display = "flex";
            };
            $(`.close-${bill.id}`).onclick = function () {
                $(`#detail-bill-${bill.id}`).style.display = "none";
            };
        });
        return bill;
    });
