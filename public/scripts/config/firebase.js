import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const config = {
    apiKey: "AIzaSyD-bZvb5htlvodH5uz6D1iUyk_V6Pbt1C0",
    authDomain: "site-demo-auth-crud.firebaseapp.com",
    databaseURL: "https://site-demo-auth-crud-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "site-demo-auth-crud",
    storageBucket: "site-demo-auth-crud.appspot.com",
    messagingSenderId: "462470173849",
    appId: "1:462470173849:web:48d841c398d0c1fb4f9408"
};

export function firebase() {

    const app = initializeApp(config);
    const database = getFirestore(app);
    const auth = getAuth(app);

    return { database, auth };
}