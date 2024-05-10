"use strict";
//firebase initialization

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
  get,
  set,
  ref,
  getDatabase,
  child,
  onValue,
  remove,
  update,
  push,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateEmail,
  verifyBeforeUpdateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBb38dIHTI66XZmHYhRHAokDZJYsMIWWCA",
  authDomain: "expenseshare-ca3e7.firebaseapp.com",
  databaseURL: "https://expenseshare-ca3e7-default-rtdb.firebaseio.com",
  projectId: "expenseshare-ca3e7",
  storageBucket: "expenseshare-ca3e7.appspot.com",
  messagingSenderId: "945129107854",
  appId: "1:945129107854:web:6ead4fb60fced51dc8b4df",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

window.addEventListener("focusin", function () {
  if (
    window.location.pathname !== "/signup.html" &&
    !window.localStorage.getItem("state") &&
    window.location.pathname !== "/"
  ) {
    this.window.location.pathname = "/";
  }
});

const registerUser = async function (name, mobile, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      if (credentials) {
        sendEmailVerification(auth.currentUser).then(
          createUser(name, email, mobile, password).then((data) => {
            if (data === `useradded`) {
              window.location.pathname = "/verifyemail.html";
            }
          })
        );
      }
    })
    .catch((error) => {
      if ((error.code = "auth/email-already-in-use")) {
        alert(`this email is already linked to an account`);
      }
    });
};

const checkIfUser = async function (email) {
  const dbref = ref(db);
  let holder;
  let user;
  holder = await get(child(dbref, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((child) => {
        let mail = child.val().Email;

        if (mail === email) {
          user = `isUser`;
          return user;
        }
      });
    } else {
      user = `notUser`;
      return user;
    }
  });

  return user;
};

//user sign in
const userSignInWithEmail = async function (email, password) {
  if (!email && !password) return;
  let user = true;
  checkIfUser(email).then((data) => {
    if (data === `isUser`) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          if (userCredentials.user.emailVerified === false) {
            alert("The email id is not verified please verify your email");
            user = false;
            return user;
          } else {
            document.querySelector(".loader").classList.add("hidden");
            document.querySelector(".overlay").classList.add("hidden");
            window.location.pathname = "/home.html";
            window.localStorage.setItem("state", "home");
            user = true;
            return user;
          }
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential")
            alert("Invalid credentials try again!");
        });
    } else {
      alert(`you are not a user create an account `);
      document.querySelector(".loader").classList.add("hidden");
      document.querySelector(".overlay").classList.add("hidden");
      user = false;
      return user;
    }
  });
  return user;
};

//showing user details after sign, return a object that need to be shown at login
const ShowUserData = async function (email) {
  // things needed username, email, mobile, friends, groups, expenses
  let userObj;
  let holder = await get(child(ref(db), `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((child) => {
        if (child.val().Email === email) {
          userObj = child.val();
        }
      });
    }
  });
  return userObj;
};

//signout user
const userSignout = function () {
  signOut(auth).then(() => {
    window.location.pathname = "/";
    window.localStorage.removeItem("state");
  });
};

const autoLogin = async function () {
  const email = auth.currentUser.email;
  if (auth.currentUser.emailVerified !== true) {
    alert(`your email is not verified`);
  } else {
    document.querySelector(".loader").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
    getPassword(auth.currentUser.uid).then((password) => {
      if (password) {
        userSignInWithEmail(email, password);
      }
    });
  }
};

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    if (
      window.localStorage.getItem("state") === "home" &&
      window.location.pathname === "/home.html"
    ) {
      return;
    } else if (
      window.localStorage.getItem("state") === "home" &&
      window.location.pathname !== "/home.html"
    ) {
      autoLogin();
    }
  })
  .catch((error) => {
    console.log(error);
  });

const getPassword = async function (uid) {
  let holder;
  let pass;
  holder = await get(child(ref(db), `users/${uid}`))
    .then((snapshot) => {
      pass = snapshot.val().Password;
    })
    .catch((error) => {
      console.log(error);
    });
  return pass;
};

//update email
const updateMail = async function (newMail) {
  // get user id
  let message;
  let holder;
  const user = auth.currentUser;
  const userId = user.email;
  let ifUser;
  //check if alerady linked to an account
  ifUser = await checkIfUser(newMail).then((user) => {
    console.log(user);
    if (user === "notUser") {
      get(child(ref(db), `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let mail = snapshot.val().Email;
            console.log(mail === newMail);
            if (mail === newMail) {
              message = `nothing to update`;
              document.querySelector(".profile-message").textContent =
                "Nothing to update";
              return message;
            } else {
              message = `need`;
              return message;
            }
          }

          return message;
        })
        .then((msg) => {
          console.log(mgs);
          if (msg === "need") {
            promptForCredentials(newMail);
          }
        });
    } else {
      document.querySelector(
        ".update-message"
      ).textContent = `This email is alerady linked to another account.`;
    }
  });

  //compare those email with the user if not equal then update
};
//credential prompting function
const promptForCredentials = async function (newMail) {
  const modal = document.querySelector(".credential-modal-container");
  const pass = document.getElementById("pass-cred");
  const submit = document.querySelector(".cred-submit");
  const close = document.querySelector(".cred-close");
  modal.classList.remove("hidden");

  submit.addEventListener("click", function () {
    if (!pass.value) {
      alert(`credentials needed to do this operation`);
      modal.classList.add("hidden");
    } else if (pass.value) {
      console.log(pass.value);
      modal.classList.add("hidden");
      verifyAndUpdateEmail(pass.value, newMail);
    }
    modal.classList.add("hidden");
  });

  close.addEventListener("click", function () {
    modal.classList.add("hidden");
  });
};
const verifyAndUpdateEmail = function (pass, newMail) {
  const credential = EmailAuthProvider.credential(auth.currentUser.email, pass);
  reauthenticateWithCredential(auth.currentUser, credential)
    .then(() => {
      console.log(`reauth successfull`);
      verifyBeforeUpdateEmail(auth.currentUser, newMail).then(() => {
        const updates = {};
        updates["users/" + auth.currentUser.uid + "/" + "Email"] = newMail;
        update(ref(db), updates).then(() => {
          document.querySelector(".profile-message").textContent =
            "verify your new email id";
        });
      });
    })
    .catch((err) => console.log(err));
};

