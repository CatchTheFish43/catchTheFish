// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/147-chrome-dinosaur.html
// https://youtu.be/l0HoJHc-63Q

// Google Chrome Dinosaur Game (Unicorn, run!)
// https://editor.p5js.org/codingtrain/sketches/v3thq2uhk

let fish;
let uImg;
let tImg;
let bImg;
let ships = [];
let soundClassifier;

function preload() {
  const options = {
    probabilityThreshold: 0.95
  };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
  uImg = loadImage('fish.jpg');
  tImg = loadImage('ship.jpg');
  bImg = loadImage('sea.jpg');
}

function mousePressed() {
  ships.push(new Ship());
}

function setup() {
  createCanvas(1200, 550);
  fish = new Fish();
  soundClassifier.classify(gotCommand);
}

function gotCommand(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results[0].label, results[0].confidence);
  if (results[0].label == 'up') {
    fish.jump();
  }
}

function keyPressed() {
  if (key == ' ') {
    fish.jump();
  }
}

function draw() {
  if (random(1) < 0.005) {
   ships.push(new Ship());
  }

  background(bImg);
  for (let t of ships) {
    t.move();
    t.show();
    if (fish.hits(t)) {
      console.log('game over');
      noLoop();
    }
  }

  fish.show();
  fish.move();
}
