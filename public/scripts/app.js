import page from "https://cdn.jsdelivr.net/npm/page@1.11.6/+esm";

import { middleware } from "./middlewares/middleware.js"
import { authentication } from "./middlewares/auth.js"
import { attachMouseTrailListeners } from "./util/mouse-trail.js";
import { showUserMenu } from "./util/ui.js";

import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/users.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { postsPage } from "./views/posts.js";
import { editPage } from "./views/edit.js";
import { notFoundPage } from "./views/404.js";

page(middleware);
page(authentication);
page('/index.html', '/');
page('/', homePage);
page('/register', registerPage);
page('/login', loginPage);
page('/posts', postsPage);
page('/posts/create', createPage);
page('/posts/:id', detailsPage);
page('/posts/:id/edit', editPage);
page('*', notFoundPage);

page.start();

attachMouseTrailListeners();

document.getElementById('logoutBtn').addEventListener('click', (e) => logout(page.redirect));

document.addEventListener('click', showUserMenu);