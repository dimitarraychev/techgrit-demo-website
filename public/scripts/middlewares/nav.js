import { logout } from "../api/users.js";
import { showErrorModal } from "../util/errorHandler.js";

let context;

const navTemplate = () => context.html`
    <nav>
        <div class="logo-container">
            <a href="/"><i class="fa-solid fa-microchip interactable"></i></a>
            <a href="/" class="logo interactable">TechGrit</a>
        </div>
        <div class="user-menu">
			<a href="/posts/create" id="createBtn" class="interactable">Create</a>
            <a href="/posts" id="postsBtn" class="interactable">Posts</a>
            <p class="username open-menu interactable">${context.displayName || 'Guest'}</p>
            <i class="fa-solid fa-user-astronaut open-menu interactable"></i>
        </div>
    </nav>
    <div class="menu-items">
        ${!context.userID ? context.html`
        <a href="/login" class="guest interactable" id="loginBtn">Login</a>
        <a href="/register" class="guest interactable" id="registerBtn">Register</a>
        ` : context.html`
        <a href="/myposts" class="user interactable" id="myPostsBtn">My Posts</a>
        <a href="javascript:void(0)" class="user interactable" id="logoutBtn" @click=${logoutUser}>Logout</a>
        `}
    </div>
`;

export function nav(ctx, next) {

    context = ctx;

    const header = document.querySelector('header');
    context.render(navTemplate(), header)

    next();
}

function logoutUser(e) {
    showErrorModal('Logout initiated! Are you prepared for the real world? 🌐', true);

    const confirmBtn = document.querySelector('#dialogConfirmBtn');
    confirmBtn.addEventListener('click', confirmation);

    async function confirmation(e) {

        try {
            await logout();
            document.querySelector('dialog').close();
            context.redirect('/');
            confirmBtn.removeEventListener('click', confirmation);
        } catch (error) {
            showErrorModal('A wild error occured! 🏞️')
        }
    }
}
