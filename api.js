
function call(ip) {
    // API endpoint
const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_YJrnlb0WWZwCZxgpzT8BjGT2Ry72q&ipAddress=${ip}`;

// Fetch data from the API
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data from API');
        }
        return response.json();
    })
    .then(data => {
        // Convert data to JSON string
        const jsonData = JSON.stringify(data, null, 2);

        // Write JSON data to a file
        fs.writeFile('data.json', jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return;
            }
            console.log('JSON file has been created successfully');
        });
    })
    .catch(error => {
        console.error('Error fetching data from API:', error);
    });
}
