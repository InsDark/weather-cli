#!/usr/bin/env node
import { getCity, getCityName, pauseInterface, renderInterface } from "./helpers/interface.js";
import colors from 'colors'
import { getCityList, getCityWeather, renderCityWeather } from "./helpers/city.js";
import History from "./helpers/history.js";

const main = async () => {
    let opt = '';
    const history = new History();
    history.loadHistory();
    do {
        console.clear();
        console.log('========================='.green)
        console.log('    Select and option    ')
        console.log('========================='.green)

        const opt = await renderInterface()
        switch (opt) {
            case '1': 
                const name = await getCityName() 
                const cities = await getCityList(name)

                if(cities.length == 0) {
                    console.log(`No cities were found for ${name.red}`);
                    break;
                }
                const city = await getCity(cities)
                const [lon, lat, cityName] = city.split('&')
                const cityItem = {name: cityName, coor: `${lon}&${lat}`}
                history.saveHistory(cityItem)
                const response = await getCityWeather(city)
                
                renderCityWeather(response)
                
                break;

                case '2' : 
                    const cityHistory = await getCity(history.listHistory, true)
                    if(!cityHistory) {
                        console.log('The history list is empty'.red)
                        break 
                    }
                    const weather = await getCityWeather(cityHistory)
                    renderCityWeather(weather)
                break;
                case '3' : 
                history.clearHistory();
                console.log('The history was been cleared'.green)
                break;
            }
            
        await pauseInterface()

    } while (opt !== '0')
}

main()