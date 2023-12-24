import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import page from "https://unpkg.com/page@1.11.6/page.mjs";
import { html, render } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

const firebaseConfig = {
    apiKey: "AIzaSyD-bZvb5htlvodH5uz6D1iUyk_V6Pbt1C0",
    authDomain: "site-demo-auth-crud.firebaseapp.com",
    databaseURL: "https://site-demo-auth-crud-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "site-demo-auth-crud",
    storageBucket: "site-demo-auth-crud.appspot.com",
    messagingSenderId: "462470173849",
    appId: "1:462470173849:web:48d841c398d0c1fb4f9408"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/user.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { postsPage } from "./views/posts.js";
import { editPage } from "./views/edit.js";
import { showErrorModal } from "./util/errorHandler.js";
import { animateCircles, attachMouseTrailListeners } from "./util/mouse-trail.js";

attachMouseTrailListeners();
animateCircles();

document.getElementById('logoutBtn').addEventListener('click', initateLogout);

const main = document.querySelector('main');

const menu = document.querySelector('.menu-items');
document.addEventListener('click', showMenu);

page(middleware);
page(authentication);
page('/index.html', '/');
page('/', homePage);
page('/register', registerPage);
page('/login', loginPage);
page('/create', createPage);
page('/posts', postsPage);
page('/posts:id', detailsPage);
page('/edit:id', editPage);

page.start();

function showMenu(e) {

    const isClickOnMenu = e.target.classList.contains('open-menu') || e.target.classList.contains('.user-menu');

    if (isClickOnMenu && menu.style.display == 'none' || isClickOnMenu && menu.style.display == '') {
        menu.style.display = 'inline-block';
    } else {
        menu.style.display = 'none';
    }
}

function middleware(ctx, next) {
    ctx.main = main;
    ctx.html = html;
    ctx.render = render;
    ctx.redirect = page.redirect;
    ctx.auth = auth;
    ctx.onAuthStateChanged = onAuthStateChanged;
    ctx.database = database;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    next();
}

function authentication(ctx, next) {
    const welcomeMessage = document.querySelector('.username');
    const guestBtns = document.querySelectorAll('.guest');
    const userBtns = document.querySelectorAll('.user');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            welcomeMessage.textContent = `${auth.currentUser.displayName}`;
            userBtns.forEach(btn => btn.style.display = 'block');
            guestBtns.forEach(btn => btn.style.display = 'none');
            ctx.userID = user.uid;
        } else {
            welcomeMessage.textContent = 'Guest';
            userBtns.forEach(btn => btn.style.display = 'none');
            guestBtns.forEach(btn => btn.style.display = 'block');
        }
    });

    next();
}

function initateLogout(e) {
	const modal = document.querySelector('dialog');
	const confirmBtn = document.querySelector('#dialogConfirmBtn');

    showErrorModal('Logout initiated! Are you prepared for the real world? 🌐', true);

	confirmBtn.addEventListener('click', (e) => { 
        logout(auth, page.redirect);
        modal.close();
    });
}