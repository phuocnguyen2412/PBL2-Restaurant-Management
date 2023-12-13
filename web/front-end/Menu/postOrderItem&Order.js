const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

fetch(
  "https://my-json-server.typicode.com/phuocnguyn/PBL_2-RESTAURANT-MANEGEMENT/dishes"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (dishes) {
    const orderItem_list = {
      list: [],
      addOrderItem: function (orderItem) {
        orderItem_list.list[orderItem_list.list.length] = orderItem;
      },
      showOrderItem: function (orderItem) {
        $("#orderItem-list").innerHTML += `
                    <div id="orderItem-${orderItem_list.list.length - 1}"
                        class="col-4 card">
                    <div class="card-header">
                        <input id="btn-done-${
                          orderItem_list.list.length - 1
                        }"class="btn-done" type="checkbox" />
                        <h4 class="text-center">Món ăn hóa đơn ${
                          orderItem.maHoaDon
                        }</h4>
                    </div>
                    <div class="card-body">
                        Bàn số: ${orderItem.soBan} <br />
                        Tên món ăn: ${orderItem.tenMon} <br /> Số lượng: ${
          orderItem.soLuong
        }  <br />
                        Ghi chú: ${orderItem.ghiChu} 
                    </div>
                    <div class="card-footer">
                        <table>
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="table-success">
                                        <th>Mã nguyên liệu</th>
                                        <th style="padding-left: 10px">
                                            Tên nguyên liệu
                                        </th>
                                        <th>Số lượng</th>
                                        <th>Đơn vị</th>
                                    </tr>
                                </thead>
                                <tbody class="table-resource-orderItem">
                                    <tr>
                                        <td>....</td>
                                        <td>....</td>
                                        <td>....</td>
                                        <td>....</td>
                                    </tr>
                                </tbody>
                            </table>
                        </table>
                    </div>
                </div>
                    `;
      },

      saveOrderItem: function () {
        $$(".btn-done").forEach(function (btn, index) {
          btn.onclick = function () {
            delete orderItem_list.list[index].tenMon;
            orderItem_list.list[index].trangThaiMon = "done";
            console.log(orderItem_list.list[index]);
            fetch("http://localhost:5225/api/Order/PostOrder", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderItem_list.list[index]),
            });
          };
        });
      },
    };
    function handleSubmit(event) {
      
        $$(".input-row-dish").forEach(function(input,index){
          const date = new Date();
          let data = {
       
            maHoaDon: `${date.getDate()}${
              date.getMonth() + 1
            }${date.getFullYear()}${date.getHours()}${date.getMinutes()}`,
            maNV: $("#maNVorder").value,
            soBan: $("#soBan").value,
            trangThaiMon: "undone",
            ngay: "null",
            gio: "null",
            phanTramKhuyenMai: $(`.phanTramKhuyenMai${index}`).value,
            ghiChu: $(`#ghiChu${index}`).value,
           
            idMonAn: $(`.idMonAn${index}`).value,
            soLuong: $(`.soLuongMonAn${index}`).value,
           
          };
          console.log(data);
          fetch("http://localhost:5225/api/Order/PostOrder", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
        })
  
        
        
        
        if (data.soLuong > 0) {
          
          orderItem_list.addOrderItem(data);
          function showSuccessToast() {
            toast({
              title: "Thành công!",
              message: "Đã đặt món thành công!",
              type: "success",
              duration: 5000,
            });
          }
          showSuccessToast();
          orderItem_list.showOrderItem(data);
          orderItem_list.saveOrderItem();
        }
      
    }

    $(".orderForm-submit-btn").addEventListener("click", function () {
      handleSubmit();
    });
  });
