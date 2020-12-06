import { Router } from '../deps.js'
import * as landing from './controllers/landingController.js'
import * as auth from './controllers/userController.js'
import * as behaviourReporting from './controllers/behaviourController.js'
import * as behaviourSummary from './controllers/summaryController.js'
import * as summaryApi from './apis/summaryApi.js'
import { oakCors } from '../deps.js'

const router = new Router();

router.get('/', landing.showLanding);

router.get('/auth/login', auth.showLogin);
router.get('/auth/register', auth.showRegister);
router.post('/auth/login', auth.verifyLogin);
router.post('/auth/register', auth.verifyRegister);
router.post('/auth/logout', auth.logout);

router.get('/behaviour/reporting', behaviourReporting.showReporting)
router.get('/behaviour/reporting/morning', behaviourReporting.showReporting)
router.get('/behaviour/reporting/evening', behaviourReporting.showReporting)
router.post('/behaviour/reporting/morning', behaviourReporting.verifyMorningReport)
router.post('/behaviour/reporting/evening', behaviourReporting.verifyEveningReport)

router.get('/behaviour/summary', behaviourSummary.showSummary)
router.get('/behaviour/summary/week', behaviourSummary.showSummary)
router.get('/behaviour/summary/month', behaviourSummary.showSummary)
router.post('/behaviour/summary', behaviourSummary.handleWeekMonth)

router.get('/api/summary', oakCors(), summaryApi.handle7Days);
router.get('/api/summary/:year/:month/:day', oakCors(), summaryApi.handle1Day);

export { router }