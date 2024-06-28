import randomstring from 'randomstring';
import insertUserService from '../../services/users/insertUserServices.js';

const registerUserController = async (req,res, next) => {
    try {
        
        const {username, email, password} = req.body;
        
        const registrationCode = randomstring.generate(15);
        
        await insertUserService(username, email, password, registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario registrado correctamente.'
        });

    } catch (error) {
        next(error);
    }
}

export default registerUserController;
