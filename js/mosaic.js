$(document).ready(function () {
  // Inicializa Fancybox
  $(".mosaic-item").fancybox({
    loop: true, // Permite la navegación en bucle
    buttons: [
      "zoom",
      "fullScreen",
      "thumbs",
      "close",
      
    ],
    animationEffect: "fade",
    transitionEffect: "fade",
  });
});
