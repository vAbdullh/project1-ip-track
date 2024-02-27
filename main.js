let api_ipify, ipData, map;
window.onload = function () {
    map = L.map("map").setView([24.743541, 46.677014], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
    }).addTo(map);
    var circle = L.circle([24.743541, 46.677014], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 1000,
    }).addTo(map);
    document.getElementsByClassName('leaflet-bottom')[1].style.display = 'none'
}
document.getElementById("ip-start").addEventListener("click", function () {
    let ip = document.getElementById("ip-input").value;

    if (validateIP(ip)) {

        api_ipify = `https://geo.ipify.org/api/v2/country,city?apiKey=at_YJrnlb0WWZwCZxgpzT8BjGT2Ry72q&ipAddress=${ip}`;
        fetch(api_ipify)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                ipData = data;
            })
            .catch((error) => {
                console.error("There was a problem with your fetch operation:", error);
            });

        setTimeout(() => {
            document.getElementById('error').innerText = ''
            document.getElementById('result1').innerText = `${ipData.ip}`
            document.getElementById('result2').innerText = `${ipData.location.country}, ${ipData.location.region} ${ipData.location.postalCode}`
            document.getElementById('result3').innerText = `UTC ${ipData.location.timezone}`
            document.getElementById('result4').innerText = `${ipData.isp}`
            map = L.map("map").setView([ipData.location.lat, ipData.location.lng], 13);
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
            }).addTo(map);
            var circle = L.circle([ipData.location.lat, ipData.location.lng], {
                color: "red",
                fillColor: "#f03",
                fillOpacity: 0.5,
                radius: 500,
            }).addTo(map);
            document.getElementsByClassName('leaflet-bottom')[1].style.display = 'none'
        }, 1500);




    } else {
        document.getElementById('error').style.color = 'red'
        document.getElementById('error').innerText = 'The IP Address Appears to be Incorrect'
    }
});

// function below wrote via chatGPT
function validateIP(ip) {
    // Regular expression for validating IP address in the format "1.1.1.1"
    let ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

    // Check if the IP matches the pattern
    if (ipPattern.test(ip)) {
        // Split the IP into its components
        let parts = ip.split(".");

        // Check each part of the IP address
        for (let i = 0; i < parts.length; i++) {
            let part = parseInt(parts[i]);

            // Each part of the IP should be between 0 and 255
            if (part < 0 || part > 255) {
                return false; // Invalid IP
            }
        }
        return true; // Valid IP
    } else {
        return false; // Invalid IP format
    }
}
