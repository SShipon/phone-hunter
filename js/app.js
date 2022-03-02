const searchField = () => {
  const searchFieldInput = document.getElementById("search-field");
  const searchText = searchFieldInput.value;
  searchFieldInput.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
};

// display search result

const displaySearchResult = (phone) => {
  const displaySearchPhoneResult = document.getElementById(
    "search-phone-result"
  );
  const errorHandel = document.getElementById("error-handel");
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = "";
  displaySearchPhoneResult.textContent = "";
  errorHandel.textContent = "";
  if (phone.length == 0) {
    const error404 = document.createElement("div");
    error404.innerHTML = `
      <h1 class="text-center text-danger"> result Not Found 404 !!!</h1>
      <p class="text-center text-danger">You find the right information !!!</p>
      `;
    errorHandel.appendChild(error404);
  } else {
    const NewData = phone.slice(0, 20);
    NewData.forEach((data) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("col");
      newDiv.innerHTML = `
        <div class="card h-100 shadow-lg p-4">
                    <img src="${data.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${data.brand}</h5>
                      <h5 class="card-title">${data.phone_name}</h5>
                      <section id="phone-details">
                      </section>

                       <button onclick="phoneDetails('${data.slug}')" class="btn btn-info text-white">Details</button>
                    </div>
                  </div>
        `;

      displaySearchPhoneResult.appendChild(newDiv);
    });
  }
};
//phone details Section

const phoneDetails = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhonesDetails(data.data));
};
const displayPhonesDetails = (data) => {
  // console.log(data);
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card mb-3 shadow-lg p-4" >
  <h3 class="text-center text-primary">Product Information</h3>
  <div class="row row-cols-1 row-cols-sm-2 g-0">
    <div class="col-md-4 col-sm-12">
      <img src="${data.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8 col-sm-12">
      <div id="others" class="card-body">
        <h5 class="card-title">Brand: ${data.brand}</h5>
        <p style="margin-bottom:-1px;" class="card-text">chipSet: ${
          data.mainFeatures.chipSet
        }<br>
        displaySize: ${data.mainFeatures.displaySize}<br>
        memory: ${data.mainFeatures.memory}</p>
         <h5 class="card-title">Release Date: ${
           data.releaseDate ? data.releaseDate : "Not release date "
         }</h5>
        <h5 id="text-content" onclick="othersDetails('${
          data.slug
        }')" class="text-primary">others: <i class="fas fa-angle-double-right"></i></h5>

      </div>
    </div>
  </div>
</div>
  `;
  phoneDetails.appendChild(div);
};

const othersDetails = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => phoneOthersDetails(data));
};
const phoneOthersDetails = (others) => {
  const moreOthersDetails = document.getElementById("others");
  const textContent = document.getElementById("text-content");
  textContent.style.display = "none";
  const div = document.createElement("div");
  div.innerHTML = `
    <p style="margin-bottom:-1px;">GPS: ${others.data.others.GPS}</p>
    <p style="margin-bottom:-1px;">NFC: ${others.data.others.NFC}</p>
    <p style="margin-bottom:-1px;">Radio: ${others.data.others.Radio}</p>
    <p style="margin-bottom:-1px;">Bluetooth: ${others.data.others.Bluetooth}</p>
    <p style="margin-bottom:-1px;">USB: ${others.data.others.USB}</p>
    <p style="margin-bottom:-1px;">WLAN: ${others.data.others.WLAN}</p>
    
    `;
  moreOthersDetails.appendChild(div);
};
