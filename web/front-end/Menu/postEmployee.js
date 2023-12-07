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

    let employee_infor = {
        hoTen: hoVaTen,
        gioiTinh: gioiTinh,
        email: email,
        ngaySinh: birthday,
        cccd: CCCD,
        thuongTru: thuongTru,
        chucVu: job,
        maNV: maNV,
    };
    console.log(employee_infor);
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
            console.log(1);
            function showSuccessToast() {
                toast({
                    title: "Đăng kí thành công!",
                    message: "Thông tin nhân viên đã được thêm vào danh sách",
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
                        "Thông tin nhân viên không thể được thêm vào do lỗi API",
                    type: "error",
                    duration: 5000,
                });
            }
            showSuccessToast();
        });
}

$(".employee-confirm").addEventListener("click", function (event) {
    handleSubmit(event);
});
