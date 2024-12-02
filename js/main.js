var signupName = document.getElementById("signupName");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var btnSign = document.querySelector(".btnSign");
var btnLogin = document.querySelector(".btnLogin");
var btnLogOut = document.querySelector(".btnLogOut");
var incorrect = document.getElementById("incorrect");
var username = document.getElementById("username");
var arrayUser = [];

// check if the localStorage contain users or not
if (localStorage.getItem("users") !== null) {
  arrayUser = JSON.parse(localStorage.getItem("users"));
}

// check if the user is login or not
if (localStorage.getItem("user") !== null) {
  var userStore = JSON.parse(localStorage.getItem("user"));
  username.innerHTML = `Welcome ${userStore.name}`;
}

// this function is for user registration
function signUp() {
  var user = {
    name: signupName.value,
    email: signinEmail.value,
    password: signinPassword.value,
  };

  if (
    validation(signupName) &&
    validation(signinEmail) &&
    validation(signinPassword)
  ) {
    if (isFound(arrayUser, signinEmail.value)) {
      ErrorInput("text-danger", "email already exists");
      return;
    }
    if (
      signupName.value !== "" &&
      signinEmail.value !== "" &&
      signinPassword.value !== ""
    ) {
      arrayUser.push(user);
      window.localStorage.setItem("users", JSON.stringify(arrayUser));
      clearForm();
      showResult("success");
    } else {
      showResult("danger");
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      html: `
    <p><strong>Please follow the rules below for each input:</strong></p>
    <ul style="text-align: left;">
      <li><strong>Name:</strong> Must contain only letters and spaces, between 3 and 20 characters.</li>
      <li><strong>Email:</strong> Must be a valid email address in the format: example@domain.com.</li>
      <li><strong>Password:</strong> Must be between 6 and 20 characters, containing letters, numbers, and allowed symbols (!@#$%^&*).</li>
    </ul>
  `,
    });
  }
}
// function login user
function login() {
  if (signinEmail.value === "") {
    ErrorInput("text-danger", "Please Enter Email");
    return;
  }
  if (signinPassword.value === "") {
    ErrorInput("text-danger", "Please Enter Password ");
    return;
  }
  if (!arrayUser.length) {
    ErrorInput("text-danger", "Email is not Found please go to register ");
    return;
  }
  for (var i = 0; i < arrayUser.length; i++) {
    if (arrayUser[i].email === signinEmail.value) {
      if (arrayUser[i].password === signinPassword.value) {
        incorrect.classList.remove(`text-danger`);
        incorrect.innerHTML = ``;
        console.log(username);
        console.log(userStore);
        goToHomePage(arrayUser[i]);

        return;
      } else {
        ErrorInput("text-danger", "The Password is incorrect");
      }
    } else {
      ErrorInput("text-danger", "Email is not Found please go to register ");
    }
  }
}
// this function validation the value in input
function validation(input) {
  var regex = {
    signupName: /^[a-zA-Z\s]{3,20}$/,
    signinEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    signinPassword: /^[A-Za-z0-9!@#$%^&*]{6,20}$/,
  };

  if (regex[input.id]?.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
// this function search if the email is register or not
function isFound(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].email === value) {
      return true;
    }
  }
  return false;
}
// function show result input value
function showResult(result) {
  if (result === "success") {
    incorrect.classList.remove("text-danger");
    incorrect.classList.add("text-success");
    incorrect.innerHTML = "<span>Success</span>";
  } else {
    incorrect.innerHTML = "<span>All inputs is required</span>";
    incorrect.classList.remove("text-success");
    incorrect.classList.add("text-danger");
  }
}
function goToHomePage(user) {
  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "./home.html";
}
// function show error in form
function ErrorInput(classColor, errorText) {
  incorrect.classList.add(`${classColor}`);
  incorrect.innerHTML = `<span> ${errorText} </span>`;
}
// this function clear the input value
function clearForm() {
  signupName.value = null;
  signinEmail.value = null;
  signinPassword.value = null;
}

// function logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "./index.html";
}
// check the element is find or not so as not to give me error
if (btnSign) {
  btnSign.addEventListener("click", signUp);
}
if (btnLogin) {
  btnLogin.addEventListener("click", function (e) {
    e.preventDefault();
    login();
  });
}
if (btnLogOut) {
  btnLogOut.addEventListener("click", logout);
}
