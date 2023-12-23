function updateBill(bill) {
    console.log(bill);
    fetch("http://localhost:5225/api/Order/Xuathoadonbutton", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bill),
    })
        .then((response) => {
            if (!response.ok) throw "error";
            else {
                toast({
                    title: "Thành công!",
                    message: `Xuất hóa đơn ${bill.maHoaDon} thành công!`,
                    type: "success",
                    duration: 5000,
                });
                getBill();
            }
        })
        .catch((error) => {
            toast({
                title: "Thất bại!",
                message: `Lỗi API`,
                type: "error",
                duration: 5000,
            });
        });
}
