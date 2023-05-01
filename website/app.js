/* Global Variables */

//Base URL  and API key
const baseURL = "http://api.openweathermap.org/data/2.5/weather";

const apiKey = "3867b99b95d2ed8b2a89e709ce260b76&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// add event listener to add a function
let generate = document.getElementById("generate");

const performAction = () => {
  console.log("there is a click");

  let zipCode = document.getElementById("zip").value;
  let countryCode = document.getElementById("country").value;
  let content = document.getElementById("feelings").value;

  getReport(baseURL, zipCode, countryCode, apiKey).then(function (data) {
    postData("/add", {
      temp: data.main.temp,
      date: newDate,
      content: content,
    }).then(function (newData) {
      // update the browser
      updateUI();
    });
  });
};

generate.addEventListener("click", performAction);

// Update the UI
const updateUI = async () => {
  const request = await fetch("/all");

  try {
    const allData = await request.json();

    document.getElementById("date").innerHTML = `The date is: ${allData.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `The temperature is: ${Math.round(allData.temp)} degrees`;
    document.getElementById(
      "content"
    ).innerHTML = `Content is: ${allData.content}`;
  } catch (error) {
    console.log("error occured", error);
  }
};

/* GET API Data*/
const getReport = async (baseURL, zipCode, countryCode, apiKey) => {
  const res = await fetch(
    `${baseURL}?&appid=${apiKey}&zip=${zipCode},${countryCode}`
  );

  try {
    const userData = await res.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("error occured", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });

  try {
    const newData = await req.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};
