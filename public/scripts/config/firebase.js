import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyD-bZvb5htlvodH5uz6D1iUyk_V6Pbt1C0",
    authDomain: "site-demo-auth-crud.firebaseapp.com",
    databaseURL: "https://site-demo-auth-crud-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "site-demo-auth-crud",
    storageBucket: "site-demo-auth-crud.appspot.com",
    messagingSenderId: "462470173849",
    appId: "1:462470173849:web:48d841c398d0c1fb4f9408",
    measurementId: "G-749F7XLPR6"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export function analyticsEvent(event) {
    logEvent(analytics, event);
}