import { getOnePost, deletePost, updatePost } from "../api/posts.js";
import { showErrorModal } from "../util/errorHandler.js";

let context;

const detailsTemplate = (data, isOwner, isLikedByUser, likesNum) => context.html`
    <section id="details">
        <div id="details-container">
            <div class="details-info">
                <p class="details-category">${data.category.replace('-', ' ')}</p>
                <h1 class="details-title">${data.title}</h1>
                <div class="details-like">
                    <div class="details-owner">
                        <p>${data.ownerName}</p>
                        ${isOwner ? context.html`
                            <a href="/posts/${context.params.id}/edit"><button class="interactable">Edit</button></a>
                            <button class="interactable" @click=${delPost}>Delete</button>
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
        </div>
    </section>
`;

export async function detailsPage(ctx) {

    context = ctx;

    const postID = context.params.id;
    const post = await getOnePost(postID);

    const isLikedByUser = post.likes.includes(context.userID) ? true : false;
    const isOwner = post.ownerID == context.userID ? true : false;

    context.render(detailsTemplate(post, isOwner, isLikedByUser, post.likes.length));
}

async function likePost(e) {

    if (!context.userID) {
        return showErrorModal('Oops! Login required to proceed with this action. 🔒💻');
    }

    e.target.remove();

    const postID = context.params.id;
    const post = await getOnePost(postID);

    post.likes.push(context.userID);

    await updatePost(postID, { likes: post.likes }, true);
    detailsPage(context);
}

async function delPost(e) {

    showErrorModal("Are You Sure You Want to Vanquish This Post? 🤖🗑️ Double-checking before we unleash the delete bots.", true);

    const confirmBtn = document.querySelector('#dialogConfirmBtn');
    confirmBtn.addEventListener('click', confirmSubmit);

    async function confirmSubmit(e) {

        const postID = context.params.id;
        await deletePost(postID);

        const modal = document.querySelector('dialog');
        modal.close();

        context.redirect('/posts');
    }
}