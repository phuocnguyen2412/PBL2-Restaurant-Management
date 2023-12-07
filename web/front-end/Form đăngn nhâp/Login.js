function login(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = {
        username: username,
        password: password,
    };
    fetch("http://localhost:5225/api/Auth/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data.message == "1") { 
                window.location.href = "./web/front-end/Menu/Menu.html";
            } else {
                function showSuccessToast() {
                    toast({
                        title: "Thất bại!",
                        message: "Tài khoản hoặc mật khẩu không đúng!",
                        type: "error",
                        duration: 5000,
                    });
                }
                showSuccessToast();
            }
        })
        .catch((error) => {
            console.error("Error:");
            function showSuccessToast() {
                toast({
                    title: "Thất bại!",
                    message: "Tài khoản hoặc mật khẩu không đúng!",
                    type: "error",
                    duration: 5000,
                });
            }
            showSuccessToast();
        });
}

document.getElementById("submit-login-btn").onclick = function (event) {
    login(event);
};
