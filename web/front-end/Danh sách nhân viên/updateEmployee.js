function updateEmployee(employee_infor) {
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
                message: "Thông tin nhân viên không thể cập nhật do lỗi API",
                type: "error",
                duration: 5000,
            });
        });
}
