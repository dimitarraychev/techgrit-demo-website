import { deleteComment, writeComment } from "../api/comments.js";
import { getOnePost, deletePost, updatePost } from "../api/posts.js";
import { showErrorModal } from "../util/errorHandler.js";
import badWords from 'https://cdn.jsdelivr.net/npm/bad-words@3.0.4/+esm';

const filter = new badWords();

let context;

const detailsTemplate = (data, isOwner, isLikedByUser, likesNum, comments) => context.html`
    <section id="details">
        <div id="details-container">
            <div class="details-info">
                <div class="details-category-time">
                    <p class="details-category">${data.category.replace('-', ' ')}</p>
                    <p class="post-time">${new Date(data.timestamp).toString().split('(')[0]}</p>
                </div>
                <h1 class="details-title">${data.title}</h1>
                <div class="details-like">
                    <div class="details-owner">
                        <p class="owner-name">${data.ownerName}</p>
                        ${isOwner ? context.html`
                            <a href="/posts/${context.params.id}/edit"><button class="interactable">Edit</button></a>
                            <button class="interactable" @click=${delPost}>Delete</button>
                        ` : null}  
                    </div>
                    <div class="like">
                        <p>Likes: ${likesNum}</p>
                        ${isLikedByUser ? context.html`<i id="liked" class="fa-solid fa-heart"></i>` : null}
                        ${!isOwner && !isLikedByUser ? context.html`
                            <i class="fa-regular fa-heart interactable" id="likeBtn" @click=${likePost}></i>
                        ` : null}
                    </div>
                    </div>
            </div>
            <img src=${data.image} onerror="this.src='./images/image-missing.jpg'" alt="Post Image" class="details-img">
            <p class="details-description">${data.description}</p>
        </div>
        <div id="comments-container">
            ${comments.length > 0 ? comments.map(c => context.html`
            <div class="comment">
                <div class="comment-username-container">
                    <div class="comment-username-left">
                        <i class="fa-regular fa-user"></i>
                        <p class="comment-username">${c.data.username}</p>
                    </div>
                    <div class="comment-username-right">
                        <p class="comment-time">${new Date(c.data.timestamp).toString().split('(')[0]}</p>
                        ${context.userID == c.data.userID ? context.html`
                        <button class="delete-comment-btn interactable" id="${c.id}" @click=${delComment}>Delete</button>
                        ` : null}
                    </div>
                </div>
                <p class="comment-text">${c.data.comment}</p>
            </div>
            `) : context.html`<p id="noComments">No comments yet. Be the first!</p>`}
            <div id="add-comment" class="comment">
                <div class="comment-username-container">
                    <div class="comment-username-left">
                        <i class="fa-regular fa-user"></i>
                        <p class="comment-username">${context.displayName || 'Guest'}</p>
                    </div>
                </div>
                <textarea type="comment" name="comment" class="add-comment-text" placeholder="Add a comment..." class="interactable"></textarea>
                <button type="submit" class="add-comment-btn interactable" @click=${addComment}>Comment</button>
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx) {

    context = ctx;

    const postID = context.params.id;
    const { post, comments } = await getOnePost(postID);

    const isLikedByUser = post.likes.includes(context.userID) ? true : false;
    const isOwner = post.ownerID == context.userID ? true : false;

    context.render(detailsTemplate(post, isOwner, isLikedByUser, post.likes.length, comments));
}

async function likePost(e) {

    if (!context.userID) {
        return showErrorModal('Oops! Login required to proceed with this action. 🔒💻');
    }

    e.target.remove();

    const postID = context.params.id;
    const { post, comments } = await getOnePost(postID);

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
        confirmBtn.removeEventListener('click', confirmSubmit);
    }
}

async function addComment(e) {

    if (!context.userID) {
        return showErrorModal('Oops! Login required to proceed with this action. 🔒💻');
    }

    const commentRef = e.target.parentNode.children[1];
    const postID = context.params.id;

    const username = context.displayName;
    const userID = context.userID;
    let comment = commentRef.value.trim();
    const timestamp = new Date().toISOString();

    if (comment == '' ) return;
    if (comment.length < 5 || comment.length > 300) return showErrorModal('Sorry, comment should be between 5 and 300 charaters!');

    comment = filter.clean(comment);

    await writeComment({ username, userID, comment, timestamp }, postID);
    
    commentRef.value = '';
    context.redirect(`/posts/${postID}`);
}

async function delComment(e) {
    const commentID = e.target.id;
    const postID = context.params.id;

    showErrorModal("Are You Sure You Want to Delete This Comment? 🗑️ Please confirm.", true);

    const confirmBtn = document.querySelector('#dialogConfirmBtn');
    confirmBtn.addEventListener('click', confirmSubmit);

    async function confirmSubmit(e) {

        await deleteComment(commentID, postID);

        const modal = document.querySelector('dialog');
        modal.close();

        context.redirect(`/posts/${postID}`);
        confirmBtn.removeEventListener('click', confirmSubmit);
    }
}