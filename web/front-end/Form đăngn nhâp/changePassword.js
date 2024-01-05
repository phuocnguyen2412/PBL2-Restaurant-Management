$(".changePassword").onclick = function (event) {
    event.preventDefault();
    const user = {
        username: $("#username-change").value,
        password: $("#password-change").value,
        maNV: 0,
        chucVu: "string",
    };
    fetch("http://localhost:5225/api/Auth/Auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.message == "0") throw "error ";
            else {
                const newUser = {
                    username: $("#username-change").value,
                    password: $("#new-password-change").value,
                    maNV: data.maNV,
                    chucVu: "string",
                };
                console.log(newUser);
                fetch("http://localhost:5225/api/Auth/ChangePassword", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                })
                    .then((response) => {
                        console.log(response);
                        if (!response.ok) throw "error";
                        else {
                            toast({
                                title: "Thành công!",
                                message: "Đổi mật khẩu thành công!",
                                type: "success",
                                duration: 5000,
                            });
                        }
                    })
                    .catch((error) => {
                        toast({
                            title: "Thất bại!",
                            message: "Mật khẩu phải ít nhất 8 kí tự!",
                            type: "error",
                            duration: 5000,
                        });
                    });
            }
        })

        .catch((error) => {
            toast({
                title: "Thất bại!",
                message: "Tài khoản hoặc mật khẩu không đúng!",
                type: "error",
                duration: 5000,
            });
        });
};
