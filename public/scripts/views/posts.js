import { getAllPosts } from "../api/posts.js";

let context;

const postsTemplate = (data) => context.html`
    <section id="posts">
		<div class="posts-page-container">
		<div class="posts-nav">
			<ul class="posts-list">
				<a href="/posts"><li class="all interactable">All Posts</li></a>
				<a href="/posts?category=blockchain"><li class="blockchain interactable">Blockchain</li></a>
				<a href="/posts?category=development"><li class="development interactable">Development</li></a>
				<a href="/posts?category=artificial-intelligence"><li class="artificial-intelligence interactable">Artificial Intelligence</li></a>
				<a href="/posts?category=other"><li class="other interactable">Other</li></a>
			</ul>
			<a href="/create" id="createBtn" class="interactable">Create New Post</a>
		</div>
		<div class="posts-content">
			${data.map(el => context.html`
				<div class="post">
					<img src=${el.data.image} onerror="this.src='./images/image-missing.jpg'" alt="Post Image">
					<div class="post-content">
						<div class="post-title">${el.data.title}</div>
						<a class="read-more-btn interactable" href="/posts/${el.id}">Read More</a>
					</div>
				</div> 
			`)}
		</div>
		</div>
    </section>
`;

const emptyTemplate = () => context.html`
    <section id="posts">
	<div class="posts-nav">
			<ul class="posts-list">
				<a href="/posts"><li class="all interactable">All Posts</li></a>
				<a href="/posts?category=blockchain"><li class="blockchain interactable">Blockchain</li></a>
				<a href="/posts?category=development"><li class="development interactable">Development</li></a>
				<a href="/posts?category=artificial-intelligence"><li class="artificial-intelligence interactable">Artificial Intelligence</li></a>
				<a href="/posts?category=other"><li class="other interactable">Other</li></a>
			</ul>
			<a href="/create" id="createBtn" class="interactable">Create New Post</a>
		</div>
		<div class="posts-content">
			<h1 class='no-posts'>No posts yet. Be the first to share the news!</h1>
		</div>
    </section>
`;

export async function postsPage(ctx) {
	context = ctx;

	context.render(emptyTemplate());

	const query = ctx.querystring.split('=');
	const data = await getAllPosts(query);

	if (data && data.length > 0) {
		context.render(postsTemplate(data));
	}

	if (query.length > 1) {
		document.querySelector(`.${query[1]}`).style.boxShadow = 'inset 0 0 5px rgba(0, 0, 0, 0.8)';
		return;
	}

	document.querySelector('.all').style.boxShadow = 'inset 0 0 5px rgba(0, 0, 0, 0.8)';
}
