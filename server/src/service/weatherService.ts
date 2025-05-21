import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const data = await fetch(query);
    const parsedData = await data.json();
    return parsedData
  }

  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {
  //   return locationData
  // }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.API_KEY}`
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `https:/api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.API_KEY}`
  }

  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(query: string) {
        const data = await fetch(query);
      const parsedData = await data.json();
      return parsedData
  }

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {

    const geocodeQuery = this.buildGeocodeQuery(city)
    const geocodeData = await this.fetchLocationData(geocodeQuery)

    // console.log(geocodeData);

    const coordinates = {
      lat: geocodeData[0].lat,
      lon: geocodeData[0].lon,
    }

    const weatherQuery = this.buildWeatherQuery(coordinates)

    const weatherData = await this.fetchWeatherData(weatherQuery)


    console.log(weatherData);

    const forecastArray = weatherData.list.map((item: any) => {
      return {
        city: weatherData.city.name,
        date: item.dt_txt,
        icon: item.weather[0].icon,
        iconDescription: item.weather[0].description,
        tempF: Math.round((item.main.temp - 273.15) * 9/5 + 32),
        windSpeed: item.wind.speed,
        humidity: item.main.humidity,
      }
    })

    const filteredForecastArray = forecastArray.filter((item: any) => {
      return item.date.includes('15:00:00')
    })

    const firstData = filteredForecastArray[0];

    filteredForecastArray.unshift(firstData)

    return filteredForecastArray
  }
}

export default new WeatherService();
