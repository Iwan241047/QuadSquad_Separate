import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {getAuth,  onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

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

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserUsername').innerText=userData.username;
                document.getElementById('loggedUserEmail').innerText=userData.email;


            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })


  const logoutButton=document.getElementById('authButton');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='../html/signIn.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })