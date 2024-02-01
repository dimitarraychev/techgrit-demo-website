import { writePost } from "../api/posts.js";
import { appendErrorMessage, showErrorModal } from "../util/errorHandler.js";

let context;

const createTemplate = () => context.html`
    <section id="create">
        <div class="post-form">
            <h2>Add New Post</h2>
            <form class="blog-form" @submit=${submitForm}>
				<input
					type="text"
					name="title"
					id="title"
					placeholder="Title"
					class="interactable"
				/>
				<select name="category" id="category" class="interactable">
					<option value="" disabled selected hidden>Select Category...</option>
  					<option value="development" class="interactable">Development</option>
  					<option value="blockchain" class="interactable">Blockchain</option>
  					<option value="artificial-intelligence" class="interactable">Artificial Intelligence</option>
  					<option value="other" class="interactable">Other</option>
				</select>
                <input
					type="url"
					name="image"
					id="image"
					placeholder="Image URL"
					class="interactable"
				/>
				<textarea
					type="description"
					name="description"
					id="description"
					placeholder="Description"
					class="interactable"
				></textarea>
				<p class="error-msg"></p>
				<button type="submit" class="interactable">Create</button>
            </form>
        </div>         
    </section>
`;

export function createPage(ctx) {
	context = ctx;
	
	if (!context.userID) {
		showErrorModal('Oops! Login required to proceed with this action. 🔒💻');
		return context.redirect('/posts');
	}

	context.render(createTemplate());
}

async function submitForm(e) {
	e.preventDefault();

	const formData = new FormData(e.target);
	const title = formData.get('title').trim();
	const category = formData.get('category');
	const image = formData.get('image').trim();
	const description = formData.get('description').trim();
	const ownerID = context.userID;
	const ownerName = context.displayName;
	const likes = [];

	if (title == '' || image == '' ||
		category == null || description == '') return appendErrorMessage('empty');
	if (title.length < 5 || title.length > 100) return appendErrorMessage('title');
	if (description.length < 50 || description.length > 3000) return appendErrorMessage('description');

	showErrorModal("Mission accomplished! Are you ready to confirm your post and set the tech world abuzz? 'Affirmative!' 🤖🎉", true);

	const confirmBtn = document.querySelector('#dialogConfirmBtn');
	confirmBtn.addEventListener('click', confirmSubmit);

	async function confirmSubmit(ev) {

		const postID = await writePost(title, category, image, description, ownerID, ownerName, likes);

		const modal = document.querySelector('dialog');
		modal.close();

		context.redirect(`/posts/${postID}`);
	}
}