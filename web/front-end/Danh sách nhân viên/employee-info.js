const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
getInfo();
function getInfo() {
    fetch("http://localhost:5225/api/NhanVien/GetNhanVien")
        .then(function (response) {
            return response.json();
        })
        .then(function (infor_list) {
            show(infor_list);
        });
}

function show(infor_list) {
    let infors = infor_list.map(function (infor) {
        return `
                <tr>
                    <td class="text-center">${infor.id}</td>
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
                        <button id="update-${infor.id}" class="btn btn-info me-2"></button
                        ><button id="delete-${infor.id}" class="btn btn-danger"></button>
                    </td>
                </tr>
            `;
    });

    $("#employee-info").innerHTML = infors.join("");

    // DELETE
    infor_list.forEach((infor, index) => {
        $(`#delete-${infor.id}`).onclick = function () {
            console.log(infor.id);
            let data = {
                Id: infor.id,
                MaNV: infor.id,
            };
            console.log(data);
            fetch(
                `http://localhost:5225/api/NhanVien/DeleteNhanVien?Id=${infor.id}&MaNV=${infor.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            )
                .then((response) => {
                    console.log(response.ok);
                    if (!response.ok) {
                        throw new Error("Delete failed.");
                    }
                    toast({
                        title: "Thành công!",
                        message: "Đã xóa nhân viên thành công!",
                        type: "success",
                        duration: 5000,
                    });
                    getInfo();
                })

                .catch((error) => {
                    toast({
                        title: "Thất bại!",
                        message: "Xóa nhân viên thất bại do lỗi API!",
                        type: "error",
                        duration: 5000,
                    });
                });
        };
    });

    // UPDATE EMPLOYEE
    infor_list.forEach((infor, index) => {
        $(`#update-${infor.id}`).onclick = function () {
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
                                id="hoVaTenChange"
                                type="text"
                                placeholder="Nhập họ và tên"
                                value="${infor.hoTen}"
                            />
                            <label class="ml-2" for="hoVaTenChange">Họ và tên</label>
                        </div>
                        <div class="col-6 mb-2 form-floating">
                            <select class="form-select" name="sex" id="sexChange" value = ${infor.gioiTinh}>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                            <label class="ml-2" for="sexChange">Giới tính</label>
                        </div>

                        <div class="col-6 mb-2 form-floating">
                            <input
                                id="emailChange"
                                class="form-control"
                                type="email"
                                placeholder="Nhập địa chỉ gmail"
                                value="${infor.email}"
                            />
                            <label class="ml-2" for="emailChange"
                                >Địa chỉ email</label
                            >
                        </div>
                        <div class="col-6 mb-2 form-floating">
                            <input
                                id="birthdayChange"
                                class="form-control"
                                type="date"
                                value = "${infor.ngaySinh}"
                            />
                            <label class="ml-2" for="birthdayChange">Ngày sinh</label>
                        </div>

                        <div class="col-6 mb-2 form-floating">
                            <input
                                id="CCCDChange"
                                class="form-control"
                                type="text"
                                placeholder="Nhập số Căn cước công dân"
                                value ="${infor.cccd}"
                            />
                            <label class="ml-2" for="CCCDChange">CCCD</label>
                        </div>
                        

                        <div class="col-6 mb-2 form-floating">
                            <select class="form-select" name="job" id="jobChange" value = "${infor.chucVu}">
                                <option value="Nhân viên phục vụ">
                                    Nhân viên phục vụ
                                </option>
                                <option value="Đầu bếp">Đầu bếp</option>
                                <option value="Thu ngân">Thu ngân</option>
                                <option value="Quản lý">
                                                    Quản lý
                                                </option>
                                                <option value="Nhân viên kho">
                                                    Nhân viên kho
                                                </option>
                            </select>
                            <label class="ml-2" for="job">Vị trí</label>
                        </div>
                        <div class="col-6 mb-2 form-floating" style="display: none;">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Nhập mã NV = Chức vụ + stt"
                                name="id"
                                id="idChange"
                                value="${infor.id}"
                                disabled
                            />
                            <label class="ml-2" for="idChange">Mã Nhân viên</label>
                        </div>
                        <div class="col-12 mb-2 form-floating">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Nhập địa chỉ thường trú"
                                id="thuongTruChange"
                                name="thuongTru"
                                value = "${infor.thuongTru}"
                            />
                            <label class="ml-2" for="thuongTruChange"
                                >Thường trú</label
                            >
                        </div>
                    </div>
                    <button
                        class="btn btn-dark employee-confirm-Change mb-2 float-end"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
            `;

            function handleSubmit(event) {
                console.log(1);
                event.preventDefault();
                const maNV = $("#idChange").value;
                const hoVaTen = $("#hoVaTenChange").value;
                const gioiTinh = $("#sexChange").value;
                const email = $("#emailChange").value;
                const birthday = $("#birthdayChange").value;
                const CCCD = $("#CCCDChange").value;
                const thuongTru = $("#thuongTruChange").value;
                const job = $("#jobChange").value;
                console.log($("#hoVaTenChange"));
                let employee_infor = {
                    id: maNV,
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
                        getInfo();
                        toast({
                            title: "Thành công!",
                            message: "Thông tin nhân viên đã được cập nhật",
                            type: "success",
                            duration: 5000,
                        });
                        $(".new-layer").remove();
                    })
                    .catch((error) => {
                        toast({
                            title: "Thất bại!",
                            message:
                                "Thông tin nhân viên không thể cập nhật do lỗi API",
                            type: "error",
                            duration: 5000,
                        });
                    });
            }

            $(".employee-confirm-Change").addEventListener(
                "click",
                function (event) {
                    event.preventDefault();
                    handleSubmit(event);
                }
            );
        };
    });
}
