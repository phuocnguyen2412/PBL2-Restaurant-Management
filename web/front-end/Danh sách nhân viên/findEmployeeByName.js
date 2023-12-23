$("#findEmployeeByName").onclick = function (event) {
    event.preventDefault();
    let id = $("#hoVaTen-timkiem").value;

    if (!id) {
        toast({
            title: "Thất bại!",
            message: "Vui lòng nhập ngày! ",
            type: "error",
            duration: 5000,
        });

        return;
    }
    idAPI = encodeURIComponent(id);
    console.log(id);
    fetch(`http://localhost:5225/api/NhanVien/GetNhanVienByName?TenNV=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((infor) => {
            if (infor.length == 0) {
                throw new Error(`Error: ${response.status}`);
            }
            show(infor);
            toast({
                title: "Thành công!",
                message: `Đã tìm được nhân viên có tên ${id}!`,
                type: "success",
                duration: 5000,
            });
        })
        .catch((error) => {
            toast({
                title: "Thất bại!",
                message: `Không tồn tại nhân viên có tên ${id}!`,
                type: "error",
                duration: 5000,
            });
        });
};
