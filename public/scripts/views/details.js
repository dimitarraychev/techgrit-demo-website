import { deleteData, getData, updateData } from "../api/data.js";
import { showErrorModal } from "../util/errorHandler.js";

let context;

const detailsTemplate = (data, isOwner, isLikedByUser, likesNum) => context.html`
    <section id="details">
        <div class="details-info">
            <p class="details-category">${data.category.replace('-', ' ')}</p>
            <h1 class="details-title">${data.title}</h1>
            <div class="details-like">
                <div class="details-owner">
                    <p>${data.ownerName}</p>
                    ${isOwner ? context.html`
                        <a href="/edit${context.params.id}"><button class="interactable">Edit</button></a>
                        <button class="interactable" @click=${deletePost}>Delete</button>
                    ` : null}  
                </div>
                <div class="like">
                    <p>Likes: ${likesNum}</p>
                    ${!isOwner && !isLikedByUser ? context.html`
                        <i class="fa-regular fa-heart interactable" id="likeBtn" @click=${likePost}></i>
                    ` : null}
                </div>
                </div>
        </div>
        <img src=${data.image} onerror="this.src='./images/image-missing.jpg'" alt="Post Image" class="details-img">
        <p class="details-description">${data.description}</p>
    </section>
`;

let likes;

export async function detailsPage(ctx) {

    context = ctx;

    const postID = context.params.id;
    const data = await getData(context, postID);

    let likesNum;

    if (data.likes == '') {
        likes = '';
        likesNum = 0;
    } else {
        likes = data.likes.split(',');
        likesNum = likes.length;
    }

    let isLikedByUser = likes.includes(context.userID) ? true : false;
    let isOwner = data.ownerID == context.userID ? true : false;

    context.render(detailsTemplate(data, isOwner, isLikedByUser, likesNum), context.main);
}

async function likePost(e) {
    const postID = context.params.id;

    if (context.auth.currentUser == null) {
        return showErrorModal('Oops! Login required to proceed with this action. 🔒💻');
    }

    if (likes == '') {
        likes = context.userID;
    } else {
        likes.push(context.userID);
        likes = likes.join(',');
    }

    const data = await updateData(context, postID, { likes }, true );
    detailsPage(context);
}

async function deletePost(e) {
    const postID = context.params.id;

    const confirmBtn = document.querySelector('#dialogConfirmBtn');

	showErrorModal("Are You Sure You Want to Vanquish This Post? 🤖🗑️ Double-checking before we unleash the delete bots.", true);

	confirmBtn.addEventListener('click', confirmSubmit);

	async function confirmSubmit(e) {

		const modal = document.querySelector('dialog');

        await deleteData(context, postID);
		modal.close();
		
        context.redirect('/posts#all');
	}
}