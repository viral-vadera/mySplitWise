"use strict";

import { registerUser } from "./model.mjs";
const appContainer = document.querySelector(".app-container");
const signupCard = document.querySelector(".signup-container");
const verificationCard = document.querySelector(
  ".email-verification-container"
);

const form = document.getElementById("signupform");
const fullName = document.getElementById("name");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const password = document.getElementById("set-password");
const tooltip = document.querySelector(".tooltip");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (fullName.value && mobile.value && email.value && password.value) {
    registerUser(fullName.value, mobile.value, email.value, password.value);
  }
});

password.addEventListener("focusin", function () {
  tooltip.classList.remove("hidden");
  document.querySelector(".tooltip-txt").textContent = `Password should have 
    1. minimum 8 characters. 
    2. symbols{!@#$%^&*} should be used. 
    3. numbers, small and capital letters are allowed`;
});

password.addEventListener("focusout", function () {
  tooltip.classList.add("hidden");
});
