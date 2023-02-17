/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* aca va el muro de la app, se desplega el menu y cierre de sesion */
// y contiene la opcion de publicar*/
import { navigateRoutes } from '../main.js';
// eslint-disable-next-line object-curly-newline
import { logout, auth } from '../lib/configFirebase.js';
import {
  savePost, onGetPost, deletePost, editPost, getPostForId, like, dislike,
} from '../lib/Firestore.js';

export const wallApp = () => {
  const root = document.getElementById('root');
  root.className = 'root';
  const divButtonLogout = document.createElement('div');
  divButtonLogout.className = 'div-logout';
  const btnLogout = document.createElement('button');
  btnLogout.className = 'btn-logout';

  const home = document.createElement('div');
  home.className = 'div-home';
  /* aqui deberia aparecer el nombre de quien ingreso */
  const welcome = document.createElement('nav');
  welcome.className = 'welcome-text';

  /* titulo de la app */
  const titleApp = document.createElement('header');
  titleApp.className = 'title-app';
  titleApp.textContent = '¡Crea espacios, comparte ideas, cuenta tus experiencias!';

  /* formulario */
  const form = document.createElement('form');
  form.className = 'post-form';
  form.setAttribute('type', 'submit');
  form.id = 'post-form';

  /* post */
  const post = document.createElement('textarea');
  post.className = 'post';
  post.id = 'post';
  post.placeholder = '¿Qué quieres compartir hoy?';

  /* boton de guardar */
  const btnSave = document.createElement('button');
  btnSave.className = 'btnSave';
  btnSave.id = 'btn-save';
  btnSave.textContent = 'Publicar';

  /* sección que contiene post */
  const postContainer = document.createElement('section');
  postContainer.className = 'postContainer';
  postContainer.id = 'post-container';

  post.rows = '3';

  // btnLogout.textContent = 'Log out';

  /* append */
  root.appendChild(divButtonLogout);
  divButtonLogout.append(btnLogout);
  home.appendChild(welcome);
  home.appendChild(titleApp);
  home.appendChild(form);
  form.appendChild(post);
  form.appendChild(btnSave);
  home.appendChild(postContainer);

  const user = auth.currentUser; /* usuario actual en la app */
  if (user === null) {
    return navigateRoutes('/Login');
  }
  const uid = user.uid; /* id del usuario, su id le permite acciones personales en la app */

  onGetPost((querySnapshot) => { // Funcion me muestra la coleccion posteos de firestore */
    let html = '';

    querySnapshot.forEach((doc) => {
      const postWall = doc.data(); /* postWall contiene los posteos */
      // console.log(doc.id);
      if (uid === postWall.idUser) { /* si el id del usuario, es igual al id del post.. */
        html += `
    <div class = 'div-post'> 
      <p class= 'post-cont'>${postWall.post}</p>
      <div class = 'div-buttons-post'>
      <button class= 'btn-like' data-id='${doc.id}'> ${postWall.currentLike}</button>
      <button class= 'btn-edit' data-id= '${doc.id}'> </button>
      <button class='btn-delete ${postWall.idUser}' data-id='${doc.id}'></button>
      </div>
    </div> `;
      } else { /* si el id del usuario no es igual, me muestra solo esto: */
        // console.log(doc.data());
        html += `
      <div class = 'div-post'> 
        <p class= 'post-cont'>${postWall.post}</p>
        <button class= 'btn-like' data-id='${doc.id}'>${postWall.currentLike}</button>
      </div> `;
      }
    });
    postContainer.innerHTML = html; /* imprime todo en la pagina */

    const likeBtn = postContainer.querySelectorAll('.btn-like');
    likeBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const likeButtonId = e.target.dataset.id; /* contiene el id del post */
        const userLikeButton = uid; /* contiene el id del usuario */
        getPostForId(likeButtonId)
          .then((document) => {
            const post = document.data(); /* contiene toda la info del post */
            /* operador logico ! devuelve lo contrario */
            if (!post.userLike.includes(userLikeButton)) {
              const likes = post.currentLike + 1;
              /* se ejecuta la funcion de dar like */
              like(likeButtonId, likes, userLikeButton);
            } else {
              const likes = post.currentLike - 1;
              /* se ejecuta dislike, solo se permite un like por id */
              dislike(likeButtonId, likes, userLikeButton);
            }
          });
      });
    });

    const editBtn = postContainer.querySelectorAll('.btn-edit');
    editBtn.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        // const doc = await editPost(e.target.id);
        // console.log(doc.id);
        // form[post].value = postWall.post; //aca deberia ir el .value de cada post
        // console.log(dataset.id);
        const editpost = prompt('Edita tu comentario');
        editPost(e.target.dataset.id, { post: editpost });
      });
    });
    const deleteBtn = postContainer.querySelectorAll('.btn-delete');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        /* target es un objeto, y de el extraigo el objeto dataset */
        const question = window.confirm('¿Estas seguro de que quieres eliminar este comentario?');
        if (question === true) {
          window.alert('Ok, si estas seguro');
        } else {
          window.location(); /* aca deberia ir navigateRoutes(?) */
        }
        /* para ejecutar la funcion de eliminar el post que contenga el id del boton cliqueado */
        deletePost(dataset.id);
        // console.log(dataset.id);
      });
    });
  });

  /* boton de cierre de sesión */
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    logout(auth) /* promesa */
      .then(() => {
        // Sign-out successful.
        // eslint-disable-next-line no-alert
        const question = window.confirm('¿Estas seguro de que quieres cerrar sesion?');
        if (question === true) {
          window.alert('¡Adios, vuelve pronto!');
        } else {
          window.location(); /* aca deberia ir navigateRoutes(?) */
        }
        // console.log('Sign-out successful');
        navigateRoutes('/');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    /* el formulario ejecuta la funcion save post con los parametros que le di */
    /* el contenido del post, el id del usuario, los likes iniciados en 0 */
    /* y un array donde se almacenaran los likes */
    savePost(post.value, uid, 0, []);
    form.reset();

    // console.log(postSave.value);
  });
  return home;
};
// <buttom class='btn-edit' data-id='${doc.id}></button>
