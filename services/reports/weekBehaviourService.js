import { executeQuery } from "../../database/database.js";

// Getting averages for specific user

const getAverageMoodForPast7DaysFromDayForUser = async (date, id) => {
    var res = await executeQuery("select avg(mood) from (SELECT mood FROM morning_report WHERE TO_DATE(date, 'YYYY-MM-DD')> TO_DATE(($1), 'YYYY-MM-DD') - 7 AND TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD') AND user_id = ($2) UNION ALL SELECT mood from evening_report where TO_DATE(date, 'YYYY-MM-DD')> TO_DATE(($1), 'YYYY-MM-DD') - 7 AND TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD') AND user_id =($2)) as mood", date, id)
    return res.rowsOfObjects()[0]
}

const getAverageSleepQualityForPast7DaysFromDayForUser = async (date, id) => {
    var res = await executeQuery("select avg(sleep_quality) from morning_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') - 7 and TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD') and user_id = ($2)", date, id)
    return res.rowsOfObjects()[0]
}

const getAverageSleepDurationForPast7DaysFromDayForUser = async (date, id) => {
    var res = await executeQuery("select avg(sleep_duration) from morning_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') - 7 and TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD') and user_id = ($2)", date, id)
    return res.rowsOfObjects()[0]
}

const getAverageSportsForPast7DaysFromDayForUser = async (date, id) => {
    var res = await executeQuery("select avg(sport_exercise) from evening_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') - 7 and TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD') and user_id = ($2)", date, id)
    return res.rowsOfObjects()[0]
}

const getAverageStudyForPast7DaysFromDayForUser = async (date, id) => {
    var res = await executeQuery("select avg(study) from evening_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') - 7 and TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD') and user_id = ($2)", date, id)
    return res.rowsOfObjects()[0]
}

const getAverageEatingQualityForPast7DaysFromDayForUser = async (date, id) => {
    var res = await executeQuery("select avg(eating_quality) from evening_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') - 7 and TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD') and user_id = ($2)", date, id)
    return res.rowsOfObjects()[0]
}

// Getting averages for all users

const getAverageMoodForPast7DaysFromDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(mood) from (SELECT mood FROM morning_report WHERE TO_DATE(date, 'YYYY-MM-DD')> TO_DATE(($1), 'YYYY-MM-DD') - 7 AND TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD') UNION ALL SELECT mood from evening_report where TO_DATE(date, 'YYYY-MM-DD')> TO_DATE(($1), 'YYYY-MM-DD') - 7 AND TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD')) as mood", date)
    return res.rowsOfObjects()[0]
}

const getAverageSleepQualityForPast7DaysFromDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(sleep_quality) from morning_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') - 7 and TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD')", date)
    return res.rowsOfObjects()[0]
}

const getAverageSleepDurationForPast7DaysFromDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(sleep_duration) from morning_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') - 7 and TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD')", date)
    return res.rowsOfObjects()[0]
}

const getAverageSportsForPast7DaysFromDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(sport_exercise) from evening_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') - 7 and TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD')", date)
    return res.rowsOfObjects()[0]
}

const getAverageStudyForPast7DaysFromDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(study) from evening_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') - 7 and TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD')", date)
    return res.rowsOfObjects()[0]
}

const getAverageEatingQualityForPast7DaysFromDayForAllUsers = async (date) => {
    var res = await executeQuery("select avg(eating_quality) from evening_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') - 7 and TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($1), 'YYYY-MM-DD')", date)
    return res.rowsOfObjects()[0]
}

export {
    getAverageSleepQualityForPast7DaysFromDayForUser,
    getAverageSleepDurationForPast7DaysFromDayForUser,
    getAverageEatingQualityForPast7DaysFromDayForUser,
    getAverageMoodForPast7DaysFromDayForUser,
    getAverageSportsForPast7DaysFromDayForUser,
    getAverageStudyForPast7DaysFromDayForUser,

    getAverageMoodForPast7DaysFromDayForAllUsers,
    getAverageSleepDurationForPast7DaysFromDayForAllUsers,
    getAverageSleepQualityForPast7DaysFromDayForAllUsers,
    getAverageEatingQualityForPast7DaysFromDayForAllUsers,
    getAverageSportsForPast7DaysFromDayForAllUsers,
    getAverageStudyForPast7DaysFromDayForAllUsers
};