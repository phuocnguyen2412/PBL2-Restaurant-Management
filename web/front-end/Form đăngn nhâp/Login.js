const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function User(username, password) {
  this.username = username;
  this.password = password;
  this.maNV = this.checkUser;
  this.Login = function () {
    fetch("http://localhost:5225/api/Auth/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "1") {
          window.location.href = "./web/front-end/Menu/Menu.html";
        } else {
          throw data.message;
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
  this.checkUser = function () {
    return fetch("http://localhost:5225/api/Auth/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    }).then((response) => response.json());
  };
  this.changePassword = function () {
    if (this.maNV && this.maNV != 0) {
      $("#accout-change").innerHTML = `
                <label for="new-password-change">Password mới:</label>
                <input
                    type="password"
                    id="new-password-change"
                    name="new-password-change"
                    required
                />
            `;
    }
    this.password = $("#new-password-change").value;
    fetch("http://localhost:5225/api/Auth/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Thành công!",
          message: "Đổi mật khẩu thành công!",
          type: "error",
          duration: 5000,
        });
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
}

$("#submit-login-btn").onclick = function (event) {
  event.preventDefault();
  const user = new User($("#username").value, $("#password").value);
  user.Login();
};
