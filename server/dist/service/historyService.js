import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { v4 as uuidv4 } from 'uuid';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class City {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}
class HistoryService {
    // Reads data from the searchHistory.json file
    async read() {
        try {
            const data = await fs.readFile(path.join(__dirname, '../../db/searchHistory.json'), 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }
    // Writes the updated cities array to the searchHistory.json file
    async write(cities) {
        try {
            await fs.writeFile(path.join(__dirname, '../../db/searchHistory.json'), JSON.stringify(cities));
        }
        catch (error) {
            console.error(error);
        }
    }
    // Reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities() {
        const cities = await this.read();
        return cities.map((city) => new City(city.name, city.id));
    }
    // Writes a new city object to the searchHistory.json file
    async addCity(city) {
        const cities = await this.read();
        cities.push(new City(city, uuidv4())); // the second parameter is creating a unique id for each city
        await this.write(cities);
    }
    // Removes a city from the searchHistory.json file based on the city ID
    async removeCity(id) {
        const cities = await this.read();
        const newCities = cities.filter((city) => city.id !== id);
        await this.write(newCities);
    }
}
export default new HistoryService();