//update username
const updateName = function (newName) {
  if (!newName) {
    document.querySelector(
      ".update-message"
    ).textContent = `field can not be empty`;
  } else {
    get(child(ref(db), "users/" + auth.currentUser.uid + "/")).then(
      (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            if (snapshot.val().Name === newName) {
              document.querySelector(
                ".update-message"
              ).textContent = `same as old name`;
            } else {
              const updates = {};
              updates["users/" + auth.currentUser.uid + "/" + "Name"] = newName;
              update(ref(db), updates).then(() => {
                document.querySelector(
                  ".update-message"
                ).textContent = `Name updated`;
              });
            }
          });
        }
      }
    );
  }
};

//update mobile
const updateMobile = function (newMobile) {
  if (!newMobile) {
    document.querySelector(
      ".update-message"
    ).textContent = `field can not be empty`;
  } else {
    get(child(ref(db), `users/${auth.currentUser.uid}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          if (snapshot.val().child === newMobile) {
            document.querySelector(
              ".update-message"
            ).textContent = `This is the old number`;
          } else {
            const updates = {};
            updates["users/" + auth.currentUser.uid + "/" + "Mobile"] =
              newMobile;
            update(ref(db), updates).then(() => {
              document.querySelector(
                ".update-message"
              ).textContent = `Mobile updated`;
            });
          }
        });
      }
    });
  }

  //
};

const reauthenticateAndUpdatePass = function (old, newpass) {
  if (!auth.currentUser) {
    alert(`your session has expired login again`);
    userSignout();
  }
  const credential = EmailAuthProvider.credential(auth.currentUser.email, old);

  reauthenticateWithCredential(auth.currentUser, credential)
    .then(() => {
      updatePassword(auth.currentUser, newpass).then(() => {
        const updates = {};
        updates["users/" + auth.currentUser.uid + "/" + "Password"] = newpass;
        update(ref(db), updates).then(() => {
          document.querySelector(
            ".update-message"
          ).textContent = ` password updated`;
        });
      });
    })
    .catch((error) => {
      if (error.code === "auth/invalid-credential") {
        document.querySelector(
          ".update-message"
        ).textContent = `password incorrect`;
      }
      console.log(error);
    });
};
//update password
const updatePasswordFn = function (old, newpass, newcnfpass) {
  if (old === "" || newpass == "" || newcnfpass === "") {
    document.querySelector(
      ".update-message"
    ).textContent = `field can not be empty`;
  } else if (newpass !== newcnfpass) {
    document.querySelector(
      ".update-message"
    ).textContent = ` match new password`;
  } else if (old === newpass) {
    document.querySelector(
      ".update-message"
    ).textContent = `can not set old password as new one`;
  } else {
    reauthenticateAndUpdatePass(old, newcnfpass);
  }
};

//profile

// basic get set retrieve and remove methods
async function setData(path, object) {
  let user;
  user = await set(ref(db, path), object);
  return `useradded`;
}

function getUserData(userId) {
  const dbref = ref(db);
  get(child(dbref, `user/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(`snapshot recieved:`, snapshot.val());
      console.log(snapshot.val());
    } else {
      ``;
      console.log("no such data available");
    }
  });
}

// firebase basics end here

const createUser = async function (name, email, mobile, password) {
  let useradded;
  // console.log(auth.currentUser);
  const userIdDB = auth.currentUser.uid;
  const userObj = {
    Name: name,
    Email: email,
    Mobile: mobile,
    Password: password,
    friends: ["none"],
    groups: ["none"],
  };

  useradded = await setData(`users/${userIdDB}`, userObj);
  return useradded;
};

export {
  createUser,
  registerUser,
  userSignInWithEmail,
  userSignout,
  updateMail,
  updateName,
  updateMobile,
  updatePasswordFn,
  ShowUserData,
};
