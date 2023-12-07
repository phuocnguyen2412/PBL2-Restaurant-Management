
fetch("http://localhost:5225/api/NhanVien/GetNhanVien")
    .then(function (response) {
        return response.json();
    })
    .then(function (infor_list) {
        // bill
        console.log(infor_list)
        let infors = infor_list.map(function (infor) {
            return `
                <tr>
                    <td class="text-center">${infor.maNV}</td>
                    <td>${infor.hoTen}</td>
                    <td class="text-center">${infor.gioiTinh}</td>
                    <td class="text-center">${infor.cccd}</td>

                    <td>${infor.thuongTru}</td>
                    <td>${infor.email}</td>

                    <td class="text-center">${infor.ngaySinh}</td>
                    <td class="text-center">${infor.chucVu}</td>
                    <td
                        class="d-flex align-items-center justify-content-center"
                    >
                        <button id="update-${infor.maNV}" class="btn btn-info me-2"></button
                        ><button id="delete-${infor.maNV}" class="btn btn-danger"></button>
                    </td>
                </tr>
            `;
        });

        $("#employee-info").innerHTML = infors.join("");
        return infor_list;
    })



    // DELETE EMPLOYEE
    .then((infor_list) => {
        infor_list.forEach((infor, index) => {
            $(`#delete-${infor.maNV}`).onclick = function () {
                console.log(index);
                fetch(
                    `http://localhost:5225/api/NhanVien/DeleteNhanVien/${index}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Delete failed.");
                        }
                        location.reload();
                        function showSuccessToast() {
                            toast({
                                title: "Thành công!",
                                message: "Đã xóa nhân viên thành công!",
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
                                message: "Xóa nhân viên thất bại do lỗi API!",
                                type: "error",
                                duration: 5000,
                            });
                        }
                        showSuccessToast();
                    });
            };
        });
        return infor_list;
    })

    // UPDATE EMPLOYEE
    .then((infor_list) => {
        infor_list.forEach((infor, index) => {
            $(`#update-${infor.maNV}`).onclick = function () {
                $(".update-employee").innerHTML = `
                <div class="new-layer">
                    <div class="container">
                        <button class="btn btn-danger close-${infor.id} float-end p-1 m-1">
                            <i class="ti-close"></i>
                        </button>
                        <h2 class="text-center m-4">Chỉnh sửa nhân viên</h2>
                        <div class="row">
                            <div class="col-6 mb-2 form-floating">
                                <input
                                    class="form-control"
                                    id="hoVaTen"
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    value="${infor.hoTen}"
                                />
                                <label class="ml-2" for="hoVaTen">Họ và tên</label>
                            </div>
                            <div class="col-6 mb-2 form-floating">
                                <select class="form-select" name="sex" id="sex" value = ${infor.gioiTinh}>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                                <label class="ml-2" for="sex">Giới tính</label>
                            </div>

                            <div class="col-6 mb-2 form-floating">
                                <input
                                    id="email"
                                    class="form-control"
                                    type="email"
                                    placeholder="Nhập địa chỉ gmail"
                                    value="${infor.email}"
                                />
                                <label class="ml-2" for="email"
                                    >Địa chỉ email</label
                                >
                            </div>
                            <div class="col-6 mb-2 form-floating">
                                <input
                                    id="birthday"
                                    class="form-control"
                                    type="date"
                                    value = "${infor.ngaySinh}"
                                />
                                <label class="ml-2" for="birthday">Ngày sinh</label>
                            </div>

                            <div class="col-6 mb-2 form-floating">
                                <input
                                    id="CCCD"
                                    class="form-control"
                                    type="text"
                                    placeholder="Nhập số Căn cước công dân"
                                    value ="${infor.cccd}"
                                />
                                <label class="ml-2" for="CCCD">CCCD</label>
                            </div>
                            <div class="col-6 mb-2 form-floating">
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Nhập địa chỉ thường trú"
                                    id="thuongTru"
                                    name="thuongTru"
                                    value = "${infor.thuongTru}"
                                />
                                <label class="ml-2" for="thuongTru"
                                    >Thường trú</label
                                >
                            </div>

                            <div class="col-6 mb-2 form-floating">
                                <select class="form-select" name="job" id="job" value = "${infor.chucVu}">
                                    <option value="Nhân viên phục vụ">
                                        Nhân viên phục vụ
                                    </option>
                                    <option value="Đầu bếp">Đầu bếp</option>
                                    <option value="Thu ngân">Thu ngân</option>
                                </select>
                                <label class="ml-2" for="job">Vị trí</label>
                            </div>
                            <div class="col-6 mb-2 form-floating">
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Nhập mã NV = Chức vụ + stt"
                                    name="maNV"
                                    id="maNV"
                                    value="${infor.maNV}"
                                />
                                <label class="ml-2" for="maNV">Mã Nhân viên</label>
                            </div>
                        </div>
                        <button
                            class="btn btn-dark employee-confirm mb-2 float-end"
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
                `;

                function handleSubmit(event) {
                    
                    event.preventDefault();
                    const maNV = $("#maNV").value;
                    const hoVaTen = $("#hoVaTen").value;
                    const gioiTinh = $("#sex").value;
                    const email = $("#email").value;
                    const birthday = $("#birthday").value;
                    const CCCD = $("#CCCD").value;
                    const thuongTru = $("#thuongTru").value;
                    const job = $("#job").value;
                    console.log($("#hoVaTen"))
                    let employee_infor = {
                        maNV: maNV,
                        hoTen: hoVaTen,
                        gioiTinh: gioiTinh,
                        email: email,
                        ngaySinh: birthday,
                        cccd: CCCD,
                        thuongTru: thuongTru,
                        chucVu: job,
                    };
                    console.log(employee_infor);
                    fetch("http://localhost:5225/api/NhanVien/PutNhanVien", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(employee_infor),
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
                                    message:
                                        "Thông tin nhân viên đã được cập nhật",
                                    type: "success",
                                    duration: 5000,
                                });
                            }
                            showSuccessToast();
                        })
                        .catch((error) => {
                            console.log(2);
							
                            function showSuccessToast() {
                                toast({
                                    title: "Thất bại!",
                                    message:
                                        "Thông tin nhân viên không thể cập nhật do lỗi API",
                                    type: "error",
                                    duration: 5000,
                                });
                            }
                            showSuccessToast();
                        });
                }

                $(".employee-confirm").addEventListener(
                    "click",
                    function (event) {
                        handleSubmit(event);
                    }
                );
            };
        });
    });
