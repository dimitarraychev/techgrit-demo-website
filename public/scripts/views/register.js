import { register } from "../api/users.js";
import { appendErrorMessage } from "../util/errorHandler.js";

let context;

const registerTemplate = () => context.html`
	<section id="register">          
        <div class="user-form">
            <h2>Register</h2>
            <form class="register-form" @submit=${submitForm}>
			<input
					type="text"
					name="username"
					id="register-username"
					placeholder="Username"
					class="interactable"
				/>
				<input
					type="text"
					name="email"
					id="register-email"
					placeholder="Email"
					class="interactable"
				/>
				<input
					type="password"
					name="password"
					id="register-password"
					placeholder="Password"
					class="interactable"
				/>
				<input
					type="password"
					name="re-password"
					id="repeat-password"
					placeholder="Repeat password"
					class="interactable"
				/>
				<p class="error-msg"></p>
				<button type="submit" class="interactable">Register</button>
            </form>
            <p class="message">Already registered? <a href="/login" class="interactable">Login</a></p>
        </div>         
    </section>
`;

export function registerPage(ctx) {
	context = ctx;
	context.render(registerTemplate());
}

async function submitForm(e) {
	e.preventDefault();

	const formData = new FormData(e.target);
	const username = formData.get('username');
	const email = formData.get('email').trim();
	const password = formData.get('password').trim();
	const rePass = formData.get('re-password').trim();

	if (email == '' || password == '') return appendErrorMessage('empty');
	if (username.length < 3 || username.length > 20) return appendErrorMessage('length');
	if (rePass != password) return appendErrorMessage('match');

	await register(username, email, password);
	context.redirect('/posts');
}