let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let update = 10000
let time = document.querySelector('#time')
let issMarker
let map = L.map('iss-map').setView([0,0],1)  //CENTER at 0,0 and max zoom out
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY2F0bWVycnltYXJ5IiwiYSI6ImNrMHk4cW5oaDAxamczbnQ5aG45ZXIyaWQifQ.NCnvhtPsLrzCNygUatdGaw'
}).addTo(map)

iss() //initial call to function
setInterval(iss, update) // call the iss function every update seconds
function iss() {
    fetch(url)
        .then(res => res.json())
        .then(issData => {
            console.log(issData)
            let lat = issData.latitude
            let long = issData.longitude
            issLat.innerHTML = lat
            issLong.innerHTML = long
            time.innerHTML = Date()
            if (!issMarker) {
                issMarker = L.marker([lat, long]).addTo(map)
            } else {
                issMarker.setLatLng([lat, long]) //already exists -move to new location
            }

        })
        .catch(err => {
            console.log(err)
        })
}