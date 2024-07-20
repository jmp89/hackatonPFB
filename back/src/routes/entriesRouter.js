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
} from '../controllers/entries/index.js';

const router = express.Router();

router
    .get('/event/search', listEventsController)
    .get('/event/details/:eventID', eventDetailsController)
    .post('/event/create', authUser, authAdmin, createEventAdminController)
    .post('/event/register', authUser, eventRegistrationController)
    .delete('/event/unlist', authUser, eventUnlistController)
    .get(
        '/event/confirm/:eventCode',
        authUser,
        validateEventParticipationController
    )
    .get('/event/thematics', listEventThematicsController)
    .get('/event/technologies', technologyListController)
    .get('/event/results', listEventResultsController)
    .post(
        '/event/insert-results',
        authUser,
        authAdmin,
        insertEventResultsController
    )
    .put('/event/edit/:id', authUser, authAdmin, updateEventAdminController);

export default router;
