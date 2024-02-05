import { getAllPosts, searchPosts } from "../api/posts.js";

let context;

const postsTemplate = (data, searchString) => context.html`
    <section id="posts">
		<div class="posts-page-container">
		<div class="posts-nav">
			<div id="search-container">
				<input
					type="search"
					name="search"
					id="searchfield"
					placeholder="Search..."
					class="interactable"
					@keyup=${search}
					value=${searchString}
				/>
				<i class="fa-solid fa-magnifying-glass interactable" @click=${search}></i>
			</div>	
			<ul class="posts-list">
				<a href="/posts" class="all interactable">All Posts</a>
				<a href="/posts?category=blockchain" class="blockchain interactable">Blockchain</a>
				<a href="/posts?category=development" class="development interactable">Development</a>
				<a href="/posts?category=artificial-intelligence" class="artificial-intelligence interactable">Artificial Intelligence</a>
				<a href="/posts?category=other" class="other interactable">Other</a>
			</ul>
			<a href="/posts/create" id="createBtn" class="interactable">Create New Post</a>
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

const emptyTemplate = (isEmpty, isLoading, isNoResult, searchString) => context.html`
    <section id="posts">
	<div class="posts-nav">
		<div id="search-container">
			<input
				type="search"
				name="search"
				id="searchfield"
				placeholder="Search..."
				class="interactable"
				@keyup=${search}
				value=${searchString}
			/>
			<i class="fa-solid fa-magnifying-glass interactable" @click=${search}></i>
		</div>	
	<ul class="posts-list">
				<a href="/posts" class="all interactable">All Posts</a>
				<a href="/posts?category=blockchain" class="blockchain interactable">Blockchain</a>
				<a href="/posts?category=development" class="development interactable">Development</a>
				<a href="/posts?category=artificial-intelligence" class="artificial-intelligence interactable">Artificial Intelligence</a>
				<a href="/posts?category=other" class="other interactable">Other</a>
			</ul>
			<a href="/posts/create" id="createBtn" class="interactable">Create New Post</a>
		</div>
		<div class="posts-content">
			${isEmpty? context.html`<h1 class='no-posts'>No posts yet. Be the first to share the news!</h1>` : null}
			${isLoading? context.html`<h1 class='no-posts'>Loading...</h1>` : null}
			${isNoResult? context.html`<h1 class='no-posts'>Sorry, no match found.</h1>` : null}
		</div>
    </section>
`;

export async function postsPage(ctx) {
	context = ctx;

	context.render(emptyTemplate(false, true, false));

	const query = ctx.querystring.split('=');
	const data = await getAllPosts(query);

	if (!data || data.length == 0) {
		return context.render(emptyTemplate(true, false, false));
	}

	context.render(postsTemplate(data));

	if (query.length > 1) {
		document.querySelector(`.${query[1]}`).style.boxShadow = 'inset 0 0 5px rgba(0, 0, 0, 0.8)';
		return;
	}

	document.querySelector('.all').style.boxShadow = 'inset 0 0 5px rgba(0, 0, 0, 0.8)';
}

async function search(e) {

	if (e.key && e.key != 'Enter') return;

	const inputFieldRef = document.getElementById('searchfield');
	const searchString = inputFieldRef.value;

	if (searchString.trim() == '') return inputFieldRef.value = '';

	const posts = await searchPosts(searchString);

	if (posts.length < 1) return context.render(emptyTemplate(false, false, true, searchString));

	context.render(postsTemplate(posts, searchString));
}
