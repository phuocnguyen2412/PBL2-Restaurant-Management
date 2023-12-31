function findOutputBillById() {}

$("#findOutputBillByID").onclick = function (event) {
    event.preventDefault();
    const id = $("#id").value;

    if (!id) {
        toast({
            title: "Thất bại!",
            message: "Vui lòng nhập mã hóa đơn! ",
            type: "error",
            duration: 5000,
        });

        return;
    }
    console.log(id);
    fetch(
        `http://localhost:5225/api/HoaDonXuat/FindHoaDonXuatByMaHoaDon?MaHoaDon=${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
        .then((response) => {
            return response.json();
        })
        .then((infor) => {
            if (infor.length == 0) {
                throw new Error(`Error: ${response.status}`);
            }
            showBill(infor);
            toast({
                title: "Thành công!",
                message: "Đã tìm được hóa đơn!",
                type: "success",
                duration: 5000,
            });
        })
        .catch((error) => {
            toast({
                title: "Thất bại!",
                message: `Không tồn tại hóa đơn ${id}`,
                type: "error",
                duration: 5000,
            });
        });
};
