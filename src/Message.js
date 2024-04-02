import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB0ESvN7O6EwyI98AAIw-jdFRaud5qGLQQ",
    authDomain: "cps630-project-ba3eb.firebaseapp.com",
    projectId: "cps630-project-ba3eb",
    storageBucket: "cps630-project-ba3eb.appspot.com",
    messagingSenderId: "1010540454168",
    appId: "1:1010540454168:web:2ff8c42b873ef28f47fe6d",
    measurementId: "G-EQWD2H27HV"
};

const db = firebaseConfig.firestore();

function sendMessage(postID){
    console.log('Sending message to post:', postID);

    return (
        <div>
            <h1>Messages</h1>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    )
    
}

export default sendMessage;