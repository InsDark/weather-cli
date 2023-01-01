import { getCity, getCityName, pauseInterface, renderInterface } from "./helpers/interface.js";
import colors from 'colors'
import { getCityList, getCityWeather } from "./helpers/city.js";
const main = async () => {
    let opt = '';
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
                const city = await getCity(cities)
                const response = await getCityWeather(city)
                const {coord: {lon, lat}, weather : [{description}],  main : {temp_min, temp_max, temp}} = response
                console.log(`Lon: ${lon.toString().yellow}`)
                console.log(`Lat: ${lat.toString().yellow}`)
                console.log(`Temp: ${temp.toString().yellow}`)
                console.log(`Min: ${temp_min.toString().yellow}`)
                console.log(`Max: ${temp_max.toString().yellow}`)
                console.log(`Weather: ${description.green}`)
                await pauseInterface()
        }

    } while (opt !== '0')
}

main()

