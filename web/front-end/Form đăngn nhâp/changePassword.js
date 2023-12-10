$(".changePassword").onclick = function (event) {
  event.preventDefault();
  const user = new User($("#username").value, $("#password").value);
  user.changePassword();
};
