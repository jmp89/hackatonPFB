import express from 'express';
import authAdmin from '../middlewares/authAdmin.js';
import authUser from '../middlewares/authUser.js';

import {
    listEventsController,
    eventDetailsController,
    validateEventParticipationController,
    eventRegistrationController,
    createEventAdminController,
    listEventThematicsController,
    eventUnlistController,
    technologyListController,
    listEventResultsController,
    insertEventResultsController,
    updateEventAdminController,
    checkRegistrationController,
} from '../controllers/entries/index.js';

const router = express.Router();

router
    .get('/event/search', listEventsController)
    .get('/event/details/:eventID', eventDetailsController)
    .post('/event/create', authUser, authAdmin, createEventAdminController)
    .get('/event/register/:eventID', authUser, eventRegistrationController)
    .delete('/event/unlist/:eventID', authUser, eventUnlistController)
    .get(
        '/event/confirm/:eventCode',
        authUser,
        validateEventParticipationController
    )
    .get('/event/thematics', listEventThematicsController)
    .get('/event/technologies', technologyListController)
    .get('/event/results', listEventResultsController)
    .post(
        '/event/insert-results/:eventID',
        authUser,
        authAdmin,
        insertEventResultsController
    )
    .put('/event/edit/:id', authUser, authAdmin, updateEventAdminController)
    .get(
        '/event/check-registration/:eventID',
        authUser,
        checkRegistrationController
    );

export default router;
