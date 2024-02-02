import { useState } from "react";

import { createAuthUserWithEmailandPassword, createUserDocumentfromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss';

import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetformFields = () => { setFormFields(defaultFormFields)};

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailandPassword(email, password);
            
            console.log(user);
            await createUserDocumentfromAuth(user, {displayName});
            resetformFields();

        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use');
            }else{
                alert('User Creation Error');
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };



    return (
        <div className="sign-up-form">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span><br/>

            <form onSubmit ={handleSubmit} >
                <FormInput type="text" name="displayName" value={displayName} label="Display Name" required  onChange={handleChange}/>
                <FormInput type="email" name="email" value={email} label="Email" required onChange={handleChange}/>
                <FormInput type="password" name="password" value={password} label="Password" required onChange={handleChange}/>
                <FormInput type="password" name="confirmPassword" value={confirmPassword} label="Confirm Password" required onChange={handleChange}/>
                <Button type="submit">Sign Up</Button>
            </form>

        </div>
    )
}

export default SignUpForm;