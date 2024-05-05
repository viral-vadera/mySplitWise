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
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCBvHiVeINZCdd08OJjK7cmNMc7pgqrezI",
  authDomain: "auth-49527.firebaseapp.com",
  databaseURL: "https://auth-49527-default-rtdb.firebaseio.com",
  projectId: "auth-49527",
  storageBucket: "auth-49527.appspot.com",
  messagingSenderId: "399703751110",
  appId: "1:399703751110:web:8811a028d8f624e8e29ac7",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

window.addEventListener("change", function () {
  if (
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
        } else {
          user = `notUser`;
        }
      });
    }
  });
  return user;
};

//user sign in
const userSignInWithEmail = async function (email, password) {
  if (!email && !password) return;

  checkIfUser(email).then((data) => {
    if (data === `isUser`) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          if (userCredentials.user.emailVerified === false) {
            alert("The email id is not verified please verify your email");
          } else {
            document.querySelector(".loader").classList.add("hidden");
            document.querySelector(".overlay").classList.add("hidden");
            window.location.pathname = "/home.html";
            window.localStorage.setItem("state", "home");
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
    }
  });
};

//signout user
const userSignout = function () {
  signOut(auth).then(() => {
    window.location.pathname = "/";
    window.localStorage.removeItem("state");
    console.log(auth.currentUser);
  });
};

const autoLogin = async function () {
  const email = auth.currentUser.email;
  document.querySelector(".loader").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
  getPassword(auth.currentUser.uid).then((password) => {
    if (password) {
      userSignInWithEmail(email, password);
    }
  });
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
  holder = await get(child(ref(db), `users/${uid}`)).then((snapshot) => {
    pass = snapshot.val().Password;
  });
  return pass;
};

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

export { createUser, registerUser, userSignInWithEmail, userSignout };
