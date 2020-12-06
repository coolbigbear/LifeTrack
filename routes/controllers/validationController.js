import { required, minLength, isEmail, isDate, isNumeric, isInt, minNumber, maxNumber } from '../../deps.js'

const loginValidationRules = {
    Email: [required],
    Password: [required],
}

const registerValidationRules = {
    Email: [required, isEmail],
    Password: [required, minLength(4)],
}

const morningValidationRules = {
    date: [required, isDate],
    sleepDuration: [required, isNumeric, minNumber(0)],
    sleepQuality: [required, isInt, minNumber(1), maxNumber(5)],
    mood: [required, isInt, minNumber(1), maxNumber(5)]
}

const morningErrorMessages = {
    messages: {
        "date": "Date is required",
        "date.isDate": "Date must be of format DD/MM/YYYY",

        "sleepDuration.required": "Sleep duration is required",
        "sleepDuration.isNumeric": "Sleep duration must be a number (can include decimals)",
        "sleepDuration.minNumber": "Sleep duration must be a positive number",

        "sleepQuality.required": "Sleep quality is required",
        "sleepQuality.isInt": "Sleep quality must be a number with no decimals",
        "sleepQuality.minNumber": "Sleep quality must be higher or equal to 1",
        "sleepQuality.maxNumber": "Sleep quality must be lower or equal to 5",

        "mood.required": "Generic mood is required",
        "mood.isInt": "Generic mood must be a number with no decimals",
        "mood.minNumber": "Generic mood must be higher or equal to 1",
        "mood.maxNumber": "Generic mood must be lower or equal to 5"
    }
}

const eveningValidationRules = {
    date: [required, isDate],
    sport: [required, isNumeric, minNumber(0)],
    study: [required, isNumeric, minNumber(0)],
    mood: [required, isInt, minNumber(1), maxNumber(5)]
}

const eveningErrorMessages = {
    messages: {
        "date": "Date is required",
        "date.isDate": "Date must be of format DD/MM/YYYY",

        "sport.required": "Sports and exercise is required",
        "sport.isNumeric": "Sports and exercise must be a number (can include decimals)",
        "sport.minNumber": "Sports and exercise must be a positive number",

        "study.required": "Time spent studying is required",
        "study.isNumeric": "Time spent studying be a number with no decimals",
        "study.minNumber": "Time spent studying must be a positive number",

        "mood.required": "Mood is required",
        "mood.isInt": "Mood must be a number with no decimals",
        "mood.minNumber": "Mood must be higher or equal to 1",
        "mood.maxNumber": "Mood must be lower or equal to 5"
    }
}

export { loginValidationRules, registerValidationRules, morningErrorMessages, eveningErrorMessages, morningValidationRules, eveningValidationRules }