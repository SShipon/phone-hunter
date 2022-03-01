# phone-hunter-SShipon


document.getElementById("error-message").style.display = "none";

const searchFood = () => {
  const searchField = document.getElementById("search-field");
  document.getElementById("error-message").style.display = "none";
  const searchText = searchField.value;
  // console.log(searchText);
  searchField.value = "";
  if (searchText == "") {
    alert("sorry your positives");
  } else {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
      // console.log(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data))
      .catch((error) => displayError(error));
  }
};

const displayError = (error) => {
  document.getElementById("error-message").style.display = "block";
};

const displaySearchResult = (meals) => {
  const searchResult = document.getElementById("search-result");
  /* searchResult.innerHTML = ''; */ //1 option
  searchResult.textContent = "";
  if (meals.length == 0) {
    alert("sorry your positives");
  }
  meals.forEach((meal) => {
    console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
       <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
         <div class="card-body">
         <h5 class="card-title">${meal.strMeal}</h5>
         <h6 class="card-title">${meal.strTags}</h6>
         <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
      </div>
    </div>
        `;
    searchResult.appendChild(div);
  });
};

const loadMealDetail = (mealId) => {
  console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};

const displayMealDetail = (meal) => {
  console.log(meal);
  const mealDetails = document.getElementById("meal-detail");
  mealDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
         <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
       <a href="${meal.strYoutube}"class="btn btn-primary">Click now</a>
     </div>
  `;
  mealDetails.appendChild(div);
};

