import { html, render } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import page from "https://cdn.jsdelivr.net/npm/page@1.11.6/+esm";

const main = document.querySelector('main');

export function middleware(ctx, next) {
    
    ctx.html = html;
    ctx.render = renderer;
    ctx.redirect = page.redirect;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    next();
}

function renderer(view) {
    render(view, main);
}