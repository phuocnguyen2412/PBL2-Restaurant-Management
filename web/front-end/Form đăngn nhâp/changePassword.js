function kiemTraUser(userChange) {
  return fetch("http://localhost:5225/api/NhanVien/GetNhanVien")
    .then((response) => response.json())
    .then((user_list) => {
      console.log(
        user_list.some(
          (user) =>
            user.username == userChange.username &&
            user.password == userChange.password
        )
      );
      if (
        !user_list.some(
          (user) =>
            user.username == userChange.username &&
            user.password == userChange.password
        )
      )
        throw "0";
    })
    .then(() => {
      $("#accout-change").innerHTML = `
                <label for="new-password-change">Password mới:</label>
                <input
                    type="password"
                    id="new-password-change"
                    name="new-password-change"
                    required
                />
            `;
    })
    .then(() => {
      const user = {
        username: $("#username-change").value,
        password: $("#new-password-change").value,
      };
      console.log(user);
      fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((response) => {
        if (!response.ok) {
          function showSuccessToast() {
            toast({
              title: "Thành công!",
              message: "Đổi mật khẩu thành công",
              type: "success",
              duration: 5000,
            });
          }
          showSuccessToast();
        }
      });
    })
    .catch(() => {
      function showSuccessToast() {
        toast({
          title: "Thất bại!",
          message: "User không tồn tại trong hệ thống",
          type: "error",
          duration: 5000,
        });
      }
      showSuccessToast();
    });
}
function changePassword(event) {
  const user = {
    username: $("#username-change").value,
    password: $("#password-change").value,
  };
  console.log(user);
  kiemTraUser(user);
}
$(".changePassword").onclick = function (event) {
  event.preventDefault();
  changePassword(event);
};
