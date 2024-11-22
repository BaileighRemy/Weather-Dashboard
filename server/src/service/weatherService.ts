import dotenv from 'dotenv';
import { access } from 'node:fs';
dotenv.config();
const APIkey = "78d43e7fc9c1241ef145484bffe2da19";
const apiURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";


// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
temperature: number;
humidity: number;
windSpeed: number;

  constructor(temperature: number, humidity: number, windSpeed: number) {
  this.temperature = temperature; 
  this.humidity = humidity;
  this.windSpeed = windSpeed;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  apiKey: string;

  constructor() {
    this.baseURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
    this.apiKey = process.env.OPENWEATHER_API_KEY || "78d43e7fc9c1241ef145484bffe2da19";
  }
  // TODO: Create fetchLocationData method
   private async fetchLocationData(query: string) {
    const response = await fetch(`${this.baseURL}/weather?q=${query}&appid=${this.apiKey}`);
    return response.json();
   }
  // TODO: Create destructureLocationData method
   private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.coord.lat,
      longitude: locationData.coord.lon 
    };
   }
  // TODO: Create buildGeocodeQuery method
   private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}/weather?q=${city}&appid=${this.apiKey}`;
   }
  // TODO: Create buildWeatherQuery method
   private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
   }
  // TODO: Create fetchAndDestructureLocationData method
   private async fetchAndDestructureLocationData(city: string) {
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
   }
  // TODO: Create fetchWeatherData method
   private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
        return response.json();
  }
  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.main.temp,
      response.main.humidity,
      response.wind.speed,
    );
     }
  // TODO: Complete buildForecastArray method
   private buildForecastArray(weatherData: any[]): Weather[] {
    return weatherData.map(item => new Weather(
      item.main.temp,
      item.main.humidity,
      item.wind.speed,
  ));
   }
  // TODO: Complete getWeatherForCity method
   async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
        const weatherData = await this.fetchWeatherData(coordinates);
        const currentWeather = this.parseCurrentWeather(weatherData);
        const forecastArray = this.buildForecastArray(weatherData.list);
        
        return {
            currentWeather,
            forecastArray
        };
    }
   }


export default new WeatherService();
