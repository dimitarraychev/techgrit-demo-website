let context;

const homeTemplate = () => context.html`
        <section id="home">
            <div class="home-msg">
                <h1>Freshest tech buzz, <br> straight from the community.</h1>
                <p>Where you can fuel the tech news revolution! <br>
                    Join us as we dish out the latest updates in the digital universe. <br> 
                    💻🚀 #TechGritAdventures
                </p>
            </div>
            <div class="home-img-container"><img src="./images/development.jpg" alt="Development" class="home-img"></div>
            <div class="home-info">
                <h1>Development</h1>
                <p>From unraveling the mysteries of the latest frameworks to sharing war stories from the debugging battlefield, 
                    our Development category is your portal to a world where syntax is the script and developers are the heroes. 
                </p>
                <a href="/posts?category=development"><button class="home-btn interactable">View More</button></a>
            </div>
            <div class="home-info">
                <h1>Blockchain</h1>
                <p>Whether it's exploring the latest crypto trends, sharing mind-boggling NFT discoveries, 
                    or decoding the secrets of blockchain gaming, our Blockchain category is 
                    your VIP pass to the most thrilling and cutting-edge discussions in the digital realm.
                </p>
                <a href="/posts?category=blockchain"><button class="home-btn interactable">View More</button></a>
            </div>
            <div class="home-img-container"><img src="./images/blockchain.jpg" alt="Blockchain" class="home-img"></div>
            <div class="home-img-container"><img src="./images/ai.jpg" alt="Artificial Intelligence" class="home-img"></div>
            <div class="home-info">
                <h1>Artificial Intelligence</h1>
                <p>Delving into the mysteries of deep learning, sharing awe-inspiring AI applications, 
                    or deciphering the poetry of machine-generated art, our Artificial Intelligence category 
                    is on an expedition to fathom the depths of artificial intelligence.</p>
                <a href="/posts?category=artificial-intelligence"><button class="home-btn interactable">View More</button></a>
            </div>
        </section>
`;

export function homePage(ctx) {
    context = ctx;
    context.render(homeTemplate());
}