//Make an object
'use strict';

//Array of products
Product.allProducts = [];
Product.activeSet = [];
Product.lastDisplayed = [];
Product.totalVotes = 25;

//Arrays to hold data for the chart
var votes = [];
var names = [];

//Products Section
Product.section = document.getElementById('productsSection');

//Results Element
Product.resultsList = document.getElementById('resultsList');

//Referring to specific images
var productOne = document.getElementById('productOne');
var productTwo = document.getElementById('productTwo');
var productThree = document.getElementById('productThree');

function Product(name, filepath, altText) {
  this.name = name;
  this.filepath = filepath;
  this.altText = altText;
  this.votes = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

//Make new Products instances
new Product('Bag', 'imgs/bag.jpg','Bag');
new Product('Banana Slicer', 'imgs/banana.jpg','Banana Slicer');
new Product('Bathroom', 'imgs/bathroom.jpg','Bathroom');
new Product('Boots', 'imgs/boots.jpg','Boots');
new Product('Breakfast', 'imgs/breakfast.jpg','Breakfast');
new Product('Bubblegum', 'imgs/bubblegum.jpg', 'Bubblegum');
new Product('Chair', 'imgs/chair.jpg', 'Chair');
new Product('Cthulhu', 'imgs/cthulhu.jpg', 'Cthulhu');
new Product('Dog Duck', 'imgs/dog-duck.jpg', 'Dog Duck');
new Product('Dragon Meat', 'imgs/dragon.jpg', 'Dragon Meat');
new Product('Pen', 'imgs/pen.jpg', 'Pen');
new Product('Pet Broom', 'imgs/pet-sweep.jpg', 'Pet Broom');
new Product('Scissors', 'imgs/scissors.jpg', 'Scissors');
new Product('Shark', 'imgs/shark.jpg', 'Shark');
new Product('Sweep', 'imgs/sweep.png', 'Sweep');
new Product('Tauntaun', 'imgs/tauntaun.jpg', 'Tauntaun');
new Product('Unicorn Meat', 'imgs/unicorn.jpg', 'Unicorn Meat');
new Product('Tentacle USB', 'imgs/usb.gif', 'Tentacle USB');
new Product('Watering Can', 'imgs/water-can.jpg', 'Watering Can');
new Product('Wine Glass', 'imgs/wine-glass.jpg', 'Wine Glass');


//Randomly display products

function randomProduct() {
  var randomOne = Math.floor(Math.random() * Product.allProducts.length);
  var randomTwo = Math.floor(Math.random() * Product.allProducts.length);
  var randomThree = Math.floor(Math.random() * Product.allProducts.length);

  //Confirm there are no duplicate images, and if there are, reroll
  while(Product.lastDisplayed.includes(randomOne) || Product.lastDisplayed.includes(randomTwo) || Product.lastDisplayed.includes(randomThree) || randomOne === randomTwo || randomTwo == randomThree || randomThree == randomOne) {
    randomOne = Math.floor(Math.random() * Product.allProducts.length);
    randomTwo = Math.floor(Math.random() * Product.allProducts.length);
    randomThree = Math.floor(Math.random() * Product.allProducts.length);
  }

  // Update images
  productOne.src = Product.allProducts[randomOne].filepath;
  productTwo.src = Product.allProducts[randomTwo].filepath;
  productThree.src = Product.allProducts[randomThree].filepath;
  productOne.altText = Product.allProducts[randomOne].altText;
  productTwo.altText = Product.allProducts[randomTwo].altText;
  productThree.altText = Product.allProducts[randomThree].altText;

  // Increments views for all images
  Product.allProducts[randomOne].views++;
  Product.allProducts[randomTwo].views++;
  Product.allProducts[randomThree].views++;

  Product.lastDisplayed[0] = randomOne;
  Product.lastDisplayed[1] = randomTwo;
  Product.lastDisplayed[2] = randomThree;
}

//Event Handler function
function newSet (event) {

  if (event.target.id === 'productsSection') {
    return alert('Please click on an image.');

  }
//Decrement total available votes
  Product.totalVotes--;

//Count individual product votes
  console.log('event.target', event.target.altText);
  for(var i = 0; i < Product.allProducts.length; i++) {
    if(event.target.altText === Product.allProducts[i].altText) {
      Product.allProducts[i].votes++;
      updateChartArrays();
    }
  }

  if (Product.totalVotes < 1) {
    Product.section.removeEventListener('click', newSet);
    productsSection.innerHTML = '';
    drawChart();
  }
  randomProduct();
}
//Function to display statys
// function showStats() {
//   for(var i = 0; i < Product.allProducts.length; i++) {
//     var liEl = document.createElement('li');
//     liEl.textContent = Product.allProducts[i].name + ' got ' + Product.allProducts[i].votes + ' votes out of ' + Product.allProducts[i].views + ' times displayed.';
//     Product.resultsList.appendChild(liEl);
//   }
// }

//Update data arrays for chart
function updateChartArrays() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    names[i] = Product.allProducts[i].name;
    votes[i] = Product.allProducts[i].votes;
  }
}

//Chart Stuff
var data = {
  labels: names,
  datasets: [
    {
      data: votes,
      backgroundColor: [
        'darkred',
        'crimson',
        'orangered',
        'orange',
        'coral',
        'gold',
        'yellow',
        'chartreuse',
        'turquoise',
        'teal',
        'paleturquoise',
        'skyblue',
        'cornflowerblue',
        'royalblue',
        'slateblue',
        'mediumorchid',
        'darkviolet',
        'indigo',
        'darkmagenta',
        'deeppink'

      ],
      hoverBackgroundColor: [
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon',
        'lemonchiffon'
      ]
    }]
};

function drawChart() {
  var ctx = document.getElementById('productStats').getContext('2d');
  songChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 20,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
  chartDrawn = true;
}


//Event Listener
Product.section.addEventListener('click', newSet);

randomProduct();