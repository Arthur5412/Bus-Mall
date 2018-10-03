//Make an object
'use strict';

//Array of products
Product.allProducts = [];

//Variables in use
var productOne = document.getElementById('productOne');
var productTwo = document.getElementById('productTwo');
var productThree = document.getElementById('productThree');
var activeSet = [];
// var excludeSet = [];
var votes = 25;

function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

//Make new Products instances
new Product('Bag', 'imgs/bag.jpg');
new Product('Banana Slicer', 'imgs/banana.jpg');
new Product('Bathroom', 'imgs/bathroom.jpg');
new Product('Boots', 'imgs/boots.jpg');
new Product('Breakfast', 'imgs/breakfast.jpg');
new Product('Bubblegum', 'imgs/bubblegum.jpg');
new Product('Chair', 'imgs/chair.jpg');
new Product('Cthulhu', 'imgs/cthulhu.jpg');
new Product('Dog Duck', 'imgs/dog-duck.jpg');
new Product('Dragon Meat', 'imgs/dragon.jpg');
new Product('Pen', 'imgs/pen.jpg');
new Product('Pet Broom', 'imgs/pet-sweep.jpg');
new Product('Scissors', 'imgs/scissors.jpg');
new Product('Shark', 'imgs/shark.jpg');
new Product('Sweep', 'imgs/sweep.png');
new Product('Tauntaun', 'imgs/tauntaun.jpg');
new Product('Unicorn Meat', 'imgs/unicorn.jpg');
new Product('Tentacle USB', 'imgs/usb.gif');
new Product('Watering Can', 'imgs/water-can.jpg');
new Product('Wine Glass', 'imgs/wine-glass.jpg');

//Event Listener

productOne.addEventListener('click', randomProduct);
productTwo.addEventListener('click', randomProduct);
productThree.addEventListener('click', randomProduct);

//Randomly display products

function randomSet() {
  activeSet = [];
  while(activeSet.length < 3){
    var randomNumber = Math.floor(Math.random() * Product.allProducts.length);
    // if (randomNumber == excludeSet[i])
    if(activeSet.indexOf(randomNumber) > - 1) continue;
    activeSet.push(randomNumber);
  }
}

function randomProduct() {
  randomSet();
  productOne.src = Product.allProducts[activeSet[0]].filepath;
  productTwo.src = Product.allProducts[activeSet[1]].filepath;
  productThree.src = Product.allProducts[activeSet[2]].filepath;

  Product.allProducts[activeSet[0]].views++;
  Product.allProducts[activeSet[1]].views++;
  Product.allProducts[activeSet[2]].views++;
  votes--;
}

 
if (votes == 0) {
  productOne.removeEventListener('click', randomProduct);
  productTwo.removeEventListener('click', randomProduct);
  productThree.removeEventListener('click', randomProduct);
}


randomProduct();
console.log(activeSet);
console.log(Product.allProducts);
