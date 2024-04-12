document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    const apiKey = '85bdd6c9027abf750d54c45c9e951079'; // Substitua 'YOUR_API_KEY' pela sua chave de API
    const city = 'Fortaleza'; // Substitua 'London' pela cidade desejada

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível obter os dados do servidor.');
            }
            return response.json();
        })
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            const weatherInfo = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>${new Date(data.dt * 1000).toLocaleDateString()}</p>
                <p>Temperatura: ${Math.round(data.main.temp - 273.15)}°C</p>
                <p>Condição: ${data.weather[0].description}</p>
                <p>Umidade: ${data.main.humidity}%</p>
                <p>Velocidade do vento: ${data.wind.speed} m/s</p>
            `;
            weatherDiv.innerHTML = weatherInfo;
        })
        .catch(error => {
            console.error('Erro:', error);
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = '<p>Não foi possível obter os dados do tempo.</p>';
        });
}