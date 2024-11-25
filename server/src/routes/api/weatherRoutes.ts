import { Router, type Request, type Response } from 'express';
const router = Router();

 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const cityName = req.body.cityName
    const weatherData = await WeatherService.getWeatherForCity(cityName);
  
  // TODO: save city to search history
  // await HistoryService.addCity(cityName);
  res.status(200).json(weatherData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error retrieving weather data'});
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    // const history = await HistoryService.getCities();
    // res.status(200).json(history);
    res.status(200).json([]);
  } catch (error) {
    console.error(error);
    res.status(500).json({msg: 'Error retrieving search history'});
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const cityId = parseInt(req.params.id);
    await HistoryService.removeCity(cityId);
    res.status(204).send();
  } catch (error) {
    console.error (error);
    res.status(500).json({msg: 'Error deleting city from search history'});
  }
});

export default router;
