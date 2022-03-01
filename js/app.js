const searchPhone = () => {
    const searchFiled = document.getElementById('search-field')
    const searchText = searchFiled.value;
    //console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhoneResult(data.data));
};

const displayPhoneResult = (phones) => {
    //console.log(phone);
     const searchResult = document.getElementById("search-result");
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
      </div>
    </div>
        `;
         searchResult.appendChild(div);
    });
 };  