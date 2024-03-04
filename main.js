let api_ipify,
    ipJson,
    map,
    ip;
const errorPTag = document.getElementById('error');



// function below wrote via chatGPT
function ipVaild(ip) {
    // Regular exression for validating IP address in the format "1.1.1.1"
    let ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

    // Check if the IP matches the pattern
    if (ipPattern.test(ip)) {
        // Split the IP into its components
        let parts = ip.split(".");

        // Check each part of the IP address
        for (let i = 0; i < parts.length; i++) {
            // Check if the part is a valid integer within the range 0-255
            if (!(parts[i] >= 0 && parts[i] <= 255)) {
                return false; // Invalid IP
            }
        }
        return true; // Valid IP
    } else {
        return false; // Invalid IP format
    }
}
// function below improved via chatGPT

function loadMap(latitude, longitude) {
    function getRandomColor() {
        // Generate a random hexadecimal color code
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        errorMsg(new Error('Invalid latitude or longitude. Please try again.'));
        return; // Halt further execution
    }

    if (typeof map === 'undefined') {
        // Initialize the map
        map = L.map("map").setView([latitude, longitude], 12);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 20
        }).addTo(map);
    } else {
        // Update map view
        map.setView([latitude, longitude], 12);
    }

    // Check if circle already exists, then remove it
    if (typeof circle !== 'undefined') {
        map.removeLayer(circle);
    }

    // Add the circle
    var circle = L.circle([latitude, longitude], {
        color: "#404040", // Dark gray border color
        fillColor: getRandomColor(), // Random fill color
        fillOpacity: 0.5,
        radius: 1200,
    }).addTo(map);

    // Hide the second leaflet-bottom
    document.getElementsByClassName('leaflet-bottom')[1].style.display = 'none';
}

loadMap(24.743541, 46.677014);
// above okey
function errorMsg(error) {
    errorPTag.style.color = 'red';
    errorPTag.style.visibility = 'visible';
    errorPTag.innerText = error.message;
}

function errorHide() {
    if (errorPTag.style.visibility !== 'hidden') {
        errorPTag.style.visibility = 'hidden';
    }
}
document.getElementById('event-btn').addEventListener('click', () => {
    ip = document.getElementById('ip-input').value;
    if (!ipVaild(ip)) {
        errorMsg(new Error('The IP Address Appears to be Incorrect'))
        return;
    }
    api_ipify = `https://geo.ipify.org/api/v2/country,city?apiKey=at_YJrnlb0WWZwCZxgpzT8BjGT2Ry72q&ipAddress=${ip}`;

    fetch(api_ipify)
        .then((response) => {
            if (!response.ok) {
                errorMsg(new Error("Network response was not ok, try again"))
            }
            return response.json()
        }).then((data) => {
            errorHide()

            document.getElementById('error').innerText = ''
            document.getElementById('result1').innerText = `${data.ip}`
            document.getElementById('result2').innerText = `${data.location.country}, ${data.location.region} ${data.location.postalCode}`
            document.getElementById('result3').innerText = `UTC ${data.location.timezone}`
            document.getElementById('result4').innerText = `${data.isp}`
            loadMap(data.location.lat, data.location.lng)
        })



});

    