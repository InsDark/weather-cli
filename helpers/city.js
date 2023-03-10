import axios from 'axios';
export const getCityList = async (name) => {
    const res = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${name}&apiKey=e51b50b144784889b4ecc960eb2d7463`)
    
    const { data : {features : cities} } = res
    
    return cities
}

export const getCityWeather = async (city) => {
    const [lon, lat] = city.split('&');
    const req = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=85320e5c776b0a5cbd9f42cd46482fee`);
    const {data} = req
    return data 
}

export const renderCityWeather = async (city) => {
    const {coord: {lon, lat}, weather : [{description}],  main : {temp_min, temp_max, temp}} = city

    console.log(`Lon: ${lon.toString().yellow}`)
    console.log(`Lat: ${lat.toString().yellow}`)
    console.log(`Temp: ${temp.toString().yellow}`)
    console.log(`Min: ${temp_min.toString().yellow}`)
    console.log(`Max: ${temp_max.toString().yellow}`)
    console.log(`Weather: ${description.green}`)
} 
