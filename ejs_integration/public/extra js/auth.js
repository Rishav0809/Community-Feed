// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCF0x0quLkmErCM_naQcRv9UU4nkKCmB50",
//   authDomain: "psyberduck-bb30c.firebaseapp.com",
//   databaseURL:
//     "https://psyberduck-bb30c-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "psyberduck-bb30c",
//   storageBucket: "psyberduck-bb30c.appspot.com",
//   messagingSenderId: "152648286144",
//   appId: "1:152648286144:web:85698f9426612290bd9225",
//   measurementId: "G-9NR8NTL7VC",
// };

// const appFire = initializeApp(firebaseConfig);

// const auth = getAuth(appFire);

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
document.getElementById("gSignin").addEventListener("click", () => {
  console.log("click");
});

// import { GoogleAuthProvider } from "firebase/auth";

// const provider = new GoogleAuthProvider();

// provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
