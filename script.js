let maindiv = document.querySelector("#main-div");
// fetching  restcountries API using function
const DisplayCountries=async ()=>{
    const data = await fetch("https://restcountries.com/v2/all");
    const countries =await data.json();
    return countries;
}

DisplayCountries()
.then(countries=>{
     for(let i=0;i<countries.length;i++){
        maindiv.innerHTML +=`
        <div class= "p-2 col-lg-4 col-sm-12" id="card">
            <div class="card mx-auto" style="width: 18rem;">
                <h5 class="card-title text-center">${countries[i].name}</h5>
                <div class="card-body text-center" id="cbody">
                <img class="card-img-top" src="${countries[i].flags.svg}" alt="Card image cap">
                <p class="card-text">Capital:${countries[i].capital}</p>
                <p class="card-text">Region:${countries[i].region}</p>
                <p class="card-text">Country Code:${countries[i].alpha3Code}</p>
                <p class="card-text">latlng:${countries[i].latlng}</p>
                <a href="#" class="btn btn-primary">Click for Weather</a>
                </div>
            </div>
        </div>
        `
    }
    return countries;
}).then(countries=>{
    //fetching data from openweathermap API
    let getweather = document.querySelectorAll("a");
    for(let i=0;i<getweather.length;i++){
        getweather[i].addEventListener('click',function (pick){
         pick.preventDefault();
         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${countries[i].latlng[0]}&lon=${countries[i].latlng[1]}&appid=48b1e0456576317c62901b6460437bf2`)
        .then(response=>{
            return response.json();
        }).then(countries=>{
            alert(`
                WEATHER : ${countries.weather[0].main};
                DESCRIPTION : ${countries.weather[0].description};
                Temperature : ${countries.main.temp};
                `)
            })
        })
    }
})

