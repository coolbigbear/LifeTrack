import { validate } from '../../deps.js'
import { morningValidationRules, eveningValidationRules, morningErrorMessages, eveningErrorMessages} from '../controllers/validationController.js'
import { addMorningBehaviour, addEveningBehaviour } from '../../services/behaviourService.js'
import { getTodaysBehaviours } from '../../services/reports/dayBehaviourService.js'

var globalData = null;

const showReporting = async (context) => {
    context.render('./reporting/reporting.ejs', await getData(context));
    globalData = null;
};

const verifyMorningReport = async (context) => {
    var data = await getData(context);
    // console.log(data)
    const [passes, errors] = await validate(data, morningValidationRules, morningErrorMessages);
    if (!passes) {
        data.errors = { ...data.errors, ...errors };
        globalData = data;
        context.response.redirect('/behaviour/reporting');
    } else {
        const user = await context.session.get('user');
        data.user_id = user.id;
        
        await addMorningBehaviour(data);
        
        data = await getCleanData(context)
        const errorList = { morning_report: { reportAdded: "Report submitted" } }
        // console.log("This is data", data)
        
        data.success = { ...data.success, ...errorList };
        data.morningBehaviourSelected = "checked"
        data.eveningBehaviourSelected = "unchecked"
        globalData = data;
        // console.log("This is global data", globalData)
        context.response.redirect('/behaviour/reporting')
    }
};

const verifyEveningReport = async (context) => {

    var data = await getData(context);
    const [passes, errors] = await validate(data, eveningValidationRules, eveningErrorMessages);
    if (!passes) {
        data.errors = { ...data.errors, ...errors };
        data.morningBehaviourSelected = "unchecked"
        data.eveningBehaviourSelected = "checked"
        globalData = data;
        context.response.redirect('/behaviour/reporting')
    } else {
        const user = await context.session.get('user');
        data.user_id = user.id;

        await addEveningBehaviour(data);

        data = await getCleanData(context)
        const errorList = { evening_report: { reportAdded: "Report submitted" } }

        data.success = { ...data.success, ...errorList };
        data.morningBehaviourSelected = "unchecked"
        data.eveningBehaviourSelected = "checked"
        globalData = data;
        context.response.redirect('/behaviour/reporting')
    }
};

const checkIfTodaysReportsCompleted = async ({ session }) => {
    const user = await session.get('user');
    var res = await getTodaysBehaviours(user)
    const morning_report_completed_error = { reportCompleted: "Morning report submitted for today" }
    const evening_report_completed_error = { reportCompleted: "Evening report submitted for today" }
    var errorList = null
    if (res.morning_behaviour) {
        errorList = { morning_report_completed_error }
        if (res.evening_behaviour) {
            errorList = { morning_report_completed_error, evening_report_completed_error }
        }
    }
    else if (res.evening_behaviour) {
        errorList = { evening_report_completed_error }
        if (res.morning_behaviour) {
            errorList = { morning_report_completed_error, evening_report_completed_error }
        }
    }
    // console.log(errorList)
    return errorList;
}

const getCleanData = async (context) => {
    var data = {
        morningBehaviourSelected: "checked",
        eveningBehaviourSelected: "unchecked",
        errors: null,
        success: null,
        info: await checkIfTodaysReportsCompleted(context),
        warning: null,
        user: await context.session.get('user'),
        date: new Date().toJSON().slice(0, 10),
        sleepDuration: "",
        sleepQuality: 3,
        sport: "",
        study: "",
        eatingQuality: 3,
        mood: 3
    };
    return data
}

const getData = async (context) => {
    var data = await getCleanData(context)

    if (globalData) {
        // console.log("Using global data")
        data = globalData
    }
    if (context.request.method == "POST") {
        // console.log("Reading form data")
        const body = context.request.body();
        const params = await body.value;
        if (context.request.url.pathname.includes("morning")) {
            data.date = params.get("date");

            var sleepDuration = params.get("sleepDuration");
            if (sleepDuration == "") {
                data.sleepDuration = ""
            } else {
                data.sleepDuration = Number(sleepDuration) 
            }

            data.sleepQuality = Number(params.get("sleepQuality"));
            data.mood = Number(params.get("mood"));
        }
        else if (context.request.url.pathname.includes("evening")) {
            data.date = params.get("date");

            var sport = params.get("sport")
            if (sport == "") {
                data.sport = ""
            } else {
                data.sport = Number(sport)
            }

            var study = params.get("study")
            if (sport == "") {
                data.study = ""
            } else {
                data.study = Number(study)
            }
            
            data.eatingQuality = Number(params.get("eatingQuality"));
            data.mood = Number(params.get("mood"));
        }
    }
    // console.log(data)
    return data;
};

export { showReporting, verifyMorningReport, verifyEveningReport };