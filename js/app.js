const searchPhone = () => {
    const searchFiled = document.getElementById('search-field')
    const searchText = searchFiled.value;
    //console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhoneResult(data.data.slice(0, 20)));
};

const displayPhoneResult = (phones) => {
    //console.log(phone);
    const searchPhoneResult = document.getElementById("search-result");
    searchPhoneResult.innerHTML = '';
    
     //console.log(searchResult);
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
             <div class="card h-100">
        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
         <div class="card-body">
         <h5 class="card-title">${phone.brand}</h5>
         <h6 class="card-title">${phone.phone_name}</h6>
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
    .then((data) => myPhoneDetails(data.data));
};



const myPhoneDetails = (phoneIdDetails) => {

  const phoneDetailArea = document.getElementById("phoneId-detail");
  phoneDetailArea.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = ` 
      
         <img src="${phoneIdDetails.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${phoneIdDetails.brand}</h5>
        <p class="card-text">${phoneIdDetails.brand.slice(0, 250)}</p>
       <a href="${phoneIdDetails.brand}"class="btn btn-primary">Click now</a>
     </div>
  `;
  phoneDetailArea.appendChild(div);
};