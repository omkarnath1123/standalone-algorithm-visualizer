let element = document.querySelector("#loader");
element.classList.add("boxLoading");

setTimeout(function() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("page").style.display = "block";
  document.getElementById("loader").remove();
}, 1500);

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
