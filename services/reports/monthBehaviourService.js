import { executeQuery } from "../../database/database.js";

const getAverageMoodForPastMonthFromDayForUser = async (start_date, end_date, id) => {
    var res = await executeQuery("select avg(mood) from (SELECT mood FROM morning_report WHERE TO_DATE(date, 'YYYY-MM-DD')> TO_DATE(($1), 'YYYY-MM-DD') AND TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($2), 'YYYY-MM-DD') AND user_id = ($3) UNION ALL SELECT mood from evening_report where TO_DATE(date, 'YYYY-MM-DD')> TO_DATE(($1), 'YYYY-MM-DD')  AND TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($2), 'YYYY-MM-DD') AND user_id =($3)) as mood", start_date, end_date, id)
    return res.rowsOfObjects()[0]
}

const getAverageSleepQualityForPastMonthFromDayForUser = async (start_date, end_date, id) => {
    var res = await executeQuery("select avg(sleep_quality) from morning_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') AND TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($2), 'YYYY-MM-DD') and user_id = ($3)", start_date, end_date, id)
    return res.rowsOfObjects()[0]
}

const getAverageSleepDurationForPastMonthFromDayForUser = async (start_date, end_date, id) => {
    var res = await executeQuery("select avg(sleep_duration) from morning_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') AND TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($2), 'YYYY-MM-DD') and user_id = ($3)", start_date, end_date, id)
    return res.rowsOfObjects()[0]
}

const getAverageSportsForPastMonthFromDayForUser = async (start_date, end_date, id) => {
    var res = await executeQuery("select avg(sport_exercise) from evening_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') AND TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($2), 'YYYY-MM-DD') and user_id = ($3)", start_date, end_date, id)
    return res.rowsOfObjects()[0]
}

const getAverageStudyForPastMonthFromDayForUser = async (start_date, end_date, id) => {
    var res = await executeQuery("select avg(study) from evening_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') AND TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($2), 'YYYY-MM-DD') and user_id = ($3)", start_date, end_date, id)
    return res.rowsOfObjects()[0]
}

const getAverageEatingQualityForPastMonthFromDayForUser = async (start_date, end_date, id) => {
    var res = await executeQuery("select avg(eating_quality) from evening_report where TO_DATE(date, 'YYYY-MM-DD') > TO_DATE(($1), 'YYYY-MM-DD') AND TO_DATE(date, 'YYYY-MM-DD') < TO_DATE(($2), 'YYYY-MM-DD') and user_id = ($3)", start_date, end_date, id)
    return res.rowsOfObjects()[0]
}

export {
    getAverageSleepQualityForPastMonthFromDayForUser,
    getAverageSleepDurationForPastMonthFromDayForUser,
    getAverageEatingQualityForPastMonthFromDayForUser,
    getAverageMoodForPastMonthFromDayForUser,
    getAverageSportsForPastMonthFromDayForUser,
    getAverageStudyForPastMonthFromDayForUser
};