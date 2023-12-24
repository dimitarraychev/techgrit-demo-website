import { ref, push, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { appendErrorMessage, showErrorModal } from "../util/errorHandler.js";

let context;

export async function writeData(ctx, title, category, image, description, ownerID, ownerName, likes) {

    context = ctx;

	try {
		const data = await push(ref(context.database, 'posts/'), {
            title,
            category,
            image,
            description,
            ownerID,
            ownerName,
            likes
        });
        
        return data._path.pieces_[1];
	} catch (error) {
		appendErrorMessage(error.message);
	}
}

export async function getData(ctx, path = '') {

    context = ctx;

    const dbRef = ref(context.database);

    try {
        const snapshot = await get(child(dbRef, 'posts/' + path));

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        showErrorModal(error.message);
    }
}

export async function updateData(ctx, path, data, isLike) {

    context = ctx;

    try {
		const response = await update(ref(context.database, 'posts/' + path), data);
	} catch (error) {
        if (isLike) return showErrorModal(error.message);
		appendErrorMessage(error.message);
	}
}

export async function deleteData(ctx, path) {

    context = ctx;

    try {
		const response = await remove(ref(context.database, 'posts/' + path));
	} catch (error) {
        showErrorModal(error.message);
	}
}