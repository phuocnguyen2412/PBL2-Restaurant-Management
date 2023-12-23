const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function postOrder(data) {
    fetch(`http://localhost:5225/api/MonAn/MonAn`)
        .then(function (response) {
            return response.json();
        })
        .then(function (dish_list) {
            fetch("http://localhost:5225/api/Order/PostOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) throw "error";
                    else {
                        // location.reload();
                        toast({
                            title: "Đặt món thành công!",
                            message: `Món ăn ${
                                dish_list[data.idMonAn - 1].tenMon
                            } đã được thêm vào bàn ${data.soBan}`,
                            type: "success",
                            duration: 5000,
                        });
                        getBill();

                        fetch(
                            `http://localhost:5225/api/NguyenLieu/CapNhatNguyenLieuTonKho?Id=${data.idMonAn}&MaHoaDon=${data.maHoaDon}`,
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                    }
                })
                .catch((error) => {
                    toast({
                        title: "Thất bại!",
                        message: `Đặt món ${
                            dish_list[data.idMonAn - 1].tenMon
                        } thất bại do thiếu nguyên liệuI`,
                        type: "error",
                        duration: 5000,
                    });
                });
        });
}
let i = 0;
$(".orderForm-submit-btn").onclick = function (event) {
    event.preventDefault();
    $$(".input-row-dish").forEach(function (input, index) {
        const date = new Date();
        const data = {
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
            postOrder(data);
        }
    });
    i++;
};
