const searchPhone = () => {
    const searchFiled = document.getElementById('search-field')
    const searchText = searchFiled.value;
    searchFiled.value = '';
    
    //console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.data.length == 0) {
                alert('Page Not Found 404')
            }
            else {
               displayPhoneResult(data.data.slice(0, 20)); 
            }
            
        });
};

const displayPhoneResult = (phones) => {
  //console.log(phones);
  const searchPhoneResult = document.getElementById("search-result");
    searchPhoneResult.innerHTML = "";
     const phoneTextError = document.getElementById("search-field");
     const searchText = phoneTextError.value;
   
  //console.log(searchResult);

    phones.forEach((phone) => {
      console.log(phone);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
             <div class="card h-100 shadow-lg p-2">
        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
         <div class="card-body">
         <h5 class="card-title"> Brand: ${phone.brand}</h5>
         <h6 class="card-title">Phone Name:${phone.phone_name}</h6>
         <p class="card-text"></p>
          <button onClick="moreDetails('${phone.slug}')" class="btn btn-info text-white">Details</button>
      </div>
    </div>
        `;
      searchPhoneResult.appendChild(div);
    });
 
};
    
 

const moreDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => showInfo(data.data));
};

const showInfo = (phoneIdDetails) => {
  //console.log(information.mainFeatures.chipSet);
  const phoneDetails = document.getElementById("phone-details");
    phoneDetails.innerHTML = "";
    phoneDetails.textContent=''
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = ` 
  <div class="card p-3 shadow-lg">
  <img width="100px"  src="${phoneIdDetails.image}" class="card-img-top img-fluid" alt="...">
  <div class="card-body">
    <h5 class="card-title">Brand:${phoneIdDetails.brand}</h5>
    <p class="card-text"> Model: ${phoneIdDetails.name}</p>
    <p class="card-text"> ChipSet: ${phoneIdDetails.mainFeatures.chipSet}</p>
    <p class="card-text"> Display Size: ${phoneIdDetails.mainFeatures.displaySize}</p>
    <p class="card-text"> Memory: ${phoneIdDetails.mainFeatures.memory}</p>
    <p class="card-text"> Release Date: ${phoneIdDetails.releaseDate?phoneIdDetails.releaseDate:'Not Found'}</p>
    <p class="card-text"> Bluetooth: ${phoneIdDetails.others.Bluetooth}</p>
    <p class="card-text"> USB: ${phoneIdDetails.others.USB}</p>
  </div>
</div>
  `;
  phoneDetails.appendChild(div);
};