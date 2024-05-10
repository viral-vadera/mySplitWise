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
const loader = document.querySelector(".loader");
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
const dashboardTrigger = document.querySelector(".dashboard-trigger");
const recentActivityTrigger = document.querySelector(
  ".recent-activity-trigger"
);
const allExpensesTrigger = document.querySelector(".all-expenses-trigger");
const dashboardContainer = document.querySelector(".dashboard-container");
const recentActivityContainer = document.querySelector(
  ".recent-activity-container"
);
const allExpensesContainer = document.querySelector(".all-expenses-container");
const groupAddBtn = document.querySelector(".grp-add");
const groupModal = document.querySelector(".grp-mdl-container");
const clsoeGroupModal = document.querySelector(".close-grp-modal");
const addMemeberInputGrp = document.querySelector(".add-member");
const member = document.querySelector(".member");
const addMemberForm = document.querySelector(".add-members");
const addExpenseBtn = document.getElementById("add-expense");
const addExpenseModal = document.querySelector(".modal-container");
const closeExpenseModal = document.querySelector(".close-expense-modal");
const cancelExpenseModal = document.querySelector(".cnf-exp-close-modal");
const addFrndBtn = document.querySelector(".frnd-add");
const addFrndModal = document.querySelector(".add-frnd-modal-container");
const closeFrndModal = document.querySelector(".close-frnd-modal");
const sendFrndInvites = document.querySelector(".send-invite");
const frndModalMsg = document.querySelector(".frnd-msg");
//displaying infromation after user login
const displayUserInfo = function () {
  if (localStorage.getItem("user")) {
    let userdata = JSON.parse(localStorage.getItem("user"));
    userDropdown.textContent = `${userdata.Name}`;
  }
};
displayUserInfo();

signOut.addEventListener("click", function (e) {
  e.preventDefault();
  userSignout();
});

//user dropdown event listener
window.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.matches(".user-dropdown")) {
    userDropdownContent.classList.toggle("hidden");
  } else {
    userDropdownContent.classList.add("hidden");
  }
});
//update user
profile.addEventListener("click", function (e) {
  e.preventDefault();
  //showing the modal
  profileModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  //populating the fields text content
  let userdata = JSON.parse(localStorage.getItem("user"));
  usernameInp.setAttribute("placeholder", `${userdata.Name}`);
  emailInp.setAttribute("placeholder", `${userdata.Email}`);
  mobileInp.setAttribute("placeholder", `${userdata.Mobile}`);
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
    passwordEditSlider.classList.add("hidden");
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

//Dashboard
dashboardTrigger.addEventListener("click", function (e) {
  e.preventDefault();
  dashboardContainer.classList.remove("hidden");
  recentActivityContainer.classList.add("hidden");
  allExpensesContainer.classList.add("hidden");
});

//Recent activity
recentActivityTrigger.addEventListener("click", function (e) {
  e.preventDefault();
  dashboardContainer.classList.add("hidden");
  recentActivityContainer.classList.remove("hidden");
  allExpensesContainer.classList.add("hidden");
});

//All expenses
allExpensesTrigger.addEventListener("click", function (e) {
  e.preventDefault();
  dashboardContainer.classList.add("hidden");
  recentActivityContainer.classList.add("hidden");
  allExpensesContainer.classList.remove("hidden");
});

//add expense modal
addExpenseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addExpenseModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  closeExpenseModal.addEventListener("click", function (e) {
    e.preventDefault();
    addExpenseModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
  overlay.addEventListener("click", function (e) {
    e.preventDefault();
    addExpenseModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  cancelExpenseModal.addEventListener("click", function (e) {
    e.preventDefault(e);
    addExpenseModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
});
// add group modal
groupAddBtn.addEventListener("click", function (e) {
  e.preventDefault();
  groupModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  //closing the modal with overlay
  overlay.addEventListener("click", function () {
    groupModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
  //closing the modal with close symbol
  clsoeGroupModal.addEventListener("click", function () {
    groupModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
});
//adding members to the group modal
addMemeberInputGrp.addEventListener("click", function (e) {
  let html = `<div class="member">
  <input type="text" placeholder="Name" />
  <input type="email" placeholder="email@example.com" />
  <span
    onclick="this.parentElement.remove()"
    class="remove-member"
    >&#10006;</span
  >
</div>`;
  addMemberForm.innerHTML = addMemberForm.innerHTML + html;
});

// add friends modal
addFrndBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addFrndModal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  closeFrndModal.addEventListener("click", function () {
    addFrndModal.classList.add("hidden");
    overlay.classList.add("hidden");
    frndModalMsg.textContent = "";
  });

  overlay.addEventListener("click", function () {
    addFrndModal.classList.add("hidden");
    overlay.classList.add("hidden");
    frndModalMsg.textContent = "";
  });

  sendFrndInvites.addEventListener("click", function () {
    frndModalMsg.textContent = "sending invites...";
  });
});
