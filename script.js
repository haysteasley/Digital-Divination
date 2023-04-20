let btn = document.querySelector('button')
let city; 

const api_key = "b483e68bb96404c1ad583fc8aae31909"

var choice = document.getElementById("city");
choice.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btn.click();
  }
});

btn.addEventListener('click', ()=> {
    let form = document.getElementById("form")
    city = form.elements[0].value
    getWeather(city); 

    async function getWeather(city) {
        let api_url = "https://api.openweathermap.org/data/2.5/weather?q=" +city+"&appid=" + api_key+"&units=imperial";
        
        // Making an API call (request)
        // and getting the response back
        const response = await fetch(api_url);
        
        // Parsing it to JSON format
        const data = await response.json();
        
        console.log(data)
        console.log(data.main.temp);
        let temp = data.main.temp

        let activities = [];
        if (temp <= 60) {
            activities = ["diy", "cooking", "education", "relaxation"];
        } else {
            activities = ["social", "recreational", "charity"];
        }

        let buttonsDiv = document.getElementById("buttons");
        buttonsDiv.innerHTML = "";
        activities.forEach(activity => {
            let button = document.createElement("button");
            button.innerText = activity.charAt(0).toUpperCase() + activity.slice(1);
            button.classList.add("activity-button");
            button.addEventListener("click", () => {
                fetch(`http://www.boredapi.com/api/activity?type=${activity}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("result").textContent = data.activity;
                })
                .catch(error => console.error(error));
            });
            buttonsDiv.appendChild(button);
        });

       
    }    
});
