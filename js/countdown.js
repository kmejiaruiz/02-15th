$(document).ready(function () {
  const countdownDate = new Date("Feb 15, 2024 00:00:00").getTime();

  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").style.display = "none";
      document.getElementById("dedication").style.display = "block";
      document.getElementById("gallery").style.display = "block";
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("timer").innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    }
  }, 1000);
});
