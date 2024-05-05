"use strict";

import { userSignout } from "/model.mjs";

const signOut = document.querySelector(".sign-out-btn");

signOut.addEventListener("click", function (e) {
  e.preventDefault();
  userSignout();
});
