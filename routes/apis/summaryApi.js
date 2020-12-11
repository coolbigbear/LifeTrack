import * as dayBehaviourService from "../../services/reports/dayBehaviourService.js";
import * as weekBehaviourService from "../../services/reports/weekBehaviourService.js";
import { checkIfAllZeros } from '../controllers/summaryController.js'

const handle7Days = async (context) => {
    var date = new Date()
    var today = date.toISOString().split('T')[0];
    // var today = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];
    context.response.body = await getAllDataForPast7DaysForAllUsers(today)
}
const handle1Day = async ({ response, params }) => {
    var date = new Date(`${params.year}-${params.month}-${params.day}`)
    // console.log(date)
    if (date == "Invalid Date") {
        response.status = 400
        response.body = { error: "Invalid Date"}
    } else {
        date = date.toISOString().split('T')[0]
        response.body = await getAllDataForDateForAllUsers(date)
    }
}

const getAllDataForPast7DaysForAllUsers = async (date) => {
    // console.log(date)
    const data = {
        sleepQualityAverage: await weekBehaviourService.getAverageSleepQualityForPast7DaysFromDayForAllUsers(date),
        sleepDurationAverage: await weekBehaviourService.getAverageSleepDurationForPast7DaysFromDayForAllUsers(date),
        sportAverage: await weekBehaviourService.getAverageSportsForPast7DaysFromDayForAllUsers(date),
        studyingAverage: await weekBehaviourService.getAverageStudyForPast7DaysFromDayForAllUsers(date),
        moodAverage: await weekBehaviourService.getAverageMoodForPast7DaysFromDayForAllUsers(date)
    }
    var summary = await summariseData(data);
    // console.log(summary)

    return summary
};

const getAllDataForDateForAllUsers = async (date) => {
    const data = {
        sleepQualityAverage: await dayBehaviourService.getAverageSleepQualityForDayForAllUsers(date),
        sleepDurationAverage: await dayBehaviourService.getAverageSleepDurationForDayForAllUsers(date),
        sportAverage: await dayBehaviourService.getAverageSportsForDayForAllUsers(date),
        studyingAverage: await dayBehaviourService.getAverageStudyForDayForAllUsers(date),
        moodAverage: await dayBehaviourService.getAverageMoodForDayForAllUsers(date)
    }

    var summary = await summariseData(data);
    // console.log(summary)

    return summary
};

const summariseData = async (summary) => {
    // console.log(summary)
    var data = {
        sleepDurationAverage: Number(summary.sleepDurationAverage.avg).toFixed(2),
        sportAverage: Number(summary.sportAverage.avg).toFixed(2),
        studyingAverage: Number(summary.studyingAverage.avg).toFixed(2),
        sleepQualityAverage: Number(summary.sleepQualityAverage.avg).toFixed(2),
        moodAverage: Number(summary.moodAverage.avg).toFixed(2),
    }

    if (await checkIfAllZeros(data)) {
        // console.log("No data")
        data = {
            summary: {
                message: "No data"
            }
        }
    } else {
        var localData = {
            summary: data
        }
        data = localData
    }

    return data;
}


export { handle7Days, handle1Day }