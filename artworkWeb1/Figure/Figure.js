let draft, ready;
function preload() {
  ready = loadImage("assets/Top.jpg");
  draft = loadImage("assets/Top_Black.jpg");
}
function setup() {
  createCanvas(600, 400);
  noCursor();
  cursor("assets/Brush.png", 20, -10);
  image(ready, 0, 0);
  image(draft, 0, 0);
}
function mouseDragged() {
  copy(ready, mouseX, mouseY, 20, 20, mouseX, mouseY, 20, 20);
}
