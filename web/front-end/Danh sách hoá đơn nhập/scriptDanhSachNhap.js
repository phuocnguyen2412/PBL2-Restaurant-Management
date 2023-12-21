const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
getHoaDon();
function getHoaDon() {
    fetch("http://localhost:5225/api/HoaDonNhap/HoaDonNhap")
        .then(function (response) {
            return response.json();
        })
        .then(function (bills) {
            showBill(bills);
        });
}
function showBill(bills) {
    let bill_list = bills.map(function (bill) {
        return `
                        <div class="col-3 card">
                            <div class="card-header">ID hóa đơn nhập: ${bill.maHoaDon}</div>
                            <div class="card-body">
                                Nhà cung cấp: ${bill.tenNhaCC}<br />
                                Ngày: ${bill.ngay} <br />
                                Giờ: ${bill.gio} <br />
                                Tạo bởi: ${bill.tenNV}<br />   
                                Thành tiền: ${bill.thanhTien}<br />
                            </div>
                            <div class="card-footer d-grid">
                            <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#detail-bill-${bill.maHoaDon}">
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
        id="detail-bill-${bill.maHoaDon}"
        class="modal detail-bill fade"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    
                     
                        <div class="modal-header text-center">
                        
                            <h4 class="text-center mt-2">
                                Hóa đơn nhập ID${bill.maHoaDon}
                            </h4>
                        </div>
                        <div class="modal-body pb-3">
                            Tên công ty: ${bill.tenNhaCC} <br />
                            Địa chỉ: ${bill.sdt} <br />
                            SĐT: ${bill.diaChi} <br />

                            <br />
                            Tên khách hành: Nhà hàng ... <br />
                            Địa chỉ:... <br />
                            SĐT:.... <br />
                            <br />
                            <table class="table">
                                <thead>
                                    <tr class="table-success">
                                        <th style="padding-left: 10px">
                                            Tên Nguyên liệu
                                        </th>

                                        <th>Số lượng</th>
                                        <th>Đơn vị</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="table-detail-bill-${bill.maHoaDon}"
                                ></tbody>
                            </table>
                            <div class="float-end text-center pb-3">
                                ${bill.gio}, ${bill.ngay} <br />
                                Người mua <br />
                                ${bill.tenNV}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
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
                            <td style="padding-left: 10px">${i.tenNguyenLieu}</td>
                            <td>${i.soLuong}</td>
                            <td>${i.donVi}</td>
                            <td>${i.donGia}</td>
                            <td>${i.thanhTienItem}</td>
                        </tr>
                    `;
        });
        $(`.table-detail-bill-${bill.maHoaDon}`).innerHTML = items.join("");
    });
}
