function postHoaDon() {
    let date = new Date();
    $$(".input-row").forEach(function (row, index) {
        postData = {
            gio: `${date.getHours()}:${date.getMinutes()}`,
            ngay: `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`,
            idNhaCC: $("#idNhaCungCap").value,
            tenNV: $("#maNVResource").value,
            maHoaDon: $("#idHoaDonKho").value,
            idNguyenLieu: $(`.idNguyenLieu${index}`).value,
            soLuong: $(`.soLuong${index}`).value,
            donGia: $(`.donGia${index}`).value,
        };

        console.log(postData);

        fetch("http://localhost:5225/api/HoaDonKho/PostHoaDonKho", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.message != "Đã tạo bản ghi!") {
                    throw "lỗi";
                }
                return response;
            })
            .then((message) => {
                getHoaDon();
                toast({
                    title: "Thành công!",
                    message: "Đã thêm hóa đơn thành công!",
                    type: "success",
                    duration: 5000,
                });
                fetch(
                    `http://localhost:5225/api/NguyenLieu/UpdateNguyenLieu?Id=${postData.idNguyenLieu}&MaHoaDon=${postData.maHoaDon}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ).then(() => {
                    toast({
                        title: "Thành công!",
                        message: "Đã cập nhập kho!",
                        type: "success",
                        duration: 5000,
                    });
                });
            })
            .catch((message) => {
                toast({
                    title: "Thất bại!",
                    message: "Không thể thêm hóa đơn do lỗi API!!!!",
                    type: "error",
                    duration: 5000,
                });
            });
    });
}

$("#btn-submit-resource-bill").addEventListener("click", function (event) {
    event.preventDefault();
    postHoaDon();
});
