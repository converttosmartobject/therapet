// let input, button, greeting;
//
// function setup() {
//   noCanvas();
//
//   input = createInput();
//   input.position(65, 65);
//
//   button = createButton('say something');
//   button.position(input.x + input.width, 65);
//   button.mousePressed(greet);
//
//   greeting = createElement('h2', 'meow?');
//   greeting.position(65, 5);
//
//   textAlign(CENTER);
//   textSize(50);
// }
//
// function greet() {
//   const message = input.value();
//   greeting.html('meow ' + name + '!');
//   input.value('');
// }
function setup() {
  noCanvas();
}
function draw() {
  background(220);
}

function getTime() {
  let h = hour();
  let m = minute();
  let ampm = h <= 12 ? "AM" : "PM"
  return "" + h % 12 + ":" + m + " " + ampm
}
