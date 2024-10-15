import fs from 'node:fs/promises';

interface ICity {
  getName(): string;
  getId(): string;
  getLongitude(): number;
  getLatitude(): number;
  getCoordinates(): {longitude: number, latitude: number};
}

class City implements ICity{
  private name: string;
  private id: string;
  private longitude: number;
  private latitude: number;

  constructor (name: string, id: string, longitude: number, latitude: number) {
    this.name = name;
    this.id = id;
    this.longitude = longitude;
    this.latitude = latitude;
  }
  
  // Get the city name
  public getName() {
    return this.name;
  }

  // Get the city ID
  public getId() {
    return this.id;
  }

  // Get the city's longitude
  public getLongitude() {
    return this.longitude;
  }

  // Get the city's latitude
  public getLatitude() {
    return this.latitude;
  }

  // Get the city's coordinates in an object
  public getCoordinates() {
    return {longitude: this.longitude, latitude: this.latitude};
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // Reads data from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile('../../db/searchHistory.json', 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  // Writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile('../../db/searchHistory.json', JSON.stringify(cities));
    } catch (error) {
      console.error(error);
    }
  }

  // Reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    const cities = await this.read();
    return cities.map((city: any) => new City(city.name, city.id, city.longitude, city.latitude));
  }

  // Writes a new city object to the searchHistory.json file
  async addCity(city: City): Promise<void> { // TODO: update parameters to accept City object parameters
    const cities = await this.read();
    cities.push(city);
    await this.write(cities);
  }

  // Removes a city from the searchHistory.json file based on the city ID
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const newCities = cities.filter((city: City) => city.getId() !== id);
    await this.write(newCities);
  }
}

export default new HistoryService();
