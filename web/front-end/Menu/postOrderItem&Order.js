const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
$(".orderForm-submit-btn").onclick = function () {
    handleSubmit();
};

function handleSubmit(event) {
    $$(".input-row-dish").forEach(function (input, index) {
        const date = new Date();
        let data = {
            maHoaDon: `${date.getDate()}${
                date.getMonth() + 1
            }${date.getFullYear()}${date.getHours()}${date.getMinutes()}`,
            tenNV: $("#maNVorder").value,
            soBan: $("#soBan").value,
            trangThaiMon: "undone",
            ngay: "null",
            gio: "null",
            phanTramKhuyenMai: $(`.phanTramKhuyenMai${index}`).value,
            ghiChu: $(`#ghiChu${index}`).value,

            idMonAn: $(`.idMonAn${index}`).value,
            soLuong: $(`.soLuongMonAn${index}`).value,
        };
        console.log(data);
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
                        title: "Đặt món thành công!",
                        message: `Món ăn ${data.tenMonAn} đã được thêm vào bàn ${data.soBan}`,
                        type: "success",
                        duration: 5000,
                    });
                    showBill();
                })
                .catch((error) => {
                    toast({
                        title: "Thất bại!",
                        message:
                            `Đặt món ${data.tenMonAn} thất bại do thiếu nguyên liệuI`,
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

    if (data.soLuong > 0) {
        orderItem_list.addOrderItem(data);
        function showSuccessToast() {
            toast({
                title: "Thành công!",
                message: "Đã đặt món thành công!",
                type: "success",
                duration: 5000,
            });
        }
        showSuccessToast();
        orderItem_list.showOrderItem(data);
        orderItem_list.saveOrderItem();
    }
}
