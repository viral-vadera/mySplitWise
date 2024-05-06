"use strict";

import { userSignout } from "/model.mjs";

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
const editOldPasswordInp = document.querySelector(".edit-user-password");
const editNewPasswordInp = document.querySelector(".edit-user-new-password");
const editNewConfPassInp = document.querySelector(
  ".edit-user-new-confirmed-password"
);
const profileMessage = document.querySelector(".profile-message");
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
  });

  //modal close button close mechanism
  profileModalClose.addEventListener("click", function (e) {
    e.preventDefault();
    profileModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  // editing the username
  editUsernamebtn.addEventListener("click", function (e) {
    e.preventDefault();

    usernameInp.removeAttribute("disabled");
    submitUsernameBtn.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        usernameInp.setAttribute("disabled", "");
      },
      { once: true }
    );
  });

  //editing the email
  editEmailbtn.addEventListener("click", function (e) {
    e.preventDefault();
    emailInp.removeAttribute("disabled");
    submitEmailBtn.addEventListener(
      "click",
      function (e) {
        updateEmail(emailInp.value).then((data) => {
          emailInp.setAttribute("disabled", "");
          if (data === "Email updated") {
            profileMessageContainer.classList.remove("hidden");
            profileMessage.textContent = "Emailupdated";
          } else {
            profileMessage.textContent = "something went wrong !";
          }
        });
      },
      { once: true }
    );
  });
  //editing the mobile
  editMobileebtn.addEventListener("click", function (e) {
    e.preventDefault();
    mobileInp.removeAttribute("disabled");
    submitMobileBtn.addEventListener(
      "click",
      function (e) {
        mobileInp.setAttribute("disabled", "");
      },
      { once: true }
    );
  });
  //editing the password
  editPasswordBtn.addEventListener("click", function () {
    passwordEditSlider.classList.remove("hidden");
  });

  submitPasswordBtn.addEventListener("click", function () {
    passwordEditSlider.classList.add("hidden");
    // valdiateOldPass(editOldPasswordInp.value)
    //if(newpass == new pass confirm){
    //makesure the field are not empty
    // show on the screen green and also then only update pass
    // }
    // updatePassword(editNewConfPassInp.value);
  });
});
