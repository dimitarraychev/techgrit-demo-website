const notFoundTemplate = (ctx) => ctx.html`
        <section id="fourohfour">
            <div id="fourohfourContainer">
                <h1 id="fourohfourNum">404</h1>
                <img src="/images/pagenotfound.png" alt="404" id="notFound">
            </div>
            <p id="fourohfourMessage">Sorry, Page Not Found!</p>
        </section>
`;

export function notFoundPage(ctx) {
    ctx.render(notFoundTemplate(ctx));
}