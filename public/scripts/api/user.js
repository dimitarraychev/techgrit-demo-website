import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { appendErrorMessage, showErrorModal } from "../util/errorHandler.js";

let context;

export async function register(e, ctx, username, email, password) {

    context = ctx;

	try {
		const userCredentials = await createUserWithEmailAndPassword(context.auth, email, password);
		const response = await updateProfile(context.auth.currentUser, { displayName: username });
		e.target.reset();
		context.redirect('/posts#all');
	} catch (error) {
		appendErrorMessage(error.message);
	}
}

export async function login(e, ctx, email, password) {

    context = ctx;

	try {
		const userCredentials = await signInWithEmailAndPassword(context.auth, email, password);
		e.target.reset();
		context.redirect('/posts#all');
	} catch (error) {
		appendErrorMessage(error.message);
	}
}

export async function logout(auth, redirect) {

    const response = await signOut(auth);
	redirect('/');    
}