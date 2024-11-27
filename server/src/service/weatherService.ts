import dotenv from 'dotenv';
dotenv.config();


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
    this.baseURL = process.env.API_BASE_URL || "";
    this.apiKey = process.env.API_KEY || ""; 
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin - 273.15) * (9 / 5) + 32;
  }
  // TODO: Create fetchLocationData method
   private async fetchLocationData(query: string) {
    console.log(`${this.baseURL}/data/2.5/weather?q=${query}&appid=${this.apiKey}`);
    const response = await fetch(`${this.baseURL}/data/2.5/weather?q=${query}&appid=${this.apiKey}`);
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
  //  private buildGeocodeQuery(city: string): string {
  //   return `${this.baseURL}/weather?q=${city}&appid=${this.apiKey}`;
  //  }
  // TODO: Create buildWeatherQuery method
   private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
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
    console.log(response)
    return new Weather(
      this.convertKelvinToFahrenheit(response.list[0].main.temp),
      response.list[0].main.humidity,
      response.list[0].wind.speed,
    );
     }
  // TODO: Complete buildForecastArray method
   private buildForecastArray(weatherData: any[]): Weather[] {
    const forecastMap: { [key: string]: Weather } = {};
    //return weatherData.map(item => new Weather(
      weatherData.forEach(item => {
        const date = new Date(item.dt * 1000).toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format

        if (!forecastMap[date] && Object.keys(forecastMap).length < 5) {
          forecastMap[date] = new Weather( 
      this.convertKelvinToFahrenheit(item.main.temp),
      item.main.humidity,
      item.wind.speed,
          );
        }
   });
    return Object.values(forecastMap);
   }
  // TODO: Complete getWeatherForCity method
   async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
        const weatherData = await this.fetchWeatherData(coordinates);
        const currentWeather = this.parseCurrentWeather(weatherData);
        const forecastArray = this.buildForecastArray(weatherData.list);
        
        // return {
        //     currentWeather,
        //     forecastArray
        // };
        return [
          currentWeather,
          ...forecastArray
        ]
    }
   }

   

export default new WeatherService();
