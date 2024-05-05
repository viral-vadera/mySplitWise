// imports
import { userSignInWithEmail } from "./model.mjs";

const loginBtn = document.querySelector(".login");
const loginId = document.querySelector("#user-name");
const password = document.querySelector("#password");
const tooltipUser = document.querySelector(".tooltip-user");
const tooltipPass = document.querySelector(".tooltip-pass");
const signUPGG = document.querySelector(".signup-gg");
const signupBtn = document.querySelector(".signup");
const overlay = document.querySelector(".overlay");
const spinner = document.querySelector(".loader");
loginId.focus();

// login id validation
const validRegexUser =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
loginId.addEventListener("keyup", function () {
  if (loginId.value.length !== 0 && loginId.value.match(validRegexUser)) {
    loginId.style.border = "2px solid green";
    tooltipUser.classList.add("hidden");
    // document.querySelector(".tooltip-txt-user").textContent = ``;
  }
});

loginId.addEventListener("focusout", function () {
  if (loginId.value.length === 0) {
    tooltipUser.classList.remove("hidden");
    document.querySelector(
      ".tooltip-txt-user"
    ).textContent = `Email id is required`;
    loginId.focus();
  } else if (!loginId.value.match(validRegexUser)) {
    // loginId.value = "";
    tooltipUser.classList.remove("hidden");
    document.querySelector(
      ".tooltip-txt-user"
    ).textContent = `Invalid username`;
    loginId.focus();
  }
});

//password validation
const validRegexPass = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
password.addEventListener("focusin", function () {
  tooltipPass.classList.remove("hidden");
  document.querySelector(".tooltip-txt").textContent = `Password should have 
  1. minimum 8 characters. 
  2. symbols{!@#$%^&*} should be used. 
  3. numbers, small and capital letters are allowed`;
});

password.addEventListener("focusout", function () {
  tooltipPass.classList.add("hidden");
});
password.addEventListener("keydown", function () {
  // console.log("triggered");
  setTimeout(1000);
  if (password.value.length === 0) {
    document.querySelector(".tooltip-txt").textContent =
      "you can't login without a password";
  } else if (password.value.length < 8) {
    document.querySelector(".tooltip-txt").textContent =
      "password should be longer";
  } else if (password.value.match(validRegexPass)) {
    password.style.border = "2px solid green";
    tooltipPass.classList.add("hidden");
  }
});

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (loginId.value === "" || password.value === "")
    alert("need credentials to login");

  userSignInWithEmail(loginId.value, password.value);
});

signupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.pathname = "/signup.html";
});
