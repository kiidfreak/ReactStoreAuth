// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import {
        auth,
        signInWithGooglePopup,
        createUserDocumentfromAuth,
        // signInWithGoogleRedirect,
        } from "../../utils/firebase/firebase.utils";
const SignIn = () => {

    // useEffect(() => {   
    //     const getRedirectResultFromGoogle = async () => {
    //         const result = await getRedirectResult(auth);
    //         if (result) {
    //             const userDocRef = await createUserDocumentfromAuth(result.user);
    //         }
    //     }
    //     getRedirectResultFromGoogle();
    // },[]);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentfromAuth(user);
    }


    return (
            <div className='sign-in'>
            <h1>I already have an account</h1>
            <span>Sign in with your email and password</span><br/>
            <button onClick={logGoogleUser}>Sign in with Google Pop-up</button>
            <SignUpForm/>
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}

        </div>
    )
}

export default SignIn;