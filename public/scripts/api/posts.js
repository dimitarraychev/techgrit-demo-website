import { getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, collection, doc, where, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { appendErrorMessage, showErrorModal } from "../util/errorHandler.js";
import { firebase } from "../config/firebase.js";

const db = firebase().database;

export async function writePost(data) {

    try {
        const docRef = await addDoc(collection(db, 'posts'), data);

        return docRef.id;
    } catch (error) {
        appendErrorMessage(error.message);
    }
}

export async function getPosts(queryArr) {

    let myQuery = query(
        collection(db, 'posts'),
        orderBy('timestamp', 'desc')
    );

    if (queryArr.length > 1) {
        if (queryArr[0] === 'category') {
            myQuery = query(
                collection(db, 'posts'),
                where(queryArr[0], '==', queryArr[1]),
                orderBy('timestamp', 'desc')
            );
        } else if (queryArr[0] === 'search') {
            myQuery = query(
                collection(db, 'posts'),
                where('lowercaseTitle', 'array-contains-any', queryArr[1].split(' ')),
                orderBy('timestamp', 'desc')
            );
        }
    }

    try {
        const snapshot = await getDocs(myQuery);
        const result = [];

        snapshot.forEach(doc => {
            result.push({ id: doc.id, data: doc.data() })
        });

        return result;
    } catch (error) {
        showErrorModal(error.message);
    }
}

export async function getPostsByUserID(userID) {

    const myQuery = query(
        collection(db, 'posts'),
        where('ownerID', '==', userID),
        orderBy('timestamp', 'desc')
    );

    try {
        const snapshot = await getDocs(myQuery);
        const result = [];

        snapshot.forEach(doc => {
            result.push({ id: doc.id, data: doc.data() })
        });

        return result;
    } catch (error) {
        showErrorModal(error.message);
        console.log(error);
    }
}

export async function getOnePost(id) {

    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);

    const postCommentsRef = query(
        collection(postRef, "comments"),
        orderBy('timestamp', 'desc')
    );
    const commentsSnap = await getDocs(postCommentsRef);
    const comments = [];

    commentsSnap.forEach(doc => {
        comments.push({ id: doc.id, data: doc.data() })
    });

    if (postSnap.exists()) {
        return { post:postSnap.data(), comments };
    } else {
        showErrorModal('Oops, post was not found, sorry!');
    }
}

export async function updatePost(id, data, isLike) {

    const docRef = doc(db, 'posts', id);

    try {
        await updateDoc(docRef, data);
    } catch (error) {
        if (isLike) return showErrorModal(error.message);
        appendErrorMessage(error.message);
    }
}

export async function deletePost(id) {

    try {
        await deleteDoc(doc(db, 'posts', id));
    } catch (error) {
        showErrorModal(error.message);
    }
}