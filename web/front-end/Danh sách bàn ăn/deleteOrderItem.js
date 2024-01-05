function deleteOrderItem(maHoaDon) {
    console.log(maHoaDon);
    fetch(
        `http://localhost:5225/api/HoaDonXuat/DeleteOrder?IdOrder=${maHoaDon}&Id=${maHoaDon}`,
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
            toast({
                title: "Thành công!",
                message: `Đã xóa món ăn  thành công!`,
                type: "success",
                duration: 5000,
            });
            getBill();
            postTable();
        })

        .catch((error) => {
            toast({
                title: "Thất bại!",
                message: "Xóa nhân viên thất bại do lỗi API!",
                type: "error",
                duration: 5000,
            });
        });
}
