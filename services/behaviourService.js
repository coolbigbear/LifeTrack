import { executeQuery } from "../database/database.js";
import { getReportForDay } from './reports/dayBehaviourService.js'

const addMorningBehaviour = async (report) => {
    const res = await getReportForDay(report.user_id, report.date, "morning_report")
    // console.log(res)
    if (res && res.rowCount > 0) { // Already submitted today, need to update instead of insert new
        console.log("Morning report submitted updating")
        await updateMorningBehaviourForDay(report)
    } else {
        console.log("Gen new morining report")
        await insertMorningBehaviour(report)
    }
}

const insertMorningBehaviour = async(report) => {
    await executeQuery("INSERT INTO morning_report (date, sleep_duration, sleep_quality, mood,user_id) VALUES ($1, $2, $3, $4, $5);",
        report.date,
        report.sleepDuration,
        report.sleepQuality,
        report.mood,
        report.user_id
    );
}

const updateMorningBehaviourForDay = async(report) => {
    await executeQuery("UPDATE morning_report SET date=($1), sleep_duration=($2), sleep_quality=($3), mood=($4) WHERE user_id=($5) AND date=($1);",
        report.date,
        report.sleepDuration,
        report.sleepQuality,
        report.mood,
        report.user_id
    );
}

const addEveningBehaviour = async (report) => {
    const res = await getReportForDay(report.user_id, report.date, "evening_report")
    if (res && res.rowCount > 0) { // Already submitted today, need to update instead of insert new
        await updateEveningBehaviourForDay(report)
    } else {
        await insertEveningBehaviour(report)
    }
}

const insertEveningBehaviour = async (report) => {
    await executeQuery("INSERT INTO evening_report (date, sport_exercise, study, eating_quality, mood, user_id) VALUES ($1, $2, $3, $4, $5, $6);",
        report.date,
        report.sport,
        report.study,
        report.eatingQuality,
        report.mood,
        report.user_id
    );
}

const updateEveningBehaviourForDay = async (report) => {
    await executeQuery("UPDATE evening_report SET date=($1), sport_exercise=($2), study=($3), eating_quality=($4), mood=($5) WHERE user_id=($6) AND date=($1);",
        report.date,
        report.sport,
        report.study,
        report.eatingQuality,
        report.mood,
        report.user_id
    );
}

export {
    addMorningBehaviour,
    addEveningBehaviour
};