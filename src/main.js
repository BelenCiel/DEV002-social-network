/* eslint-disable import/no-cycle */
import { loginpage } from './components/login.js';
import { home } from './components/home.js';
import { register } from './components/register.js';
import { wallApp } from './components/wallApp.js';

const root = document.getElementById('root'); /* contenido de html */

const routes = {
  '/': home,
  '/Login': loginpage,
  '/Register': register,
  '/WallApp': wallApp,
};

export const navigateRoutes = (pathname) => {
  window.history.pushState(/* to load new HTML pages */
    {}, /* state -objeto de entrada del historial- */
    pathname, /* title */
    window.location.origin + pathname, /* url */
  );
  while (root.firstChild) { /* defino que routes no se repita al clickear btn */
    root.removeChild(root.firstChild);
  }
  root.appendChild(routes[pathname]());
};
console.log(window.location.pathname);
const component = routes[window.location.pathname]();/* variable que contiene el pathname */
// console.log(component);
root.appendChild(component); /* Me muestra routes y su contenido */

/* hola gina, aca estan los cambios */
