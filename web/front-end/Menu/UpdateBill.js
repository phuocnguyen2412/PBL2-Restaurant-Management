$("#confirm-moreDishInput").onclick = function (event) {
    event.preventDefault();
    $(".MoreDish").forEach(function (dish, index) {
        const data = {
            maHoaDon: $("#maHoaDon").value,
            tenNV: "null",
            soBan: "null",
            trangThaiMon: "undone",
            ngay: "null",
            gio: "null",
            phanTramKhuyenMai: $(`.phanTramKhuyenMaiMoreDish${index}`).value,
            ghiChu: $(`#ghiChuMoreDish${index}`).value,
            idMonAn: $(`.idMonAnMoreDish${index}`).value,
            soLuong: $(`.soLuongMonAnMoreDish${index}`).value,
        };
        if (data.soLuong > 0) {
            fetch("http://localhost:5225/api/Order/PostOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((orderItem) => {
                    toast({
                        title: "Đăng kí thành công!",
                        message:
                            "Thông tin nhân viên đã được thêm vào danh sách",
                        type: "success",
                        duration: 5000,
                    });

                    showBill();
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
        } else {
            toast({
                title: "Thất bại!",
                message: "Số lượng phải lớn hơn 0!",
                type: "error",
                duration: 5000,
            });
        }
    });
};
