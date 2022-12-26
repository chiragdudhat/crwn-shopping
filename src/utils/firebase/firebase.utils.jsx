import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'; 

import {
     getFirestore, doc, getDoc, setDoc
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDCuyJr_ybqjF_0n5w0GzcpyEGeyPVr9v4",
  authDomain: "crwn-clothing-db-99a58.firebaseapp.com",
  projectId: "crwn-clothing-db-99a58",
  storageBucket: "crwn-clothing-db-99a58.appspot.com",
  messagingSenderId: "952700292906",
  appId: "1:952700292906:web:cfd9c88cac46abe1a99853"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
    prompt:'select_account'
});
    
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
        userAuth,
        additionalInfo = {}
    ) => {

    const userDocRef =  doc(db, 'users', userAuth.uid); 

    const userSnapshot= await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth ;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
                
            });
            
        }catch (error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};


export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return; 


    return await createUserWithEmailAndPassword(auth, email, password); 

}

export const signInAuthWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return; 


    return await signInWithEmailAndPassword(auth, email, password); 
}

export const signOutUser = async ()=> {
        return await signOut(auth);
}

export const onAuthStateChangedListener = (callback)=> {
    onAuthStateChanged(auth, callback);
}