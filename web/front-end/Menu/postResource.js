function SubmitResourceBill(event) {
    event.preventDefault();
    let order = {
        // id: $("#idHoaDonKho").value,
        ngay: $("#NgayNhap").value,
        gio: $("#gioNhap").value,
        idNhaCC: $("#idNhaCungCap").value,
        maNV: 1,
        
    }
    console.log(order)
    fetch(
        "http://localhost:5225/api/OrderItems/PostOrderItems",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                order
            ),
        }
    )
    .then((response) => {
        if (!response.ok) {
            throw "lỗi";
        }
        return response.json();
    })
    .then((orderItem) => {
        function showSuccessToast() {
            toast({
                title: "Thành công!",
                message: "Đã tạo hóa đơn thành công",
                type: "success",
                duration: 5000,
            });
        }
        showSuccessToast();
    })
    .catch((orderItem) => {
        function showSuccessToast() {
            toast({
                title: "Thất bại!",
                message: "Tạo hóa đơn thất bại",
                type: "error",
                duration: 5000,
            });
        }
        showSuccessToast();
    });
    // $$(".input-row").forEach(function (bill) {
        let inputElements = document.querySelectorAll(".input-row input");
        console.log(inputElements);
     
        let postData = {
            idHoaDonKho: $("#idHoaDonKho").value,
        };
        inputElements.forEach(function (inputElement) {
            let name = inputElement.getAttribute("name");
            let value = inputElement.value;
            postData[name] = value;
        });
      
        console.log(postData);
   
        fetch("http://localhost:5225/api/HoaDonKhoItems/PostHoaDonKhoItems", {
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
    // });
}

$("#btn-submit-resource-bill").addEventListener("click", function (event) {
    SubmitResourceBill(event);
});
