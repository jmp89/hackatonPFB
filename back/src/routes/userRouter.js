import express from 'express';

import {
    userRegisterController,
    validateUserController,
    loginUserController,
    editUserPasswordController,
    initiatePasswordRecoveryController,
    resetPasswordController,
    uploadFilesController,
    updateUserProfileController,
    rateUserEventController,
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
    .post('/upload', authUser, uploadFilesController)
    .put('/users/edit/:id', authUser, updateUserProfileController)
    .post('/users/rate-event', rateUserEventController);
export default router;
