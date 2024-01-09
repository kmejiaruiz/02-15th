$(document).ready(function () {
  const photoPaths = [
    "/assets/p1.jpg",
    "/assets/p2.jpg",
    "/assets/p3.jpg",
    "/assets/p4.jpg",
    "/assets/p5.jpg",
    "/assets/p6.jpg",
    "/assets/p7.jpg",
    "/assets/p8.jpg",
    "/assets/p9.jpg",
    "/assets/p10.jpg",
  ];
  const photoCarousel = $("#photoCarousel");

  // Agregar cada foto al carrusel
  photoPaths.forEach(function (path) {
    const imgElement = $("<img>").attr("src", path).addClass("carousel-image");
    photoCarousel.append(imgElement);
  });

  // Configuración del carrusel utilizando Owl Carousel
  photoCarousel.owlCarousel({
    loop: true,
    margin: 20,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  });
});
