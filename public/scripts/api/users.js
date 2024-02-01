import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { appendErrorMessage, showErrorModal } from "../util/errorHandler.js";
import { firebase } from "../config/firebase.js";

const auth = firebase().auth;

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

export function logout() {

    showErrorModal('Logout initiated! Are you prepared for the real world? 🌐', true);

	const confirmBtn = document.querySelector('#dialogConfirmBtn');
	confirmBtn.addEventListener('click', (e) => { 

		signOut(auth);
		document.querySelector('dialog').close();
    });
}