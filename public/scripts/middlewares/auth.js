import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebase } from "../config/firebase.js";

const auth = firebase().auth;

export async function authentication(ctx, next) {

    await onAuthStateChanged(auth, (user) => {
        if (user) {            
            ctx.userID = user.uid;
            ctx.displayName = user.displayName;
        }

        next();
    });
}