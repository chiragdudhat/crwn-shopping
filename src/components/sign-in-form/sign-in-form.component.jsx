
import { createUserDocumentFromAuth, signInAuthWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import { useState } from "react";
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import FormButton from '../button/button.component';
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const defaultFormField= {
    email: '',
    password: ''
}


const SignInForm = ()=> {

    const [formFields, setFormFields] = useState(defaultFormField);
    const { email, password} = formFields; 

   

    const clearForm = ()=> {
        setFormFields(defaultFormField);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
      
        try{
            await signInAuthWithEmailAndPassword( email, password );
            clearForm();
        } catch(error){
            if(error.code === 'auth/user-not-found'){
                alert('User not found. Please sign-Up first')
            } else if (error.code === 'auth/wrong-password'){
                alert('Wrong Password for email')
            }else
              console.log(error);
        }
      
    }
    const signInWithGoogle = async() => {
       await signInWithGooglePopup();
        
    }; 

    const changeHandler = (event)=> {
        const {name, value } = event.target;
 
        setFormFields({...formFields, [name]:value})
     }
    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email id</span>
            <form action="" onSubmit={handleSubmit}>
                
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
                <div className='buttons-container'>
                    <FormButton  type='submit'>Sign In</FormButton>
                    <FormButton type='button' buttonType='google' onClick={signInWithGoogle}>
                        Google Sign In
                    </FormButton>
                </div>
            </form>
        </div>
    );
};

export default SignInForm; 