const recipes = [
  {
    name: "Sweet Potato Waffles",
    description: "Savory waffles made with sweet potato with a hint of ginger.",
    image: "images/sweet-potato-waffle-md.jpg",
    tags: ["Waffles", "Sweet Potato", "Side"],
    rating: 4,
    prepTime: "30 Min",
    cookTime: "30 Min"
  },
  {
    name: "Escalope de Poulet a la Creme with Steamed Green Beans",
    description: "A quick and easy creamy chicken and rice dish.",
    image: "images/escalopes-de-poulet-a-la-creme.webp",
    tags: ["Chicken", "Entree"],
    rating: 4.5,
    prepTime: "10 Min",
    cookTime: "20 Min"
  },
  {
    name: "Oven Roasted Potato Slices",
    description: "Easy oven roasted potatoes that go with almost anything.",
    image: "images/roasted-potatoes.webp",
    tags: ["Potatoes", "Side"],
    rating: 4,
    prepTime: "10 Min",
    cookTime: "30 Min"
  },
  {
    name: "Black Beans and Rice",
    description: "Black beans and tomatoes served over rice.",
    image: "images/black-beans-and-rice.jpg",
    tags: ["Southwest", "Entree"],
    rating: 3,
    prepTime: "10 Min",
    cookTime: "20 Min"
  },
  {
    name: "Chicken Curry",
    description: "Quick and easy chicken curry with simple ingredients.",
    image: "images/chicken-curry.webp",
    tags: ["Chicken", "Entree", "Indian"],
    rating: 5,
    prepTime: "10 Min",
    cookTime: "30 Min"
  },
  {
    name: "Chocolate Chip Cookies",
    description: "Soft chocolate chip cookies with coconut.",
    image: "images/chocolate-chip-cookies.jpg",
    tags: ["Dessert"],
    rating: 5,
    prepTime: "15 Min",
    cookTime: "11 Min"
  }
];

const recipeContainer = document.querySelector("#recipe-container");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

function tagsTemplate(tags) {
  return tags.map(tag => `<span class="tag">${tag}</span>`).join("");
}

function ratingTemplate(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += "⭐";
    } else {
      stars += "☆";
    }
  }
  return `<p class="rating">${stars}</p>`;
}

function recipeTemplate(recipe) {
  return `
    <article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
      <div class="recipe-info">
        <div class="recipe-tags">
          ${tagsTemplate(recipe.tags)}
        </div>
        <h2>${recipe.name}</h2>
        ${ratingTemplate(recipe.rating)}
        <p>${recipe.description}</p>
        <p><strong>Prep:</strong> ${recipe.prepTime}</p>
        <p><strong>Cook:</strong> ${recipe.cookTime}</p>
      </div>
    </article>
  `;
}

function renderRecipes(recipeList) {
  recipeContainer.innerHTML = recipeList.map(recipeTemplate).join("");
}

function getRandomRecipe(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

function sortRecipes(recipeList) {
  recipeList.sort((a, b) => a.name.localeCompare(b.name));
  return recipeList;
}

function filterRecipes(query) {
  const lowerQuery = query.toLowerCase();

  const filtered = recipes.filter(recipe => {
    const name = recipe.name.toLowerCase();
    const description = recipe.description.toLowerCase();
    const tags = recipe.tags.join(" ").toLowerCase();

    return (
      name.includes(lowerQuery) ||
      description.includes(lowerQuery) ||
      tags.includes(lowerQuery)
    );
  });

  return sortRecipes(filtered);
}

function init() {
  const randomRecipe = getRandomRecipe(recipes);
  renderRecipes([randomRecipe]);
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const query = searchInput.value.trim();

  if (query === "") {
    init();
  } else {
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
  }
});

init();