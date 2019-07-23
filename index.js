const fs = require('fs');
const dotenv = require('dotenv');

const invalidRequiredError = new Error('Invalid required value');

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
        //console.log(`${configKey} - required: ${typeof validatorObj[configKey]['required']}`);
        //console.log(`${configKey} - validating required: ${validateRequired(validatorObj[configKey]['required'])}`);
        if (validateRequired(validatorObj[configKey]['required'])) {
            const type = validatorObj[configKey]['type'];

            if (type === 'boolean') {
                
            } else if (type === 'number') {
                try {
                    parseInt(config[configKey]);
                } catch (err) {
                    throw new Error(err);
                }
            } else if (type === 'string') {
                
            }
        }
    }

    //console.log(JSON.stringify(validatorObj, null, 2));

    // 1) check if required
    // 2) check type matches
    // 3) check defaultValue (optional)
    // 4) check allowedValues (optional)
}

start();

function validateType(type) {

}

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
                throw invalidRequiredError;
            }
        } else {
            throw invalidRequiredError;
        }
    } else if (typeof requiredValue === 'number') {
        if (requiredValue === 1) {
            return true;
        } else if (requiredValue === 0) {
            return false;
        } else {
            throw invalidRequiredError;
        }
    } else {
        throw invalidRequiredError;
    }
    //const acceptedValues = [true, false, 1, 0, 'yes', 'no'];
}