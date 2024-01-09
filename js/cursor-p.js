// Array de palabras a mostrar
const word = ["mi luz", "mi alegria", "mi amor eterno", "mi futura esposa", "mi princesa"];

// Inicialización de variables
let start = 0;
let isDelete = false;
let time = 170; // Velocidad de escritura

function typed() {
  const currentWord = word[start];

  if (isDelete) {
    // Borrando caracteres
    document.getElementById("typed-text").textContent = currentWord.substring(
      0,
      document.getElementById("typed-text").textContent.length - 1
    );
  } else {
    // Escribiendo caracteres
    document.getElementById("typed-text").textContent = currentWord.substring(
      0,
      document.getElementById("typed-text").textContent.length + 1
    );
  }

  // Velocidad de escritura
  time = isDelete ? 150 : 150;

  if (
    !isDelete &&
    document.getElementById("typed-text").textContent === currentWord
  ) {
    // Cambiar a borrar después de escribir una palabra
    isDelete = true;
    time = 1200; // Tiempo de espera antes de borrar
  } else if (
    isDelete &&
    document.getElementById("typed-text").textContent === ""
  ) {
    // Cambiar a escribir después de borrar toda la palabra
    isDelete = false;
    start = (start + 1) % word.length; // Cambiar a la siguiente palabra
  }

  setTimeout(typed, time);
}

// Iniciar la función de escritura al cargar la página
document.addEventListener("DOMContentLoaded", typed);
