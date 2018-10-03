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
new Product('Luggage', 'imgs/bag.jpg','Bag');
new Product('Banana Slicer', 'imgs/banana.jpg','Banana Slicer');
new Product('Bathroom Buddy', 'imgs/bathroom.jpg','Bathroom');
new Product('Fashion Wellies', 'imgs/boots.jpg','Boots');
new Product('Breakfast Machine', 'imgs/breakfast.jpg','Breakfast');
new Product('Meatball Bubblegum', 'imgs/bubblegum.jpg', 'Bubblegum');
new Product('Chair', 'imgs/chair.jpg', 'Chair');
new Product('Cthulhu', 'imgs/cthulhu.jpg', 'Cthulhu');
new Product('Duck Muzzle', 'imgs/dog-duck.jpg', 'Dog Duck');
new Product('Dragon Meat', 'imgs/dragon.jpg', 'Dragon Meat');
new Product('Practical Cutlery', 'imgs/pen.jpg', 'Pen');
new Product('Pet Broom', 'imgs/pet-sweep.jpg', 'Pet Broom');
new Product('Pizza Scissors', 'imgs/scissors.jpg', 'Scissors');
new Product('Shark Attack', 'imgs/shark.jpg', 'Shark');
new Product('Baby Broom', 'imgs/sweep.png', 'Sweep');
new Product('Tauntaun', 'imgs/tauntaun.jpg', 'Tauntaun');
new Product('Unicorn Meat', 'imgs/unicorn.jpg', 'Unicorn Meat');
new Product('Tentacle USB', 'imgs/usb.gif', 'Tentacle USB');
new Product('Watering Can', 'imgs/water-can.jpg', 'Watering Can');
new Product('Wine Glass', 'imgs/wine-glass.jpg', 'Wine Glass');

//Retrieving data from local storage, if it exists
if (localStorage.getItem('storedProducts') !== null) {
  console.log('Data found');
  Product.allProducts = JSON.parse(localStorage.getItem('storedProducts'));
} else {
  console.log('Not found');
  localStorage.setItem('storedProducts', JSON.stringify(Product.allProducts));
}


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
  for(var i = 0; i < Product.allProducts.length; i++) {
    if(event.target.altText === Product.allProducts[i].altText) {
      Product.allProducts[i].votes++;
      updateChartArrays();
    }
  }
  if (Product.totalVotes < 1) {
    Product.section.removeEventListener('click', newSet);
    productsSection.innerHTML = '';
    localStorage.setItem('storedProducts', JSON.stringify(Product.allProducts));
    drawChart();
  }
  randomProduct();
}

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
      label: 'Votes per Product',
      data: votes,
      backgroundColor: [
        'rgb(255,18,0)',
        'rgb(232,62,0)',
        'rgb(255,117,0)',
        'rgb(232,146,0)',
        'rgb(255,195,0)',
        'rgb(255,205,0)',
        'rgb(232,218,0)',
        'rgb(192,255,0)',
        'rgb(68,232,0)',
        'rgb(0,255,35)',
        'rgb(0,255,112)',
        'rgb(0,232,189)',
        'rgb(0,210,255)',
        'rgb(0,111,232)',
        'rgb(0,33,255)',
        'rgb(0,80,255)',
        'rgb(131,0,232)',
        'rgb(206,0,255)',
        'rgb(232,0,195)',
        'rgb(255,0,83)'
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
  new Chart(ctx,{
    type: 'doughnut',
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
}


//Event Listener
Product.section.addEventListener('click', newSet);

randomProduct();
