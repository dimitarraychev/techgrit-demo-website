const consentTemp = (ctx) => ctx.html`
    <div id="cookie-popup" style="display: flex;">
        <p id="cookie-msg">This website uses cookies to ensure you get the best experience.
            By using our website, you agree to our use of cookies. 🍪</p>
        <button id="cookie-accept" @click=${consent}>Got it!</button>
    </div>
`;

const footer = document.querySelector('footer');

export function cookiesConsent(ctx, next) {

    if (!sessionStorage.getItem('cookiesConsent')) {

        ctx.render(consentTemp(ctx), footer);

        const popup = document.getElementById('cookie-popup');
        popup.style.display = 'flex';
    }

    next();
}

function consent(e) {
    sessionStorage.setItem('cookiesConsent', true);
    e.target.parentNode.style.display = 'none';
}