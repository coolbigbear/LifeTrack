import { getAverageMoodForDay } from '../../services/reports/dayBehaviourService.js'

const showLanding = async (context) => {
    context.render('index.ejs', await getData(context));
};

const getData = async (context) => {
    const data = {
        user: await context.session.get('user'),
        averageMood: await calculateAverages(),
        message: ""
    }
    data.message = await calculateMessage(data.averageMood);
    return data;
}

const calculateMessage = async (averageMood) => {
    if (averageMood.today > averageMood.yesterday) {
        return "Things are looking bright today :D"
    } else {
        return "Things are looking gloomy today :("
    }
}

const calculateAverages = async () => {
    var today = new Date()
    var yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    today = today.toJSON().slice(0, 10)
    yesterday = yesterday.toJSON().slice(0, 10)

    today = await getAverageMoodForDay(today)
    yesterday = await getAverageMoodForDay(yesterday)
    today = Number(today.avg).toFixed(2)
    yesterday = Number(yesterday.avg).toFixed(2)

    const data = {
        today: today,
        yesterday: yesterday
    }
    return data;
}

export{ showLanding }