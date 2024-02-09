import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { appendErrorMessage, showErrorModal } from "../util/errorHandler.js";
import { auth } from "../config/firebase.js";

export async function register(username, email, password) {

	try {
		await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(auth.currentUser, { displayName: username });
	} catch (error) {
		appendErrorMessage(error.message);
	}
}

export async function login(email, password) {

	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		appendErrorMessage(error.message);
	}
}

export async function logout() {

	try {
		await signOut(auth);	
	} catch (error) {
		showErrorModal('A wild error occured! 🏞️')
	}
}