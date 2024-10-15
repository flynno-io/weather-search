// TODO: Define a City class with name and id properties

class City {
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
  getName() {
    return this.name;
  }

  // Get the city ID
  getId() {
    return this.id;
  }

  // Get the city's longitude
  getLongitude() {
    return this.longitude;
  }

  // Get the city's latitude
  getLatitude() {
    return this.latitude;
  }

  // Get the city's coordinates
  getCoordinates() {
    return {longitude: this.longitude, latitude: this.latitude};
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
