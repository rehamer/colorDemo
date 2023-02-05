const gameContainer = document.getElementById("game");

//the number of boxes is dependent on the number objects in this array by creating a div class
const COLORS = ["red", "blue", "green", "orange", "purple", "red", "blue", "green", "orange", "purple"];

// here is a "helper" function where you send COLORS as array and return the same but shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array, the elements were being indexed before it gets returned
  while (counter > 0) {
    // Pick a random index and decrease by 1
    let index = Math.floor(Math.random() * counter);
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

//the original array will get shuffled everytime, using the variable shuffledColors because it calls the function shuffle
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors. it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  // note the use of "of" here which means, its the object of the color in the colorArray that is being passe
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
   
    // append the div to the element with an id of game and the class defined in #game div
    gameContainer.append(newDiv);
  }
}

//this function runs when the div with color is being clicked and assign the object "event", any word will work.
//const boxClicked = document.querySelectorAll('#game div');
let counter = 0;

function handleCardClick(event) {  

  let colorClicked = event.target.classList.value;
  let savedColor = localStorage.color1;

    if (typeof savedColor === 'undefined') { 
      event.target.style.backgroundColor = colorClicked;
      localStorage.setItem('color1', colorClicked);  
      
    } else if (savedColor !== colorClicked) {
      //to assing color to previous div clicked
      let color1 = document.querySelector(`.${savedColor}`);
      color1.style.backgroundColor = savedColor;
      event.target.style.backgroundColor = colorClicked;
      localStorage.clear();

      setTimeout(function(){
        color1.removeAttribute('style');
        event.target.removeAttribute('style'); 
        clearTimeout(); 
      },500);        

    } else if (savedColor === colorClicked) {
      let color1 = document.querySelector(`.${savedColor}`);
      color1.style.backgroundColor = savedColor;
      event.target.style.backgroundColor = colorClicked;
      color1.removeEventListener("click", handleCardClick);
      event.target.removeEventListener("click", handleCardClick);
      localStorage.clear();
    }

}


// when the DOM loads
createDivsForColors(shuffledColors);

