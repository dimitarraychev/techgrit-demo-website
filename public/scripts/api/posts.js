import { getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, collection, doc, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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

export async function getAllPosts(queryArr) {

    let myQuery = query(
        collection(db, 'posts'),
    );

    if (queryArr.length > 1) {
        myQuery = query(
            collection(db, 'posts'),
            where(queryArr[0], '==', queryArr[1])
        );
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

export async function searchPosts(searchString) {

    const searchQuery = searchString.toLowerCase().split(' ');

    const myQuery = query(
        collection(db, 'posts'),
        where('lowercaseTitle', 'array-contains-any', searchQuery)
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
    }
}

export async function getOnePost(id) {

    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
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