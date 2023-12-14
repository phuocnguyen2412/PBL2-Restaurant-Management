const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function showBill(bills){
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
                          <button id="open-detail-bill-id${bill.maHoaDon}" class="btn btn-outline-success">
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
                      class="card new-layer detail-bill"
                      style="display: none; z-index: 10"
                  >
                      <div class="container ">
                      <button
                      class="btn-close close float-end close-${bill.maHoaDon} mt-2"
                      ></button>
                          <div class="card-header ">
                          
                              
                              <h4 class="text-center mt-2">Hóa đơn nhập ID${bill.maHoaDon}</h4>
                          
                          </div>
                          <div class="card-body pb-3">
                              Tên công ty: ${bill.tenNhaCC}</br>
                              Địa chỉ: ${bill.sdt}</br>
                              SĐT: ${bill.diaChi}</br>
  
                              </br>
                              Tên khách hành: Nhà hàng ... </br>
                              Địa chỉ:...</br>
                              SĐT:....</br>
                              </br>
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
                                      class="table-detail-bill-${bill.maHoaDon}">
                                  </tbody>
                              </table>
                              <span class="float-end text-center pb-3">
                                  ${bill.gio}, ${bill.ngay} </br>
                                  Người mua </br>
                                  ${bill.tenNV}
                              </span>
  
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
  
        $(`#open-detail-bill-id${bill.maHoaDon}`).onclick = function () {
          $(`#detail-bill-${bill.maHoaDon}`).style.display = "flex";
        };
        $(`.close-${bill.maHoaDon}`).onclick = function () {
          $(`#detail-bill-${bill.maHoaDon}`).style.display = "none";
        };
      });
}

fetch("http://localhost:5225/api/HoaDonNhap/HoaDonNhap")
  .then(function (response) {
    return response.json();
  })
  .then(function (bills) {
 
    // bill
    showBill(bills)
    // return bill;
  });
