/* eslint-disable import/no-unresolved */
/* eslint-disable eol-last */
import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, doc, deleteDoc, updateDoc,
  arrayUnion, arrayRemove, getDoc, Timestamp, query, orderBy,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

const db = getFirestore();
/* se le entregan los parametros con los que se guardara el post */
export const savePost = (post, id, currentLike, userLike) => {
  const mPost = {
    /* timestamp captura la fecha para poder utilizarla */
    post, idUser: id, currentLike, userLike, date: Timestamp.fromDate(new Date()),
  };
  addDoc(collection(db, 'posteos'), mPost);
};
/* orden por fecha descendente con la coleccion de post */
export const orderPost = query(collection(db, 'posteos'), orderBy('date', 'desc'));

/* getPost obtiene los documentos(getDocs), con la base de datos de 'posteos' */
export const getPost = () => getDocs(collection(db, 'posteos'));

/* onGetpost actualiza la base de datos en tiempo real */
/* callback es un arg externo que se utiliza para completar una rutina */
export const onGetPost = (callback) => onSnapshot(orderPost, callback);

export const deletePost = (id) => deleteDoc(doc(db, 'posteos', id));

/* editpost tiene dos parametros, el id y el nuevo post */
export const editPost = (id, newPost) => updateDoc(doc(db, 'posteos', id), newPost);

export const getPostForId = (id) => getDoc(doc(db, 'posteos', id));
export const like = (id, likes, userLike) => updateDoc(doc(db, 'posteos', id), { currentLike: likes, userLike: arrayUnion(userLike) });
export const dislike = (id, likes, userLike) => updateDoc(doc(db, 'posteos', id), { currentLike: likes, userLike: arrayRemove(userLike) });

export { collection, db };
