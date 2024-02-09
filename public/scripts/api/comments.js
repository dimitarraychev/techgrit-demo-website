import { addDoc, deleteDoc, collection, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { showErrorModal } from "../util/errorHandler.js";
import { db } from "../config/firebase.js";

export async function writeComment(commentObj, postID) {

    try {
        const postRef = doc(db, "posts", postID);
        const postCommentsRef = collection(postRef, "comments");
        const commentRef = await addDoc(postCommentsRef, commentObj);

        return commentRef;
    } catch (error) {
        showErrorModal(error.message);
    }
}

export async function deleteComment(commentID, postID) {

    try {
        const postRef = doc(db, "posts", postID);
        const commentDocRef = doc(collection(postRef, "comments"), commentID);

        await deleteDoc(commentDocRef, commentID);
    } catch (error) {
        showErrorModal(error.message);
    }
}