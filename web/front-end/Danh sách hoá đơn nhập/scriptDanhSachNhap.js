const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

fetch("http://localhost:5225/api/HoaDonNhap/HoaDonNhap")
    .then(function (response) {
        return response.json();
    })
    .then(function (bills) {
        console.log(bills.items)
        // bill
        let bill_list = bills.map(function (bill) {
            return `
                    <div class="col-3 card">
                        <div class="card-header">ID hóa đơn nhập: ${bill.id}</div>
                        <div class="card-body">
                            Nhà cung cấp: ${bill.tenNhaCC}<br />
                          
                            Ngày: ${bill.ngay} <br />
                            Giờ: ${bill.gio} <br />
                            Tạo bởi: ${bill.hoTen}<br />
                            Mã NV: ${bill.maNV}<br />
                            Thành tiền: ${bill.thanhTien}<br />
                        </div>
                        <div class="card-footer d-grid">
                        <button id="open-detail-bill-id${bill.id}" class="btn btn-outline-success">
                                Chi tiết
                            </button>
                        </div>
                    </div>
                `;
        });

        $("#bill-list").innerHTML = bill_list.join("");
        console.log(bills)
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
                                class="btn-close close float-end p-1 mt-3 close-${bill.id}"
                            ></button>
                            <h4 class="text-center">Hóa đơn nhập ID${bill.id}</h4>
                        </div>
                        <div class="card-body">
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
                                <tbody class=
                                "table-detail-bill-${bill.id}">
                                    
                                 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        });

        $(".detail-bill-list").innerHTML = detail_bill_list.join("");
        console.log(bills.items)
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
            $(`.table-detail-bill-${bill.id}`).innerHTML = items.join("");

            $(`#open-detail-bill-id${bill.id}`).onclick = function () {
               console.log(1);
                $(`#detail-bill-${bill.id}`).style.display = "flex";
            };
            $(`.close-${bill.id}`).onclick = function () {
                $(`#detail-bill-${bill.id}`).style.display = "none";
            };
        });
        // return bill;
    });
