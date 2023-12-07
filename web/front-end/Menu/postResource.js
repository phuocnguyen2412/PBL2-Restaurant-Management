function SubmitResourceBill(event) {
    event.preventDefault();
    $$(".input-row").forEach(function (bill) {
        let inputElements = document.querySelectorAll(".input-row input");
        console.log(inputElements);
        // Tạo một đối tượng chứa dữ liệu cần post
        let postData = {
            id: $("#idHoaDonKho").value,
            ngayNhap: $("#NgayNhap").value,
            gioNhap: $("#gioNhap").value,
            idNhaCC: $("#idNhaCungCap").value,
            soLuong: "",
            donGia: "",
            tongCong: "",
        };
        inputElements.forEach(function (inputElement) {
            let name = inputElement.getAttribute("name");
            let value = inputElement.value;
            postData[name] = value;
        });
        postData.tongCong = postData.soLuong * postData.donGia;
        console.log(postData);
        // Định nghĩa URL mà bạn muốn gửi yêu cầu POST đến

        // Sử dụng fetch để gửi yêu cầu POST
        fetch(postUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        })
            .then((response) => response.json())
            .then((response) => {
                if (!response.ok) {
                    throw "lỗi";
                }
                return response.json();
            })
            .then((message) => {
                function showSuccessToast() {
                    toast({
                        title: "Thành công!",
                        message: "Đã thêm hóa đơn thành công!",
                        type: "success",
                        duration: 5000,
                    });
                }
                showSuccessToast();
            })
            .catch((message) => {
                function showSuccessToast() {
                    toast({
                        title: "Thất bại!",
                        message: "Không thể thêm hóa đơn do lỗi API",
                        type: "error",
                        duration: 5000,
                    });
                }
                showSuccessToast();
            });
    });
}

$("#btn-submit-resource-bill").addEventListener("click", function (event) {
    SubmitResourceBill(event);
});
