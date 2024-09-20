'use strict';

const cakeRecipes = require("./cake-recipes.json");
const ps = require("prompt-sync");
const prompt = ps();

// Your functions here

//return list of unique authors
const uniqueAuthors = []; 
const getUniqueAuthors = (recipes) => {
  recipes.forEach((recipe) => {
    if (!uniqueAuthors.includes(recipe.Author)) {  
      uniqueAuthors.push(recipe.Author)
    }
  });

  return uniqueAuthors;
};

getUniqueAuthors(cakeRecipes);

//log the name of each recipe
function logRecipeNames(recipes) {
  if(recipes.length === 0) {
    console.log("\nNo recipes were found (inputs are case sensitive).");
    return; 
  }

recipes.forEach(({ Name }) => {
console.log(Name);
});
}

// logRecipeNames(cakeRecipes);

//return all recipes of a given author
const filteredAuthor = (recipes, author) => {
  return recipes.filter(({ Author }) => Author === author);
};

// //return list of recipes containing a given ingredient
const filteredIngredient = (recipes, ingredient) => {
  return recipes.filter(recipe => {
      return Array.isArray(recipe.Ingredients) && recipe.Ingredients.some(ing => ing.includes(ingredient));
  });
};

//return single recipe
const singleRecipe = (recipes, name) => { 
  const recipe = recipes.find(recipe => recipe.Name.includes(name));
  if (recipe) {
    console.log(recipe);
    return recipe;
  } else {
    console.log("\nRecipe not found.");
    return null;
  }
};

// returns all ingredients
const getAllIngredients = (recipes) => {
  return recipes.reduce((acc, recipe) => {
    return acc.concat(recipe.Ingredients);
  }, []);
};

// Part 2

function displayMenu() {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}

let selectedAuthor = null;
let savedRecipes =[];
let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log("\nPlease see a list of unique authors below:")
      console.log(getUniqueAuthors(cakeRecipes));
      break;
    case 2:
      selectedAuthor = prompt("Which author do you want to search?");
      const filteredRecipesAuthor = filteredAuthor(cakeRecipes, selectedAuthor);
      console.log(`\nPlease see all of ${selectedAuthor}'s recipes:`);
      logRecipeNames(filteredRecipesAuthor)
      break;
    case 3:
      const selectIngredient = prompt("Which ingredient do you want to search?");
      console.log(`\nPlease see all recipes containing ${selectIngredient}:`)
      const filteredRecipesIngredient = filteredIngredient(cakeRecipes, selectIngredient);
      logRecipeNames(filteredRecipesIngredient);
      break;
    case 4:
      const selectRecipeName = prompt("Which recipe would you like to search?");
      const filteredRecipesName = singleRecipe(cakeRecipes, selectRecipeName);
      if (filteredRecipesName) { 
        logRecipeNames([filteredRecipesName]);
      
      const saveRecipe = prompt("Would you like to save this recipe? (yes/no)");
      if(saveRecipe.toLowerCase() ==='yes') {
        savedRecipes.push(filteredRecipesName);
        console.log(`\n${filteredRecipesName.Name} has been saved!`);
      } else {
        console.log("No recipe was saved")
        }
      }

      break;
    case 5:
        if (savedRecipes.length === 0) { 
        console.log("\nNo recipes saved. Please save a recipe in option 4.");
      } else {  
        console.log(`\nAll of the ingredients to make your saved recipes:`);
        const allIngredients = getAllIngredients(savedRecipes)
        console.log(allIngredients);
      }
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);