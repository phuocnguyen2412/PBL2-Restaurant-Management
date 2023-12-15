const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

fetch("http://localhost:5225/api/HoaDonNhap/HoaDonNhap")
    .then(function (response) {
        return response.json();
    })
    .then(function (bills) {
        showBill(bills);
    });
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
                            <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#detail-bill-id${bill.maHoaDon}">
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

        // $(`#open-detail-bill-id${bill.maHoaDon}`).onclick = function () {
        //     $(`#detail-bill-${bill.maHoaDon}`).style.display = "flex";
        // };
        // $(`.close-${bill.maHoaDon}`).onclick = function () {
        //     $(`#detail-bill-${bill.maHoaDon}`).style.display = "none";
        // };
    });
}
