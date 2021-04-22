"use strict";

function sendRequest(url) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.send();

    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            showFilm(xhr.response);
        }
    };
    xhr.onerror = function () {
        alert("Запрос не удался");
    };
}

let form = document.forms.form;
let input = form.elements.input;
let div = document.getElementById("div");

const apiURL = "http://www.omdbapi.com/?i=tt3896198&apikey=468edc0e";

form.addEventListener("submit", function (e) {
    e.preventDefault();
});
let timer = "";
input.addEventListener("keyup", function () {
    
    if (timer) clearTimeout(timer);
    let url = apiURL + "&t=" + input.value;
    timer = setTimeout(() => {
        sendRequest(url)
        clearTimeout(timer);
    }, 1000);
});

function showFilm(json) {
    let str = "";
    let obj = JSON.parse(json);
    for (let key in obj) {
        if (key != "Ratings") {
            str += `${key}: ${obj[key]}
                `;
            div.innerText = str;
        }
    }
}
