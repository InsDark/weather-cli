import inquirer from 'inquirer';
export const renderInterface = async () => {
    const questions = {
        type: 'list',
        name: 'opt',
        message: 'Select an option: ',
        choices: [
            {
                value: '1',
                name: 'Search time by city'
            }, 
            {
                value: '2',
                name: 'History'
            },
            {
                value: '0',
                name: 'End'
            }
        ]
    }
    const {opt} = await inquirer.prompt(questions)
    return opt;
}
export const getCityName =  async () => {
    const question = {
        type: 'input',
        name: 'name',
        message: 'Type the city name: '
    }
    const {name} = await inquirer.prompt(question);
    return name
} 

export const getCity = async (cities) => {
    const citiesList = [];
    let i = 0;
    cities.forEach(city => {
        i++;

        const {properties: {formatted : name, lon, lat}} = city
        const cityObject = {
            value : `${lon}&${lat}`,
            name: `${i.toString().green}. ${name}`
        }
        citiesList.push(cityObject)
    })
    const question = {
        type: 'list',
        name: 'city',
        message: 'Choose a city to get weather: ',
        choices: citiesList
    }
    const {city} = await inquirer.prompt(question)
    return city
}

export const pauseInterface = async () => {
    const question = {
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.green} to continue`
    }

    console.log('\n')
    await inquirer.prompt(question)
}