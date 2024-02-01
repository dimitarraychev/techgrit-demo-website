import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebase } from "../config/firebase.js";

const auth = firebase().auth;

export async function authentication(ctx, next) {
    const welcomeMessage = document.querySelector('.username');
    const guestBtns = document.querySelectorAll('.guest');
    const userBtns = document.querySelectorAll('.user');

    await onAuthStateChanged(auth, (user) => {
        if (user) {
            welcomeMessage.textContent = `${auth.currentUser.displayName}`;
            userBtns.forEach(btn => btn.style.display = 'block');
            guestBtns.forEach(btn => btn.style.display = 'none');
            
            ctx.userID = user.uid;
            ctx.displayName = user.displayName;
        } else {
            welcomeMessage.textContent = 'Guest';
            userBtns.forEach(btn => btn.style.display = 'none');
            guestBtns.forEach(btn => btn.style.display = 'block');
        }
    });

    next();
}