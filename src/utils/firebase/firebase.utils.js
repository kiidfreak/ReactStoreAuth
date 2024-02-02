// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,
      signInWithRedirect,
      signInWithPopup,
      GoogleAuthProvider,
      createUserWithEmailAndPassword,
    } from 'firebase/auth';

import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVPCjC3DZ8j1zHiiqvQGzyO6EgfrVuBV8",
  authDomain: "crwn-clothing-b3f51.firebaseapp.com",
  projectId: "crwn-clothing-b3f51",
  storageBucket: "crwn-clothing-b3f51.appspot.com",
  messagingSenderId: "271112094776",
  appId: "1:271112094776:web:4a5975e24f6a25815912cd",
  measurementId: "G-R4CFBYDDX8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({prompt: 'select_account'});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);

export const db = getFirestore();

export const createUserDocumentfromAuth = async (userAuth,
    additionalInformation={}) => {
    if(!userAuth){
        return;
    }
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());
   
    //if user does not exist in the database, create a new user

    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
};


export const createAuthUserWithEmailandPassword = async (email, password) => {
    if(!email || !password){
        return;
    }
return await createUserWithEmailAndPassword(auth, email, password);
};

export default firebaseApp;