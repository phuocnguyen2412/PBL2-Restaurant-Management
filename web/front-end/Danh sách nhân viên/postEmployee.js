function postEmployee(employee_infor) {
    fetch("http://localhost:5225/api/NhanVien/PostNhanVien", {
        method: "POST",
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
            toast({
                title: "Đăng kí thành công!",
                message: "Thông tin nhân viên đã được thêm vào danh sách",
                type: "success",
                duration: 5000,
            });

            getInfo();
        })
        .catch((error) => {
            toast({
                title: "Thất bại!",
                message:
                    "Thông tin nhân viên không thể được thêm vào do lỗi API",
                type: "error",
                duration: 5000,
            });
        });
}

$(".employee-confirm").onclick = function (event) {
    event.preventDefault();
    const employee_infor = {
        hoTen: $("#hoVaTen").value,
        gioiTinh: $("#sex").value,
        email: $("#email").value,
        ngaySinh: $("#birthday").value,
        cccd: $("#CCCD").value,
        thuongTru: $("#thuongTru").value,
        chucVu: $("#job").value,
    };
    postEmployee(employee_infor);
};
