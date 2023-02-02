let result = document.querySelector('.result');
let searchBtn = document.querySelector('.search-btn');
let userInput = document.querySelector('.user-input').value;
let url = 'https://thecocktaildb.com/api/json/v1/1/search.php?s=';

let getInfo = () => {
    let userInput = document.querySelector('.user-input').value;
    if(userInput.length === 0) {
        result.innerHTML = `<h3 class="msg"> The input field cannot be empty</h3>`
    } else {
        fetch(url + userInput)
        .then((response) => response.json())
        .then((data) => {
            document.getElementsByClassName('user-input').value = "";
            let myDrink = data.drinks[0];
            let ingredients = [];

            for(let i = 1; i <= 15; i++) {
                let ingredient = myDrink['strIngredient' + i];
                let measure = myDrink['strMeasure' + i];

                let finalIngredient = `${measure !== null ? measure : ""} ${ingredient}`;

                if(ingredient !== null) {
                    ingredients.push(finalIngredient);
                }
            }

            result.innerHTML = `
                <img class="cocktail-img" src="${myDrink.strDrinkThumb}"></img>
                <h2>${myDrink.strDrink}</h2>
                <h3>Ingredients:</h3>
                <ul class="ingredients"></ul>
                <h3>Instructions:</h3>
                <p>${myDrink.strInstructions}</p>
            `;
    
            let ingredientsCon = document.querySelector('.ingredients');
            ingredients.forEach((item) => {
                let listItem = document.createElement('li');
                listItem.innerHTML = item;
                ingredientsCon.appendChild(listItem);
            });
        }).catch(() => {
            result.innerHTML = `<h3 class="msg">Please enter a valid input</h3>`
        });
    }
};

const handleSubmit = (event) => {
    event.preventDefault();
    getInfo();
}

// window.addEventListener("load", getInfo);
searchBtn.addEventListener('click', getInfo);