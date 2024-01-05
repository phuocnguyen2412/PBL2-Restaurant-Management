const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function Login(user) {
    fetch("http://localhost:5225/api/Auth/Auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            console.log(response);
            if (!response.ok) throw "error";
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.chucVu == "Quản lý") {
                window.location.href = "./web/front-end/Menu/MenuAdmin.html";
            }
            if (
                data.chucVu == "Nhân viên phục vụ" ||
                data.chucVu == "Thu ngân"
            ) {
                window.location.href = "./web/front-end/Menu/MenuEmployee.html";
            }
            if (data.chucVu == "Nhân viên kho") {
                window.location.href =
                    "./web/front-end/Menu/MenuNhanVienKho.html";
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
}
$("#submit-login-btn").onclick = function (event) {
    event.preventDefault();
    const user = {
        username: $("#username").value,
        password: $("#password").value,
        maNV: 0,
        chucVu: "string",
    };
    console.log(user);
    Login(user);
};
function togglePassword() {
    const type = $("#password").type === "password" ? "text" : "password";
    $("#password").type = type;
}
function toggleChangePassword() {
    const type =
        $("#new-password-change").type === "password" ? "text" : "password";
    $("#new-password-change").type = type;
    $("#password-change").type = type;
}
