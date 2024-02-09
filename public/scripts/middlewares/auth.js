import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "../config/firebase.js";

export async function authentication(ctx, next) {

    await onAuthStateChanged(auth, (user) => {
        if (user) {            
            ctx.userID = user.uid;
            ctx.displayName = user.displayName;
        }

        next();
    });
}