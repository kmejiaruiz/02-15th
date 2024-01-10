// Array de palabras a mostrar
const words = ["novia", "reina hermosa", "amor", "señora :3", "Stefany ♡"];

// Inicialización de variables
let index = 0;
let isDeleting = false;
let speed = 200; // Velocidad de escritura

function type() {
  const currentWord = words[index];

  if (isDeleting) {
    // Borrando caracteres
    document.getElementById('typed-text-h').textContent = currentWord.substring(0, document.getElementById('typed-text-h').textContent.length - 1);
  } else {
    // Escribiendo caracteres
    document.getElementById('typed-text-h').textContent = currentWord.substring(0, document.getElementById('typed-text-h').textContent.length + 1);
  }

  // Velocidad de escritura
  speed = isDeleting ? 150 : 150;

  if (!isDeleting && document.getElementById('typed-text-h').textContent === currentWord) {
    // Cambiar a borrar después de escribir una palabra
    isDeleting = true;
    speed = 1200; // Tiempo de espera antes de borrar
  } else if (isDeleting && document.getElementById('typed-text-h').textContent === '') {
    // Cambiar a escribir después de borrar toda la palabra
    isDeleting = false;
    index = (index + 1) % words.length; // Cambiar a la siguiente palabra
  }

  setTimeout(type, speed);
}

// Iniciar la función de escritura al cargar la página
document.addEventListener('DOMContentLoaded', type);