$(".changePassword").onclick = function (event) {
  
  event.preventDefault();
  const user = new User($("#username-change").value, $("#password-change").value);
  user.checkUser();
  console.log(user)
};
