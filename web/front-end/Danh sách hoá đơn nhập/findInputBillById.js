$("#findBillByID").onclick = function (event) {
    event.preventDefault();
    const id = $("#billID").value;

    if (!id) {
        toast({
            title: "Thất bại!",
            message: "Vui lòng nhập ID! ",
            type: "error",
            duration: 5000,
        });

        return;
    }

    fetch(
        `http://localhost:5225/api/HoaDonNhap/FindHoaDonNhapByMaHoaDon?MaHoaDon=${id}`,
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
                message: `Không tồn tại hóa đơn ${$("#billID").value} `,
                type: "error",
                duration: 5000,
            });
        });
};
