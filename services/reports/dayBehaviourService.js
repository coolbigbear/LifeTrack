import { executeQuery } from "../../database/database.js";

const getAverageMoodForDay = async (date) => {
    var res = await executeQuery("select avg(mood) from(SELECT mood FROM morning_report WHERE date=($1) UNION ALL SELECT mood from evening_report WHERE date=($1)) as mood", date)
    return res.rowsOfObjects()[0]
}

const getReportForDay = async (id, date, table) => {
    console.log(id)
    console.log(date)
    if (table === "morning_report") {
        return await executeQuery("SELECT * FROM morning_report WHERE user_id = ($1) AND date = ($2);", id, date);
    } else if (table === "evening_report") {
        return await executeQuery("SELECT * FROM evening_report WHERE user_id = ($1) AND date = ($2);", id, date);
    }
}

const getTodaysBehaviours = async (user) => {
    const todays_date = new Date().toISOString().slice(0, 10)
    const morning_report = await getReportForDay(user.id, todays_date, "morning_report")
    const evening_report = await getReportForDay(user.id, todays_date, "evening_report")

    const data = {
        morning_behaviour: null,
        evening_behaviour: null
    }

    if (morning_report && morning_report.rowCount > 0) {
        console.log("Morning behaviour found")
        data.morning_behaviour = morning_report.rowsOfObjects()[0]
    }

    if (evening_report && evening_report.rowCount > 0) {
        console.log("Evening behaviour found")
        data.evening_behaviour = evening_report.rowsOfObjects()[0]
    }

    return data;
}

const getAverageMoodForDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(mood) from (SELECT mood FROM morning_report WHERE date = ($1) UNION ALL SELECT mood from evening_report where date = ($1)) as mood", date)
    return res.rowsOfObjects()[0]
}

const getAverageSleepQualityForDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(sleep_quality) from morning_report where date = ($1)", date)
    return res.rowsOfObjects()[0]
}

const getAverageSleepDurationForDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(sleep_duration) from morning_report where date = ($1)", date)
    return res.rowsOfObjects()[0]
}

const getAverageSportsForDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(sport_exercise) from evening_report where date = ($1)", date)
    return res.rowsOfObjects()[0]
}

const getAverageStudyForDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(study) from evening_report where date = ($1)", date)
    return res.rowsOfObjects()[0]
}

const getAverageEatingQualityForDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(eating_quality) from evening_report where date = ($1)", date)
    return res.rowsOfObjects()[0]
}

export {
    getTodaysBehaviours,
    getAverageMoodForDay,
    getReportForDay,

    getAverageMoodForDayForAllUsers,
    getAverageSleepDurationForDayForAllUsers,
    getAverageSleepQualityForDayForAllUsers,
    getAverageSportsForDayForAllUsers,
    getAverageStudyForDayForAllUsers,
    getAverageEatingQualityForDayForAllUsers
}
