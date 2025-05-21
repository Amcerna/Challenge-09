import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/',  async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history

  console.log(req.body.cityName)

  const weatherData =  await WeatherService.getWeatherForCity(req.body.cityName)
  console.log(weatherData)

  res.json(weatherData)
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, res: Response) => {});

export default router;
//  http proxy error: /api/weather/history