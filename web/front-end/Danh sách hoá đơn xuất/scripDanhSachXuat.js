const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
fetch("http://localhost:5225/api/HoaDonXuat/HoaDonXuat")
    .then(function (response) {
        return response.json();
    })
    .then(function (bills) {
        showBill(bills);
    });

function showBill(bills) {
    // bill
    let bill_list = bills.map(function (bill) {
        return `
                <div id="bill-${bill.maHoaDon}"class="col-3 card ">
                    <div class="card-header">ID hóa đơn: ${bill.maHoaDon}</div>
                    <div class="card-body">
                        Ngày: ${bill.ngay} <br />
                        Giờ: ${bill.gio} <br />
                        Tạo bởi: ${bill.tenNV}<br />
                    
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
                    <p class="float-start">${bill.ngay} - ${bill.gio} <br/>
                    ${bill.tenNV}
                    </p>
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
                        
                      
                            
                            <h4 class="text-center"> Tổng tiền: </h4> <h2 class="text-center">${bill.tongCong} VNĐ </h2> <br />
                        
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

        $(`#open-detail-bill-id${bill.maHoaDon}`).onclick = function () {
            $(`#detail-bill-${bill.maHoaDon}`).style.display = "flex";
        };
        $(`.close-${bill.maHoaDon}`).onclick = function () {
            $(`#detail-bill-${bill.maHoaDon}`).style.display = "none";
        };
    });
}
