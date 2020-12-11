import * as weekBehaviourService from "../../services/reports/weekBehaviourService.js";
import * as monthBehaviourService from "../../services/reports/monthBehaviourService.js";

const showSummary = async (context) => {
    
    context.render('./reporting/summary.ejs', await getData(context));
};

const handleWeekMonth = async (context) => {

    context.render('./reporting/summary.ejs', await getData(context));
};


const getData = async (context) => {

    const data = {
        user: await context.session.get('user'),
        week: null,
        month: null
    }
    var date = new Date()
    data.week = await getWeekAverages(date, data.user)
    
    var startOfMonth = getMonthNumber(date) + "-01"
    var endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];
    data.month = await getMonthAverages(startOfMonth, endOfMonth, data.user)

    if (context.request.method == "POST") {
        const body = context.request.body();
        const params = await body.value;

        var weekDate = params.get('week')
        weekDate = getDateOfISOWeek(weekDate.substring(0, 4), weekDate.substring(weekDate.length - 2))
        data.week = await getWeekAverages(weekDate, data.user)
        
        var monthDate = params.get('month')
        var startOfMonth = monthDate + "-01"
        var dateObjOfMonth = new Date(startOfMonth)
        var endOfMonth = new Date(dateObjOfMonth.getFullYear(), dateObjOfMonth.getMonth() + 1, 0).toISOString().split('T')[0];

        data.month = await getMonthAverages(startOfMonth, endOfMonth, data.user)

        // console.log(params.get('week'))
        // console.log(params.get('month'))
    }

    return data;
}

const getWeekAverages = async (date, user) => {
    const sleepQualityAverage = await weekBehaviourService.getAverageSleepQualityForPast7DaysFromDayForUser(date, user.id)
    const sleepDurationAverage = await weekBehaviourService.getAverageSleepDurationForPast7DaysFromDayForUser(date, user.id)
    const sportAverage = await weekBehaviourService.getAverageSportsForPast7DaysFromDayForUser(date, user.id)
    const studyingAverage = await weekBehaviourService.getAverageStudyForPast7DaysFromDayForUser(date, user.id)
    const moodAverage = await weekBehaviourService.getAverageMoodForPast7DaysFromDayForUser(date, user.id)

    const week = {
        choice: getWeekNumber(date),
        sleepDurationAverage: Number(sleepDurationAverage.avg).toFixed(2),
        sportAverage: Number(sportAverage.avg).toFixed(2),
        studyingAverage: Number(studyingAverage.avg).toFixed(2),
        sleepQualityAverage: Number(sleepQualityAverage.avg).toFixed(2),
        moodAverage: Number(moodAverage.avg).toFixed(2),
        noData: false
    }

    if (await checkIfAllZeros(week)) {
        week.noData = true;
    }
    // console.log(week)

    return week
}

const getMonthAverages = async (startOfMonth, endOfMonth, user) => {

    const sleepQualityAverage = await monthBehaviourService.getAverageSleepQualityForPastMonthFromDayForUser(startOfMonth, endOfMonth, user.id)
    const sleepDurationAverage = await monthBehaviourService.getAverageSleepDurationForPastMonthFromDayForUser(startOfMonth, endOfMonth, user.id)
    const sportAverage = await monthBehaviourService.getAverageSportsForPastMonthFromDayForUser(startOfMonth, endOfMonth, user.id)
    const studyingAverage = await monthBehaviourService.getAverageStudyForPastMonthFromDayForUser(startOfMonth, endOfMonth, user.id)
    const moodAverage = await monthBehaviourService.getAverageMoodForPastMonthFromDayForUser(startOfMonth, endOfMonth, user.id)

    const month = {
        choice: getMonthNumber(new Date(startOfMonth)),
        sleepDurationAverage: Number(sleepDurationAverage.avg).toFixed(2),
        sportAverage: Number(sportAverage.avg).toFixed(2),
        studyingAverage: Number(studyingAverage.avg).toFixed(2),
        sleepQualityAverage: Number(sleepQualityAverage.avg).toFixed(2),
        moodAverage: Number(moodAverage.avg).toFixed(2),
        noData: false
    }

    if (await checkIfAllZeros(month)) {
        month.noData = true;
    }
    // console.log(month)

    return month
}

const checkIfAllZeros = async (data) => {
    var result = true;

    if (data.sleepDurationAverage != "0.00") {
        result = false;
    }
    if (data.sportAverage != "0.00") {
        result = false;
    }
    if (data.studyingAverage != "0.00") {
        result = false;
    }
    if (data.sleepQualityAverage != "0.00") {
        result = false;
    }
    if (data.moodAverage != "0.00") {
        result = false;
    }
    // console.log(result)

    return result;
}

const getWeekNumber = (d) => {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    // return [d.getUTCFullYear(), weekNo];
    var year = d.getUTCFullYear()

    return `${year}-W${weekNo}`
}

const getMonthNumber = (d) => {
    var year = d.getFullYear()
    var monthNo = d.getMonth() + 1
    monthNo = ("0" + monthNo).slice(-2)
    return `${year}-${monthNo}`
}

const getDateOfISOWeek = (y, w) => {
    var simple = new Date(Date.UTC(y, 0, 1 + (w - 1) * 7));
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    
    var ISOweekEnd = new Date(ISOweekStart)
    ISOweekEnd.setDate(ISOweekEnd.getDate() + 6)
    
    return ISOweekEnd;
}

export { showSummary, handleWeekMonth, checkIfAllZeros };