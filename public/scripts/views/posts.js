import { getData } from "../api/data.js";

let context;

const postsTemplate = (data) => context.html`
    <section id="posts">
		<div class="posts-page-container">
		<div class="posts-nav">
			<ul class="posts-list">
				<a href="/posts#all"><li class="all interactable">All Posts</li></a>
				<a href="/posts#blockchain"><li class="blockchain interactable">Blockchain</li></a>
				<a href="/posts#development"><li class="development interactable">Development</li></a>
				<a href="/posts#artificial-intelligence"><li class="artificial-intelligence interactable">Artificial Intelligence</li></a>
				<a href="/posts#other"><li class="other interactable">Other</li></a>
			</ul>
			<a href="/create" id="createBtn" class="interactable">Create New Post</a>
		</div>
		<div class="posts-content">
			${data.map(el => context.html`
				<div class="post">
					<img src=${el[1].image} onerror="this.src='./images/image-missing.jpg'" alt="Post Image">
					<div class="post-content">
						<div class="post-title">${el[1].title}</div>
						<a class="read-more-btn interactable" href="/posts${el[0]}">Read More</a>
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
				<a href="/posts#all"><li class="all interactable">All Posts</li></a>
				<a href="/posts#blockchain"><li class="blockchain interactable">Blockchain</li></a>
				<a href="/posts#development"><li class="development interactable">Development</li></a>
				<a href="/posts#artificial-intelligence"><li class="artificial-intelligence interactable">Artificial Intelligence</li></a>
				<a href="/posts#other"><li class="other interactable">Other</li></a>
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

    const data = await getData(context);

	context.render(emptyTemplate(), context.main);

	if (data) {
		filterByCategory(data);
	}
}

function filterByCategory(data) {
	const categoriesList = ['all', 'blockchain', 'development', 'artificial-intelligence', 'other'];

	let category = context.state.path.replace('/posts#', '');
	if (!categoriesList.includes(category)) category = 'all';

	let filteredData;
	if (category == 'all') {
		filteredData = Object.entries(data);
	} else {
		filteredData = Object.entries(data).filter(el => el[1].category == category);
	}

	context.render(postsTemplate(filteredData), context.main);

	const allCategories = document.querySelectorAll('.posts-nav li');
	const selected = document.querySelector(`.${category}`);

	allCategories.forEach(el => el.style.boxShadow = '');
	selected.style.boxShadow = 'inset 0 0 5px rgba(0, 0, 0, 0.8)';
}