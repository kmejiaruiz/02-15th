"use strict";
const audio = document.getElementById("audio");
const audioSource = document.getElementById("audioSource");
const playlist = document.getElementById("playlist");
const songInfoContainer = document.getElementById("song-info");
const spinner = document.getElementById("spinner");
const nowPlayingContainer = document.getElementById("nowPlayingContainer");
let currentTrackIndex = 0; // Para realizar un seguimiento de la canción actual

const songs = [
  {
    title: "The Lady in Red",
    artist: "Chris De Burgh",
    source: "./musica/Chris De Burgh - The Lady In Red.mp3",
    cover:
      "https://s.mxmcdn.net/images-storage/albums/1/9/5/9/9/3/11399591_350_350.jpg",
  },
  {
    title: "Can't Help Falling In Love",
    artist: "Elvis Presley",
    source: "./musica/Elvis Presley - Can't Help Falling In Love.mp3",
    cover:
      "https://s.mxmcdn.net/images-storage/albums/4/1/1/7/5/0/12057114_350_350.jpg",
  },
  {
    title: "All of Me (Extended)",
    artist: "John Legend",
    source: "./musica/John Legend - All of Me.mp3",
    cover:
      "https://s.mxmcdn.net/images-storage/albums/0/2/6/6/2/1/32126620_350_350.jpg",
  },
  {
    title: "Cuando vayas conmigo",
    artist: "José José",
    source: "./musica/José José - Cuando Vayas Conmigo.mp3",
    cover:
      "https://s.mxmcdn.net/images-storage/albums/0/2/7/6/7/6/11676720_350_350.jpg",
  },
  {
    title: "Quiero perderme contigo",
    artist: "José José",
    source: "./musica/José José - Quiero Perderme Contigo.mp3",
    cover:
      "https://s.mxmcdn.net/images-storage/albums/0/2/7/6/7/6/11676720_350_350.jpg",
  },
  {
    title: "Cinnamon Girl",
    artist: "Lana Del Rey",
    source: "./musica/Lana Del Rey - Cinnamon Girl.mp3",
    cover:
      "https://s.mxmcdn.net/images-storage/albums2/6/0/2/0/6/5/45560206_350_350.jpg",
  },
  {
    title: "Something About Us",
    artist: "Daft Punk ",
    source: "./musica/Daft Punk - Something About Us.mp3",
    cover:
      "https://s.mxmcdn.net/images-storage/albums/9/5/3/9/4/7/26749359_350_350.jpg",
  },
  // Agrega más canciones según sea necesario
];

function showNowPlaying() {
  // Muestra el contenedor "Now Playing" cuando la música se reproduce
  const selectedSong = songs[currentTrackIndex];
  nowPlayingContainer.innerHTML = `${selectedSong.title} - ${selectedSong.artist}`;
  nowPlayingContainer.style.display = "block";
}

// Función para mezclar aleatoriamente un array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Mezcla aleatoriamente las canciones
shuffleArray(songs);

const backgroundColors = [
  "#ffd1dc",
  "#ffd700",
  "#98fb98",
  "#dda0dd",
  "#ffb6c1",
  "#add8e6",
  "#ffb347",
  "#87cefa",
  "#f0e68c",
  "#ffcccb",
  "#98fb98",
  "#f0fff0",
  "#ffe4c4",
  "#dda0dd",
  "#ffb6c1",
];

songs.forEach((song, index) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
                <img src="${song.cover}" alt="Portada" width="150" height="150">
                <div class="song-info">
                    <div>${song.title}</div>
                    <div>${song.artist}</div>
                </div>
            `;
  listItem.addEventListener("click", () => changeTrack(index));
  playlist.appendChild(listItem);
});

function changeTrack(index) {
  const selectedSong = songs[index];
  currentTrackIndex = index; // Actualizar el índice de la canción actual

  // Mostrar el spinner de carga
  showSpinner();

  audioSource.src = selectedSong.source;
  audio.load();
  audio.play();

  // Cambiar el color de fondo suavemente al reproducir una nueva canción
  const randomColor =
    backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  document.getElementById("player").style.backgroundColor = randomColor;

  // Actualizar la información de la canción seleccionada
  songInfoContainer.innerHTML = `
                <img src="${selectedSong.cover}" alt="Portada" width="150" height="150">
                <div class="song-info">
                    <div>${selectedSong.title}</div>
                    <div>${selectedSong.artist}</div>
                </div>
            `;

  // Determinar si el color de fondo es claro u oscuro
  const isLightBackground = isLightColor(randomColor);

  // Mostrar notificación con Toastify
  Toastify({
    text: `Reproduciendo: ${selectedSong.title} - ${selectedSong.artist}`,
    gravity: "right",
    // position: "center",
    backgroundColor: randomColor, // Utiliza el mismo color de fondo que el reproductor
    close: true,
    duration: 5000, // Duración de la notificación en milisegundos
    style: {
      color: isLightBackground ? "#333" : "#fff", // Color del texto según el fondo
    },
  }).showToast();
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function playPreviousTrack() {
  // Reproducir la canción anterior
  currentTrackIndex = (currentTrackIndex - 1 + songs.length) % songs.length;
  changeTrack(currentTrackIndex);
}

function playNextTrack() {
  // Reproducir la siguiente canción al finalizar la actual
  if (isRandom) {
    // Si está activada la reproducción aleatoria, elige una canción aleatoria
    currentTrackIndex = Math.floor(Math.random() * songs.length);
  } else {
    // Si no, reproduce la siguiente canción en orden
    currentTrackIndex = (currentTrackIndex + 1) % songs.length;
  }

  changeTrack(currentTrackIndex);
}

// Función para determinar si un color es claro u oscuro
function isLightColor(color) {
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  // Calcula el brillo relativo usando la fórmula de luminancia
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128; // Devuelve true si el color es claro, de lo contrario, false
}
function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}
function playNextTrack() {
  // Reproducir la siguiente canción al finalizar la actual
  currentTrackIndex = (currentTrackIndex + 1) % songs.length;
  changeTrack(currentTrackIndex);
  console.log(playNextTrack);
}
