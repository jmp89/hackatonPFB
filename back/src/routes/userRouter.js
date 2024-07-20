import express from 'express';

import {
    userRegisterController,
    validateUserController,
    loginUserController,
    editUserPasswordController,
    initiatePasswordRecoveryController,
    resetPasswordController,
    uploadUserAvatarController,
    updateUserProfileController,
    rateUserEventController,
    getMyEventsListController,
} from '../controllers/users/index.js';

import { authUser } from '../middlewares/index.js';

const router = express.Router();

router
    .post('/users/register', userRegisterController)
    .get('/users/validate/:registrationCode', validateUserController)
    .post('/users/login', loginUserController)
    .put('/users/edit-password', authUser, editUserPasswordController)
    .post('/users/initiate-password', initiatePasswordRecoveryController)
    .post('/users/reset-password', resetPasswordController)
    .post('/upload', authUser, uploadUserAvatarController)
    .put('/users/edit/:id', authUser, updateUserProfileController)
    .post('/users/rate-event', authUser, rateUserEventController)
    .get('/users/my-events', authUser, getMyEventsListController);
    
export default router;
