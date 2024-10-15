import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST /weather -> get weather data using city name
router.post('/', async (req, res) => {
  // GET weather data using city name
  const city = req.body.cityName;
  const weatherData = await WeatherService.getWeatherForCity(city);
  res.json(weatherData);

  // Save city to search history
  await HistoryService.addCity(city);
});

// GET /weather -> get search history
router.get('/history', async (_, res) => {
  const cities = await HistoryService.getCities();
  res.json(cities);
});

// DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const id = req.params.id;
  await HistoryService.removeCity(id);
  res.sendStatus(204);
});

export default router;
