import fs from 'node:fs/promises';

class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

class HistoryService {
  // Reads data from the searchHistory.json file
  private async read(): Promise<any[]> {
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
    return cities.map((city: any) => new City(city.name, city.id));
  }

  // Writes a new city object to the searchHistory.json file
  async addCity(city: string, id: string): Promise<void> { // TODO: update calls to this method to pass in ID as well
    const cities = await this.read();
    cities.push(new City(city, id));
    await this.write(cities);
  }

  // Removes a city from the searchHistory.json file based on the city ID
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const newCities = cities.filter((city: any) => city.id !== id);
    await this.write(newCities);
  }
}

export default new HistoryService();
