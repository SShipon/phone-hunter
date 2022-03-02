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
                      <h5 class="card-title">Brand: ${data.brand}</h5>
                      <h5 class="card-title">Name: ${data.phone_name}</h5>
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
        <p style="margin-bottom:-1px;" class="card-text text-bold">ChipSet: ${
          data.mainFeatures.chipSet
        }<br>
        DisplaySize: ${data.mainFeatures.displaySize}
        <br>
        memory: ${data.mainFeatures.memory}</p>
        <br>
         Storage:${data.mainFeatures.storage}
         <br>
         Sensors: ${data.mainFeatures.sensors}
         <h5 class="card-title">Release Date: ${
           data.releaseDate ? data.releaseDate : "Not release date "
         }</h5>
         <p></p>
         
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






/* 

 <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mobile Zone Bangladesh Limited</title>
    <!-- fontawesome -->
    <script
      src="https://kit.fontawesome.com/ac8c1929ed.js"
      crossorigin="anonymous"
    ></script>
    <!-- google font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <!-- css link  -->
    <link rel="stylesheet" href="css/style.css" />
    <!-- bootstrap link -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <!-- header section area  -->
    <!-- search bar -->
    <header>
      <h1 class="text-warning mt-3 my-5 text-center">
        Mobile <span class="text-info fw-bold">ZoNe</span
        ><span class="text-success"> Bangladesh</span> Limited !!!
      </h1>
      <div class="container">
        <div class="input-group mb-3 mx-auto my-5">
          <input
            id="search-field"
            type="text"
            class="form-control"
            placeholder="Search Your phone"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            onclick="searchField()"
            class="px-lg-5 btn btn-outline-secondary"
            type="button"
            id="search-button"
          >
            search <i class="fas fa-search my-2"></i>
          </button>
        </div>
      </div>
    </header>
    <!-- display phone details section -->

    <main>
      <section class="my-5">
        <div id="phone-details" class="container"></div>
      </section>

      <!-- error handel section area  -->
      <section class="my-5">
        <div
          id="error-handel"
          class="mx-auto mt-5"
          style="max-width: 540px"
        ></div>
      </section>

      <!-- display search-phone-result -->
      <section class="container my-5">
        <div
          id="search-phone-result"
          class="row row-cols-1 row-cols-md-3 g-4"
        ></div>
      </section>
    </main>

    <!-- footer section area -->

    <footer class="footer-container bg-dark">
      <div class="text-Light">
        <h3>Your Visit now</h3>
        <p>
          An "Account" represents your legal relationship with GitHub. A“
          Account”
        </p>
        <ul class="socials">
          <li>
            <a href="https://www.linkedin.com/in/md-shipon-214207214/">
              <i class="fab fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/mdshipon.chowdhury.940/">
              <i class="fab fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/SShipon">
              <i class="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://m.me/mdshipon.chowdhury.940">
              <i class="fab fa-facebook-messenger"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>
          Copyright &copy; 2022 Webflow, Inc. All rights reserved by
          <br />
          <span>
            <a href="https://mail.google.com/mail/u/0/#inbox"
              ><i id="icon" class="fas fa-envelope"></i
            ></a>
            nxshipon@gmail.com</span
          >
        </p>
      </div>
    </footer>

    <!-- vanilla javascript link -->
    <script src="js/app.js"></script>
    <!-- Bootstrap Javascript link  -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
  </body>
</html>




*/