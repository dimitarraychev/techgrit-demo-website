import { getPostsByUserID } from "../api/posts.js";

let context;

const postsTemplate = (data) => context.html`
    <section id="posts">
	<div class="posts-page-container">
		<div class="my-posts-content">
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

const emptyTemplate = (isEmpty, isLoading) => context.html`
    <section id="posts">
    <div class="posts-page-container">
		<div class="my-posts-content">
			${isEmpty? context.html`<h1 class='no-posts'>No posts yet. Be the first to share the news!</h1>` : null}
			${isLoading? context.html`<h1 class='no-posts'>Loading...</h1>` : null}
		</div>
    </div>
    </section>
`;

export async function myPostsPage(ctx) {
	context = ctx;

	context.render(emptyTemplate(false, true));

    const userID = context.userID;
	const posts = await getPostsByUserID(userID);

	if (!posts || posts.length == 0) {
		return context.render(emptyTemplate(true, false));
	}

	context.render(postsTemplate(posts));
}
