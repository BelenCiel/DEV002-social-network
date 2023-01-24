/* eslint-disable import/no-cycle */
import { navigateRoutes } from '../main.js';
/* HOME DE INICIO DE SESION DE LA APP */
export const home = () => {
  const divHome = document.createElement('div'); /* div que contiene el bloque de home */

  const btnRegister = document.createElement('button'); /* boton de registro */
  const btnLogin = document.createElement('button'); /* inicia sesion - continue with google */

  btnRegister.textContent = 'Registrate';
  btnLogin.textContent = 'Inicia Sesión';

  divHome.setAttribute('class', 'divHome');
  btnLogin.setAttribute('class', 'btnLogin');
  btnRegister.setAttribute('class', 'btnRegister');

  btnRegister.addEventListener('click', () => navigateRoutes('/Register')); /* evento click para ejecutar funcion navigate. -param:pathname- */
  btnLogin.addEventListener('click', () => navigateRoutes('/Login'));

  divHome.appendChild(btnRegister);
  divHome.appendChild(btnLogin);

  return divHome;
};
