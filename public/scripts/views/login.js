import { login } from "../api/users.js";
import { appendErrorMessage } from "../util/errorHandler.js";

let context;

const loginTemplate = () => context.html`
    <section id="login">
        <div class="user-form">
            <h2>Login</h2>
            <form class="login-form" @submit=${submitForm}>
                <input type="text" name="email" id="email" placeholder="Email" class="interactable" />
                <input type="password" name="password" id="password" placeholder="Password" class="interactable" />
                <p class="error-msg"></p>
                <button type="submit" class="interactable">Login</button>
            </form>
            <p class="message">
                Not registered? <a href="/register" class="interactable">Create an account</a>
            </p>
        </div>
    </section>
`;

export function loginPage(ctx) {
    context = ctx;
    context.render(loginTemplate());
}

function submitForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
	const email = formData.get('email').trim();
	const password = formData.get('password').trim();
	
	if (email == '' || password == '') return appendErrorMessage('empty');

    login(email, password);
	context.redirect('/posts');
}