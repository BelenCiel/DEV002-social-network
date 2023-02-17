/* eslint-disable import/no-cycle */
import { navigateRoutes } from '../main.js';
import { registerUser } from '../lib/configFirebase.js';
/* PAGINA PARA REGISTRARSE CON DATOS */
export const register = () => {
  const sectionRegister = document.createElement('section'); /* contenedor de todo lo que aparece en register */
  const divRegisterText = document.createElement('div'); /* texto del contenedor */
  const textSignIn = document.createElement('p');
  const divRegisterForm = document.createElement('div'); /* contenedor donde esta en formulario */
  const formRegister = document.createElement('form'); /* formulario */

  const secName = document.createElement('div');
  const labelName = document.createElement('label');
  const name = document.createElement('input');

  const secEmail = document.createElement('div');
  const labelEmail = document.createElement('label');
  const email = document.createElement('input');

  const secPassword = document.createElement('div');
  const labelPassword = document.createElement('label');
  const password = document.createElement('input');

  const btnRegistrarme = document.createElement('button');

  const btnbackHome = document.createElement('button');
  const root = document.getElementById('root');

  /* appen */
  root.append(btnbackHome);
  sectionRegister.appendChild(divRegisterText);
  divRegisterText.appendChild(textSignIn);
  sectionRegister.appendChild(divRegisterForm);
  divRegisterForm.appendChild(formRegister);
  formRegister.appendChild(secName);
  secName.appendChild(labelName);
  secName.appendChild(name);
  formRegister.appendChild(secEmail);
  secEmail.appendChild(labelEmail);
  secEmail.appendChild(email);
  formRegister.appendChild(secPassword);
  secPassword.appendChild(labelPassword);
  secPassword.appendChild(password);
  formRegister.appendChild(btnRegistrarme);

  /* atribute */
  sectionRegister.setAttribute('class', 'sectionRegister');
  divRegisterText.setAttribute('class', 'divRegisterText');
  textSignIn.textContent = 'Por favor, ingresa tus datos';

  divRegisterForm.setAttribute('class', 'divRegisterForm');
  formRegister.setAttribute('class', 'formRegister');
  formRegister.setAttribute('id', 'formRegister');

  labelName.textContent = 'Nombre y Apellido';
  labelEmail.textContent = 'Correo';
  labelPassword.textContent = 'Contraseña';
  btnbackHome.textContent = '';
  btnRegistrarme.textContent = 'Registrarme';

  btnbackHome.setAttribute('class', 'btnHome');
  btnbackHome.setAttribute('type', 'text');

  secName.setAttribute('class', 'section-input');
  name.setAttribute('class', 'input');
  name.setAttribute('type', 'text');
  name.setAttribute('required', '');

  secEmail.setAttribute('class', 'section-input');
  email.setAttribute('class', 'input');
  email.setAttribute('type', 'email');
  email.setAttribute('required', '');

  secPassword.setAttribute('class', 'section-input');
  password.setAttribute('class', 'input');
  password.setAttribute('type', 'password');
  password.setAttribute('required', '');

  btnRegistrarme.setAttribute('class', 'btnRegistrarme');
  btnRegistrarme.setAttribute('type', 'submit');

  textSignIn.setAttribute('class', 'p');
  labelName.setAttribute('class', 'textForm');
  labelEmail.setAttribute('class', 'textForm');
  labelPassword.setAttribute('class', 'textForm');

  /* function */
  /* btn de enviar formulario de registro */
  formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailUser = email.value;
    const passwordUser = password.value;
    registerUser(emailUser, passwordUser);
    navigateRoutes('/Login');
    console.log(emailUser);
  });

  btnbackHome.addEventListener('click', () => navigateRoutes('/')); /* pathname '/' */
  // btnRegistrarme.addEventListener('click', () => navigateRoutes('/wallApp'));
  return sectionRegister;
};
