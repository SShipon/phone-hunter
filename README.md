# phone-hunter-SShipon

const phone = () => {
  const inputField = document.getElementById("input-field");
  const searchText = inputField.value;
  document.getElementById("input-field").value = "";
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPhone(data.data.slice(0, 20)));
};

const showPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";

  phones.forEach((phone) => {
    //console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = ` 
    <div class="card p-3 text-center shadow-lg ">
    <img width="400px"  src="${phone.image}" class="card-img-top " alt="...">
    <div class="card-body border-0  ">
      <h5 class="card-title">Brand: ${phone.brand}</h5>
      <p class="card-text"> Model: ${phone.phone_name}</p>
      <p class="card-text"> Relese Date: ${phone.releaseDate}</p>
      <button onClick="moreInfo('${phone.slug}')" class="btn btn-info text-white">Details</button>
    </div>
  </div>
     `;
    phoneContainer.appendChild(div);
  });
};

const moreInfo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => showInfo(data.data));
};

const showInfo = (information) => {
  //console.log(information.mainFeatures.chipSet);
  const infoContainer = document.getElementById("info-container");
  infoContainer.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = ` 
  <div class="card p-3 shadow-lg">
  <img width="400px"  src="${information.image}" class="card-img-top img-fluid" alt="...">
  <div class="card-body">
    <h5 class="card-title">Brand: ${information.brand}</h5>
    <p class="card-text"> Model: ${information.name}</p>
    <p class="card-text"> ChipSet: ${information.mainFeatures.chipSet}</p>
    <p class="card-text"> Disply Size: ${information.mainFeatures.displaySize}</p>
    <p class="card-text"> Memory: ${information.mainFeatures.memory}</p>
    <p class="card-text"> Relese Date: ${information.releaseDate}</p>
  </div>
</div>
  `;
  infoContainer.appendChild(div);
};
