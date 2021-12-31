import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
export const firebaseAuth = getAuth();

export const googleSignIn = () => {
  return signInWithPopup(firebaseAuth, provider)
    .then(({ user }) => {
      console.log(user);
      return user;
    })
    .catch((error) => {
      console.log(error);
      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const googleSignOut = () => {
  signOut(firebaseAuth);
};
