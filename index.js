const fs = require('fs');
const dotenv = require('dotenv');

function start() {

    const config = dotenv.parse(fs.readFileSync('./.env'));
    const validator = fs.readFileSync('./validate.json');
    const validatorObj = JSON.parse(validator);
    const validKeys = Object.keys(validatorObj);
    const configKeys = Object.keys(config);

    for (configKey of configKeys) {
        
        if (!validKeys.includes(configKey)) {
            console.log(`${configKey} not included in .env file`)
        }
        //console.log(`${configKey} : ${Object.entries(validatorObj[configKey])}`);
        console.log(`${configKey} - required: ${typeof validatorObj[configKey]['required']}`);
        console.log(`${configKey} - validating required: ${validateRequired(validatorObj[configKey]['required'])}`);
    }

    //console.log(JSON.stringify(validatorObj, null, 2));
}

start();

function validateRequired(requiredValue) {

    if (typeof requiredValue === 'boolean') {
        return requiredValue;
    } else if( typeof requiredValue === 'string') {
        const lowered = requiredValue.toLowerCase();
        if (['yes', 'no'].includes(lowered)) {
            if (lowered === 'yes') {
                return true;
            } else if (lowered === 'no') {
                return false;
            } else {
                return console.log('Invalid required value');
            }
        } else {
            return console.log('Invalid required value');
        }
    } else if (typeof requiredValue === 'number') {
        if (requiredValue === 1) {
            return true;
        } else if (requiredValue === 0) {
            return false;
        } else {
            throw new Error('Invalid required value');
        }
    } else {
        console.log('This is not a valid required value')
    }
    //const acceptedValues = [true, false, 1, 0, 'yes', 'no'];
}