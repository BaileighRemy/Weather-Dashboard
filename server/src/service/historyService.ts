import fs from 'fs/promises';
import path from 'path';
// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id =id;
  }
  }
// TODO: Complete the HistoryService class
class HistoryService {
  filePath: string;
  city: string;

  constructor() {
    this.filePath = path.join(__dirname, 'searchHistory.json');
  }
  // TODO: Define a read method that reads from the searchHistory.json file
   private async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading the search history file:', error);
      return [];
    }
   }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
   private async write(cities: City[]) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing to the search history file:', error);
    }
   }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
   async getCities() {
    const citiesData = await this.read();
    return citiesData.map(city => new City(city.name, city.id));
   }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
   async addCity(cityName: string) {
    const cities = await this.getCities();
    const newCity = new City(cityName, this.generateUniqueId());
    cities.push(newCity);
    await this.write(cities);
    return newCity;
   }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
   async removeCity(id: string) {
    let cities = await this.getCities();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
   }
   private generateUniqueId(): number {
    return Date.now();
   }
}

export default new HistoryService();