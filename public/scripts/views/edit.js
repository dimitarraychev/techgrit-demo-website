import { updateData, getData } from "../api/data.js";
import { appendErrorMessage, showErrorModal } from "../util/errorHandler.js";

let context;

const editTemplate = (data) => context.html`
    <section id="edit">
        <div class="post-form">
            <h2>Edit Post</h2>
            <form class="blog-form" @submit=${submitForm}>
				<input
					type="text"
					name="title"
					id="title"
					placeholder="Title"
                    .value = ${data.title}
					class="interactable"
				/>
				<select name="category" id="category" class="interactable" .value = ${data.category}>
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
                    .value = ${data.image}
					class="interactable"
				/>
				<textarea
					type="description"
					name="description"
					id="description"
					placeholder="Description"
                    .value = ${data.description}
					class="interactable"
				></textarea>
				<p class="error-msg"></p>
				<button type="submit" class="interactable">Edit</button>
            </form>
        </div>         
    </section>
`;

export async function editPage(ctx) {
	context = ctx;

	const postID = context.params.id;
	const data = await getData(context, postID);

	context.onAuthStateChanged(context.auth, (user) => {
		if (!user) {
			showErrorModal('Oops! Login required to proceed with this action. 🔒💻');
			return context.redirect('/posts#all');
		}
	});

	context.render(editTemplate(data), context.main);
}

function submitForm(e) {
	e.preventDefault();

	const postID = context.params.id;

	const formData = new FormData(e.target);
	const title = formData.get('title').trim();
	const category = formData.get('category');
	const image = formData.get('image').trim();
	const description = formData.get('description').trim();

	if (title == '' || image == '' ||
		category == null || description == '') return appendErrorMessage('empty');
	if (title.length < 5 || title.length > 100) return appendErrorMessage('title');
	if (description.length < 50 || description.length > 3000) return appendErrorMessage('description');

	showErrorModal("Mission accomplished! Are you ready to confirm your post and set the tech world abuzz? 'Affirmative!' 🤖🎉", true);

	const confirmBtn = document.querySelector('#dialogConfirmBtn');
	confirmBtn.addEventListener('click', confirmSubmit);

	async function confirmSubmit(ev) {

		const modal = document.querySelector('dialog');

		await updateData(context, postID, { title, category, image, description });
		modal.close();
		e.target.reset;

		context.redirect(`posts${postID}`);
	}
}
