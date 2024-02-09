export function appendErrorMessage(error) {

	const errorField = document.querySelector('.error-msg');
	
	if (error == 'empty') return errorField.textContent = 'Uh-oh! All fields are required.';
	if (error == 'match') return errorField.textContent = 'Oops! Passwords should match.';
	if (error == 'length') return errorField.textContent = 'Sorry, username should be between 3 and 20 characters.';
	if (error == 'profane') return errorField.textContent = 'Sorry, username cannot contain profanity.';
	if (error == 'title') return errorField.textContent = 'Oops, title should be between 5 and 100 characters.';
	if (error == 'description') return errorField.textContent = 'Oops, description should be between 50 and 3000 characters.';
	if (error.includes('invalid-email')) return errorField.textContent = 'Sorry, email is invalid.';
	if (error.includes('invalid-credential')) return errorField.textContent = 'Uh-oh! Invalid credentials.';
	if (error.includes('weak-password')) return errorField.textContent = ' Oops! Password should be at least 6 characters.';
	if (error.includes('email-already-in-use')) return errorField.textContent = 'Sorry, this email address is already in use.';
	if (error.includes('invalid-display-name')) return errorField.textContent = 'Oops, this username is invalid.';

	errorField.textContent = 'A wild error occurred! Try again.';
}

export function showErrorModal(error, needsConfirmation) {

	const modal = document.querySelector('dialog');
	const modalText = document.querySelector('#dialogError');
	const confirmBtn = document.querySelector('#dialogConfirmBtn');
	const closeBtn = document.querySelector('#dialogCloseBtn');

	modalText.textContent = error;
	modal.showModal();

	if (needsConfirmation) {
		confirmBtn.style.display = 'inline-block';
		closeBtn.addEventListener('click', (e) => modal.close());
	} else {
		confirmBtn.style.display = 'none';
		modal.addEventListener('click', (e) => modal.close());
	}
}