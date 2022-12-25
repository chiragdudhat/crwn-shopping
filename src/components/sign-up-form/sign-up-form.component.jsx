
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import { useState } from "react";
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import FormButton from '../button/button.component';

const defaultFormField= {
    displayName : '',
    email: '',
    password: '',
    confirmPassword: ''

}



const SignUpForm = ()=> {

    const [formFields, setFormFields] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword} = formFields; 

    const clearForm = ()=> {
        setFormFields(defaultFormField);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
      
        if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
                
            ); 

           await createUserDocumentFromAuth(user, {displayName});
       

        }catch(error){

            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user. already exists');
            }else{
                console.log("user creation encounter an error", error);
            }
                
        }
        clearForm();
    }
    const changeHandler = (event)=> {
        const {name, value } = event.target;
 
        setFormFields({...formFields, [name]:value})
     }
    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email id</span>
            <form action="" onSubmit={handleSubmit}>
                <FormInput
                  label = "DisplayName"
                  type=" text"  
                  required 
                  name="displayName" 
                  value={displayName}
                  onChange={changeHandler}
                />

                <FormInput
                  label = "Email"
                  required
                  type="email" 
                  name="email" 
                  value={email}  
                  onChange={changeHandler}
                />

                <FormInput
                  label = "Password"
                  type="password"  
                  required 
                  name="password" 
                  value={password}
                  onChange={changeHandler}
                />

                <FormInput
                  label = "Confirm Password"
                  type="password"  
                  required 
                  name="confirmPassword" 
                  value={confirmPassword}
                  onChange={changeHandler}
                />
                
                <FormButton type='submit'>Sign Up</FormButton>
            </form>
        </div>
    );
};

export default SignUpForm; 