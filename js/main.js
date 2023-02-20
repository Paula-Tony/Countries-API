// Select Country Menu
let selectRegion = document.querySelector(".select-region .default");
let selectMenu = document.querySelector(".select-region .options");
let options = document.querySelectorAll(".select-region .options input");
let mainContainer = document.querySelector("main .container");

selectRegion.addEventListener("click", function (e) {
  selectMenu.classList.toggle("open");
  selectRegion.children[1].classList.toggle("rotate");
});

options.forEach((option) => {
  option.onclick = function () {
    selectRegion.children[0].innerHTML = option.value;
    selectRegion.children[1].classList.remove("rotate");
    selectMenu.classList.remove("open");
  };
});

document.addEventListener("click", function (e) {
  if (e.target !== selectRegion) {
    if (selectMenu.classList.contains("open")) {
      selectMenu.classList.remove("open");
      selectRegion.children[1].classList.remove("rotate");
    }
  }
  if (e.target.className === "country") {
    mainContainer.parentElement.classList.add("hide");
    fetch("../js/data.json")
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === e.target.children[1].children[0].innerHTML) {
            let countryDetails = document.createElement("div");
            countryDetails.className = "country-datails";

            let container = document.createElement("div");
            container.className = "container";

            let backBtn = document.createElement("button");
            backBtn.className = "back";
            backBtn.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i>Back`;
            container.appendChild(backBtn);

            function languages() {
              let languages = [];
              for (let j = 0; j < data[i].languages.length; j++) {
                languages.push(data[i].languages[j].name);
              }
              return languages.join(", ");
            }

            function borderCountries() {
              let countries = "";
              let arr = data[i].borders;
              if (arr !== undefined) {
                for (let j = 0; j < data.length; j++) {
                  for (let x = 0; x < arr.length; x++) {
                    if (data[j].alpha3Code.includes(arr[x])) {
                      countries += `<span>${data[j].name}</span>`;
                    }
                  }
                }
              }
              return countries;
            }

            container.innerHTML += `
            <div class="country">
              <img src="${data[i].flag}" alt="" class="flag" />
              <div class="info">
                <h2 class="name">${data[i].name}</h2>
                <div class="details">
                  <div class="left">
                    <p class="native-name">Native Name: <span>${
                      data[i].nativeName
                    }</span></p>
                    <p class="population">Population: <span>${data[i].population
                      .toString()
                      .replace(/(\d)(?=(\d{3})+$)/g, "$1,")}</span></p>
                    <p class="region">Region: <span>${data[i].region}</span></p>
                    <p class="sub-region">
                      Sub Region: <span>${data[i].subregion}</span>
                    </p>
                    <p class="capital">Capital: <span>${
                      data[i].capital
                    }</span></p>
                  </div>
                  <div class="right">
                    <p class="top-level-domain">
                      Top Level Domain: <span>${data[i].topLevelDomain}</span>
                    </p>
                    <p class="currencies">Currencies: <span>${
                      data[i].currencies[0].name
                    }</span></p>
                    <p class="languages">
                      Languages: <span>${languages()}</span>
                    </p>
                  </div>
                </div>
                <div class="border-countries">
                  <p>Border Countries:</p>
                  <div class="spans">
                  ${borderCountries() || "<span>No Border Countries</span>"}
                  </div>
                </div>
              </div>
            </div>`;

            countryDetails.appendChild(container);
            document.body.appendChild(countryDetails);
          }
        }
      });
  }

  if (e.target.className === "back") {
    document.querySelector(".country-datails").remove();
    mainContainer.parentElement.classList.remove("hide");
  }
});

document.querySelector(".dark-mode").onclick = function () {
  document.documentElement.classList.toggle("dark-mode");
};

fetch("../js/data.json")
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    let countries = document.createElement("div");
    countries.className = "countries";
    for (let i = 0; i < data.length; i++) {
      let country = document.createElement("div");
      country.className = "country";

      let flag = document.createElement("img");
      flag.className = "flag";
      flag.src = data[i].flag;
      country.appendChild(flag);

      let info = document.createElement("div");
      info.className = "info";

      let name = document.createElement("h3");
      name.className = "name";
      let nameTxt = document.createTextNode(data[i].name);
      name.appendChild(nameTxt);
      info.appendChild(name);

      let population = document.createElement("p");
      population.className = "population";
      population.innerHTML = `Population: <span>${data[i].population
        .toString()
        .replace(/(\d)(?=(\d{3})+$)/g, "$1,")}</span>`;
      info.appendChild(population);

      let region = document.createElement("p");
      region.className = "region";
      region.innerHTML = `Region: <span>${data[i].region}</span>`;
      info.appendChild(region);

      let capital = document.createElement("p");
      capital.className = "capital";
      capital.innerHTML = `Capital: <span>${data[i].capital}</span>`;
      info.appendChild(capital);

      country.appendChild(info);

      countries.appendChild(country);
    }
    mainContainer.appendChild(countries);
  });

let searchInput = document.querySelector(".search input");

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    search();
  }
});
searchInput.addEventListener("blur", function () {
  if (this.value === "") {
    let countries = document.querySelectorAll(".countries .country");
    countries.forEach((country) => {
      country.classList.remove("hide");
    });
  }
});
document.querySelector(".search i").addEventListener("click", search);

function search() {
  if (searchInput.value !== "") {
    let countries = document.querySelectorAll(".countries .country");
    let hideNum = 0;
    countries.forEach((country) => {
      country.classList.remove("hide");
      if (
        country.children[1].children[0].innerHTML
          .toLowerCase()
          .indexOf(searchInput.value.toLowerCase()) === -1
      ) {
        country.classList.add("hide");
        hideNum++;
      }
    });
    if (hideNum == 250) {
      let message = document.createElement("p");
      message.classList = "message";
      message.innerHTML = "No Countries Found";
      mainContainer.appendChild(message);
    } else {
      document.querySelector(".message") === null
        ? ""
        : document.querySelector(".message").remove();
    }
  }
}

let regionsInput = document.querySelectorAll(".select-region input");

regionsInput.forEach((region) => {
  region.addEventListener("click", function () {
    let countries = document.querySelectorAll(".countries .country");
    countries.forEach((country) => {
      country.classList.remove("hide");
      if (
        country.children[1].children[2].textContent.indexOf(region.value) === -1
      ) {
        country.classList.add("hide");
      }
    });
  });
});
