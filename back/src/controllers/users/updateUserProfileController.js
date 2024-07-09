import updateUserProfile from "../../services/users/updateUserProfile.js";

const updateUserProfileController = async (req, res) => {
    const userId = req.params.id;
    const { name, email, personal_info } = req.body;

    try {
        console.log(`Updating profile for user ${userId} with name: ${name}, email: ${email}, personal_info: ${personal_info}`);

        await updateUserProfile(userId, name, email, personal_info);
        res.status(200).send('Profile updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export default updateUserProfileController;
