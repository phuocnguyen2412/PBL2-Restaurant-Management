const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function User(username, password) {
  this.username = username;
  this.password = password;
  this.maNV = "";
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
    that = this;
    return fetch("http://localhost:5225/api/Auth/Auth", {
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
      .then((response) => {
        console.log(response.message);
        if (!response.ok) {
          throw new Error("Server response is not OK");
        }
        return response;
      })
      .then((data) => {
        this.maNV = data.maNV;
        this.changePassword();
      })
      .catch((error) => {
        toast({
          title: "Thất bại!",
          message: "Mật khẩu cũ không đúng!",
          type: "error",
          duration: 5000,
        });
      });
  };
  this.openEmployee = function () {
    if ((this.maNV = 1164)) {
      openPart($("#employee-part"), $("#employee"));
    }
  };
  this.changePassword = function () {
    if (this.maNV) {
      $("#accout-change").innerHTML += `
                <label for="new-password-change">Password mới:</label>
                <input
                    type="password"
                    id="new-password-change"
                    name="new-password-change"
                    required
                />
                <button class="submit" type="submit">Submit</button>
            `;
    }
    that = this;
    $(".submit").onclick = function (event) {
      event.preventDefault();
      that.password = $("#new-password-change").value;
      console.log({
        username: that.username,
        password: that.password,
        maNV: that.maNV,
      });
      fetch("http://localhost:5225/api/Auth/ChangePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: that.username,
          password: that.password,
          maNV: that.maNV,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.message);
          if (response.message != "Đổi mật khẩu thành công!") {
            throw new Error("Server response is not OK");
          }
          return response;
        })
        .then((data) => {
          toast({
            title: "Thành công!",
            message: "Đổi mật khẩu thành công!",
            type: "success",
            duration: 5000,
          });
        })
        .catch((error) => {
          toast({
            title: "Thất bại!",
            message: "Mật khẩu phải tối thiếu 8 kí tự!",
            type: "error",
            duration: 5000,
          });
        });
    };
  };
}

$("#submit-login-btn").onclick = function (event) {
  event.preventDefault();
  const user = new User($("#username").value, $("#password").value);
  user.Login();
  user.openPart();
};

function openPart(button, htmlNode) {
  button.onclick = function (e) {
    $$(".part").forEach(function (part) {
      part.style.display = "none";
    });
    e.preventDefault();
    htmlNode.style.display = "block";
  };
}

openPart($("#orderItem-List-part"), $("#orderItem"));
openPart($("#bill-part"), $("#bill"));
openPart($("#storage-part"), $("#storage"));
openPart($("#resource-input-part"), $("#resource-input"));
openPart($("#home-part"), $("#home"));
