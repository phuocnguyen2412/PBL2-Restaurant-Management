function deleteEmployee(infor) {
    fetch(
        `http://localhost:5225/api/NhanVien/DeleteNhanVien?Id=${infor.Id}&MaNV=${infor.Id}`,
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
}
