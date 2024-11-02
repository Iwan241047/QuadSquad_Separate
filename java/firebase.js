 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDbmD4rHZbcoIZwSkG03EBaTCCPu3oiQqI",
   authDomain: "quadsquad-deb87.firebaseapp.com",
   projectId: "quadsquad-deb87",
   storageBucket: "quadsquad-deb87.appspot.com",
   messagingSenderId: "1094931551145",
   appId: "1:1094931551145:web:679927d51ce598c8dd2ab8"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }
 //register
 const signUp = document.getElementById('submit-signUp-btn');
 signUp?.addEventListener('click', (event) => {
     event.preventDefault();
     const email = document.getElementById('rEmail').value;
     const password = document.getElementById('registerPassword').value;
     const username = document.getElementById('rUsername').value;
 
     const auth = getAuth();
     const db = getFirestore();
 
     // Password length validation
     if (password.length < 8) {
         showMessage('Password must be at least 8 characters long', 'signUpMessage');
         return; // Exit the function if the password is too short
     }
 
     if (password.length > 12) {
         showMessage('Password must be less than 12 characters long', 'signUpMessage');
         return; // Exit the function if the password is too long
     }
 
     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
         const user = userCredential.user;
         const userData = {
             email: email,
             username: username,
         };
         showMessage('Account Created Successfully', 'signUpMessage');
         
         const docRef = doc(db, "users", user.uid);
         setDoc(docRef, userData)
         .then(() => {
             window.location.href = '../html/home.html';
         })
         .catch((error) => {
             console.error("Error writing document", error);
         });
     })
     .catch((error) => {
         const errorCode = error.code;
         if (errorCode == 'auth/email-already-in-use') {
             showMessage('Email Address Already Exists !!!', 'signUpMessage');
         } else {
             showMessage('Unable to create User', 'signUpMessage');
         }
     });
 });

const signIn=document.getElementById('submit-signIn-btn');
signIn?.addEventListener('click', (event)=>{
   event.preventDefault();
   const email=document.getElementById('logEmail').value;
   const password=document.getElementById('logPassword').value;
   const auth=getAuth();

   signInWithEmailAndPassword(auth, email,password)
   .then((userCredential)=>{
       showMessage('login is successful', 'signInMessage');
       const user=userCredential.user;
       localStorage.setItem('loggedInUserId', user.uid);
       window.location.href='../html/home.html';  //change to home.html
   })
   .catch((error)=>{
    const errorCode=error.code;
    if(errorCode==='auth/invalid-credential'){
        showMessage('Incorrect Email or Password', 'signInMessage');
    }
    else{
        showMessage('Account does not Exist', 'signInMessage');
    }
})
});;





