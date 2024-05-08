"use strict";

import {
  userSignout,
  updateMail,
  updateName,
  updateMobile,
  updatePasswordFn,
} from "/model.mjs";

//selections
const userDropdown = document.querySelector(".user-dropdown");
const userDropdownContent = document.querySelector(".user-dropdown-content");
const signOut = document.querySelector(".sign-out-btn");
const profile = document.querySelector(".profile");
const profileModal = document.querySelector(".profile-modal-container");
const profileModalClose = document.querySelector(".close-profile-modal");
const overlay = document.querySelector(".overlay");
const usernameInp = document.getElementById("edit-user-name");
const editUsernamebtn = document.querySelector(".edit-username-btn");
const submitUsernameBtn = document.querySelector(".submit-username-btn");
const emailInp = document.getElementById("edit-user-email");
const editEmailbtn = document.querySelector(".edit-email-btn");
const submitEmailBtn = document.querySelector(".submit-email-button");
const mobileInp = document.getElementById("edit-user-mobile");
const editMobileebtn = document.querySelector(".edit-mobile-btn");
const submitMobileBtn = document.querySelector(".submit-mobile-btn");
const editPasswordBtn = document.querySelector(".edit-pass-btn");
const submitPasswordBtn = document.querySelector(".submit-pass-btn");
const passwordEditSlider = document.querySelector(".edit-password-slider");
const editOldPasswordInp = document.getElementById("edit-user-password");
const editNewPasswordInp = document.getElementById("edit-user-new-password");
const editNewConfPassInp = document.getElementById(
  "edit-user-new-confirmed-password"
);
const profileMessage = document.querySelector(".update-message");
const profileMessageContainer = document.querySelector(".update-message");
signOut.addEventListener("click", function (e) {
  e.preventDefault();
  userSignout();
});

window.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.matches(".user-dropdown")) {
    userDropdownContent.classList.toggle("hidden");
  } else {
    userDropdownContent.classList.add("hidden");
  }
});

profile.addEventListener("click", function (e) {
  e.preventDefault();
  //showing the modal
  profileModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  //populating the fields text content
  usernameInp.setAttribute("placeholder", `username`);
  emailInp.setAttribute("placeholder", `viralvadera@gmail.com`);
  mobileInp.setAttribute("placeholder", "9408523060");
  //disabiling the fields

  //overlay close mechanism
  overlay.addEventListener("click", function (e) {
    e.preventDefault();
    profileModal.classList.add("hidden");
    overlay.classList.add("hidden");
    profileMessage.textContent = "";
    editOldPasswordInp.value = "";
    editNewPasswordInp.value = "";
    editNewConfPassInp.value = "";
  });

  //modal close button close mechanism
  profileModalClose.addEventListener("click", function (e) {
    e.preventDefault();
    profileModal.classList.add("hidden");
    overlay.classList.add("hidden");
    profileMessage.textContent = "";
    editOldPasswordInp.value = "";
    editNewPasswordInp.value = "";
    editNewConfPassInp.value = "";
  });

  // editing the username
  editUsernamebtn.addEventListener("click", function (e) {
    e.preventDefault();
    profileMessage.textContent = "";
    usernameInp.removeAttribute("disabled");
    submitUsernameBtn.addEventListener("click", function (e) {
      e.preventDefault();
      usernameInp.setAttribute("disabled", "");
      updateName(usernameInp.value);
    });
  });

  //editing the email
  editEmailbtn.addEventListener("click", function (e) {
    e.preventDefault();
    profileMessage.textContent = "";
    emailInp.removeAttribute("disabled");
    submitEmailBtn.addEventListener("click", function (e) {
      updateMail(emailInp.value);
      emailInp.setAttribute("disable", "");
    });
  });
  //editing the mobile
  editMobileebtn.addEventListener("click", function (e) {
    e.preventDefault();
    profileMessage.textContent = "";
    mobileInp.removeAttribute("disabled");
    submitMobileBtn.addEventListener("click", function (e) {
      updateMobile(mobileInp.value);
      mobileInp.setAttribute("disabled", "");
    });
  });
  //editing the password
  editPasswordBtn.addEventListener("click", function () {
    profileMessage.textContent = "";
    passwordEditSlider.classList.remove("hidden");
    submitPasswordBtn.addEventListener("click", function () {
      updatePasswordFn(
        editOldPasswordInp.value,
        editNewPasswordInp.value,
        editNewConfPassInp.value
      );
    });
  });
});
