const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function kiemtraDanhSachNhanVien(NhanVien) {
    return fetch("http://localhost:5225/api/NhanVien/GetNhanVien")
        .then(response => response.json())
        .then(employee_list => {
          
            // Sử dụng some() để kiểm tra nếu có ít nhất một nhân viên có mã trùng
            
            if(!employee_list.some(employee => employee.maNV == NhanVien.maNV)) throw "0"
        })
        
}

fetch(
    "https://my-json-server.typicode.com/phuocnguyn/PBL_2-RESTAURANT-MANEGEMENT/dishes"
)
    .then(function (response) {
        return response.json();
    })

    .then(function (dishes) {
        let dishes_list = dishes.map(function (dish) {
            return `
            <div class="col-3 dish MonAn${dish.idNhomMonAn}">
                <img
                src="${dish.linkAnh}"
                alt=""
                />
                <div class="dish-info">
                    <div class="name">
                        <i class="ti-info-alt"></i> ${dish.tenMon}
                    </div>
                    <div class="prize"><i class="ti-money"></i>${dish.giaMon}VNĐ</div>
                    <div class="resource">
                        <i class="ti-hand-point-right"></i> ${dish.thanhPhan}
                    </div>
                
                    <input class="idMonAn" name="idMonAn" type = "text " value = ${dish.idNhomMonAn} />
                    <input class="giaMon" name="giaMon" type = "number" value = ${dish.giaMon} />
                    <div class="form-floating">
                        <input class="form-control" name="soLuong-dish-${dish.id}"  type="number" value=0 
                        id="soLuong-dish-${dish.id}"
                        placeholder="Nhập số lượng" />
                        <label class="ml-2" for="soLuong-dish-${dish.id}">Số lượng</label>
                    </div>
                </div>
                
            </div>
            `;
        });

        document.querySelector("#dish-list").innerHTML = dishes_list.join("");
        return dishes;
    })

    .then(function (dishes) {
        const tabs = $$(".tab-item");
        const line = $(".line");
        const dishList = $$(".dish");
        tabs.forEach((tab) => {
            if (tab.classList.value == "all tab-item active") {
                dishList.forEach(function (dish) {
                    dish.style.display = "none";
                    dish.style.display = "block";
                });
            }
            tab.onclick = function () {
                $(".tab-item.active").classList.remove("active");

                line.style.left = this.offsetLeft + "px";
                line.style.width = this.offsetWidth + "px";
                this.classList.add("active");

                if (this.classList.value == "all tab-item active") {
                    dishList.forEach(function (dish) {
                        dish.style.display = "none";
                        dish.style.display = "block";
                    });
                }

                if (this.classList.value == "food tab-item active") {
                    dishList.forEach(function (dish) {
                        dish.style.display = "none";
                        if (dish.classList.contains("MonAn1")) {
                            dish.style.display = "block";
                        }
                    });
                }

                if (this.classList.value == "water tab-item active") {
                    dishList.forEach(function (dish) {
                        dish.style.display = "none";
                        if (dish.classList.contains("MonAn2")) {
                            dish.style.display = "block";
                        }
                    });
                }
            };
        });
        return dishes;
    })

    // Post Order + Post OrderItem
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
                            orderItem.idOrder
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
                    function post(index) {
                        console.log(orderItem_list.list[index]);
                        delete orderItem_list.list[index].tenMon;
                        orderItem_list.list[index].trangThaiMon = "done";

                        fetch(
                            "http://localhost:5225/api/OrderItems/PostOrderItems",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(
                                    orderItem_list.list[index]
                                ),
                            }
                        )
                            .then((response) => {
                                if (!response.ok) {
                                    function showSuccessToast() {
                                        toast({
                                            title: "Thông báo!",
                                            message:
                                                "Order chưa có, đang tạo Order",
                                            type: "info",
                                            duration: 5000,
                                        });
                                    }
                                    showSuccessToast();
                                    throw (order = {
                                        id: orderItem_list.list[index].idOrder,
                                        ngay: "null",
                                        gio: "null",
                                        maNV: orderItem_list.list[index].maNV,
                                        hoTen: "string",
                                        phanTramKhuyenMai:
                                            orderItem_list.list[index]
                                                .phanTramKhuyenMai,
                                        trangThaiThanhToan: "Chưa Thanh Toán",
                                    });
                                }

                                return response.json();
                            })
                            .then((orderItem) => {
                                function showSuccessToast() {
                                    toast({
                                        title: "Thành công!",
                                        message: "Đã thêm món ăn vào order",
                                        type: "success",
                                        duration: 5000,
                                    });
                                }
                                showSuccessToast();
                            })
                            .catch((order) => {
                                fetch(
                                    "http://localhost:5225/api/Order/PostOrder",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(order),
                                    }
                                )
                                .then((response) => {
                                    console.log(response)
                                    post(index);
                                });
                            });
                    }
                    btn.onclick = function () {
                        post(index);
                    };
                });
            },
        };
        function handleSubmit(event) {
            dishes.forEach(function (dish, index) {
                let idOrder = document.getElementById("idOrder").value;
                let maNV = document.getElementById("maNVorder").value;
                let soBan = document.getElementById("soBan").value;
                let phanTramKhuyenMai =
                    document.getElementById("phanTramKhuyenMai").value;
                let ghiChu = document.getElementById("ghiChu").value;
                let soLuong = document.getElementById(
                    `soLuong-dish-${index + 1}`
                ).value;
                let success = false;
                // Ngăn chặn form submit theo cách thông thường

                // Dữ liệu để gửi lên API
                var data = {
                    tenMon: dish.tenMon,
                    idOrder: idOrder,
                    maNV: maNV,
                    soBan: soBan,
                    trangThaiMon: "undone",
                    giaMon: dish.giaMon,
                    phanTramKhuyenMai: phanTramKhuyenMai,
                    ghiChu: ghiChu,
                    thanhTien:
                        dish.giaMon * soLuong +
                        ((dish.giaMon * soLuong * phanTramKhuyenMai) % 100),
                    idMonAn: dish.id,
                    soLuong: soLuong,

                    // Thêm các trường dữ liệu khác nếu cần
                };

                if (data.soLuong > 0) {

                    kiemtraDanhSachNhanVien(data)
                    
                        .then((result)=>{
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
                        })
                        .catch((error)=>{
                            function showSuccessToast() {
                                toast({
                                    title: "Thất bại!",
                                    message: "Đặt món thất bại do mã nhân viên không tồn tại!",
                                    type: "error",
                                    duration: 5000,
                                });
                            }
                            showSuccessToast();
                        })
                }
                
            });
        }

        $(".orderForm-submit-btn").addEventListener("click", function () {
            handleSubmit();
        });
    });
