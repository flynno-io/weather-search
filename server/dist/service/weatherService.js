import dotenv from "dotenv";
dotenv.config();
// Weather class for storing weather data
class Weather {
    constructor(city, icon, iconDescription, tempF, windSpeed, humidity, date) {
        this.city = city;
        this.icon = icon;
        this.iconDescription = iconDescription;
        this.tempF = tempF;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
        this.date = new Date(date);
    }
}
// WeatherService class for fetching, formatting, and sending on weather data
class WeatherService {
    constructor() {
        // The Weather and GEO base URLs, API key, and city name properties
        this.weatherBaseURL = process.env.WEATHER_API_BASE_URL || "";
        this.geocodeBaseURL = process.env.GEO_API_BASE_URL || "";
        this.apiKey = process.env.API_KEY || "";
        this.city = "";
    }
    // Fetch location data from Geocoding API
    async fetchLocationData(query) {
        try {
            const response = await fetch(`${this.geocodeBaseURL}?${query}`);
            return await response.json();
        }
        catch (error) {
            console.error(error);
            return {};
        }
    }
    // Destructure the longitude and latitude from the Geocoding API response
    destructureLocationData(locationData) {
        try {
            const { lat, lon } = locationData[0];
            return { latitude: lat, longitude: lon };
        }
        catch (error) {
            console.error(error);
            return { latitude: 0, longitude: 0 };
        }
    }
    // Creates query string for Geocoding API
    buildGeocodeQuery() {
        const urlEncodedCity = encodeURIComponent(this.city);
        return `q=${urlEncodedCity}&appid=${this.apiKey}`;
    }
    // Creates query string for Weather API
    buildWeatherQuery(coordinates) {
        return `lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&lang=en&appid=${this.apiKey}`;
    }
    // Fetch and destructure the longitude and latitude from the Geocoding API response
    async fetchAndDestructureLocationData() {
        try {
            const query = this.buildGeocodeQuery();
            const locationData = await this.fetchLocationData(query);
            return this.destructureLocationData(locationData);
        }
        catch (error) {
            console.error(error);
            return { latitude: 0, longitude: 0 };
        }
    }
    // Fetch weather data from the Weather API
    async fetchWeatherData(coordinates) {
        try {
            const query = this.buildWeatherQuery(coordinates);
            const response = await fetch(`${this.weatherBaseURL}?${query}`);
            return await response.json();
        }
        catch (error) {
            console.error(error);
            return {};
        }
    }
    // Parse the current weather data from the Weather API response
    parseCurrentWeather(response) {
        try {
            const { list } = response;
            return new Weather(this.city, list[0].weather[0].icon, list[0].weather[0].description, list[0].main.temp, list[0].wind.speed, list[0].main.humidity, list[0].dt_txt);
        }
        catch (error) {
            console.error(error);
            return new Weather("", "", "", 0, 0, 0, new Date().toString());
        }
    }
    // Build the forecast array from the Weather API response
    buildForecastArray(currentWeather, weatherData) {
        try {
            const forecastArray = [currentWeather];
            for (let i = 1; i < weatherData.length; i += 8) {
                const { weather, main, wind, dt_txt } = weatherData[i];
                forecastArray.push(new Weather(this.city, weather[0].icon, weather[0].description, main.temp, wind.speed, main.humidity, dt_txt));
            }
            return forecastArray;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }
    // Get the weather for a city
    async getWeatherForCity(city) {
        try {
            this.city = city;
            const coordinates = await this.fetchAndDestructureLocationData();
            const weatherData = await this.fetchWeatherData(coordinates);
            const currentWeather = this.parseCurrentWeather(weatherData);
            return this.buildForecastArray(currentWeather, weatherData.list);
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }
}
export default new WeatherService();
