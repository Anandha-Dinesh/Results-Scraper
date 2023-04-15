
const color = document.querySelector(".name");

function changeColor(color) {
   color.style.color = color;
}

const rotated = document.getElementById('gear');
let rotation = 0;
const angle = 30;
function rotateImage() {
  rotation = (rotation + angle) % 360;
  rotated.style.transform = `rotate(${rotation}deg)`;
}
