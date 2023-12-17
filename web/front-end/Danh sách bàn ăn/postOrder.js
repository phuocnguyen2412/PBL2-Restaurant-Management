const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
$(".orderForm-submit-btn").onclick = function () {
    handleSubmit();
};
let i = 0
function handleSubmit(event) {
    $$(".input-row-dish").forEach(function (input, index) {
        console.log(index)
        const date = new Date();
        let data = {
            maHoaDon: `${date.getDate()}${
                date.getMonth() + 1
            }${date.getFullYear()}${date.getHours()}${date.getMinutes()}-${i}`,
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
                        message: `Món ăn ${index} đã được thêm vào bàn ${data.soBan}`,
                        type: "success",
                        duration: 5000,
                    });
                    showBill();
                })
                .catch((error) => {
                    toast({
                        title: "Thất bại!",
                        message:
                            `Đặt món ${index} thất bại do thiếu nguyên liệuI`,
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
    i++;
}
