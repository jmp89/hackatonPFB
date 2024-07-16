import {updateParticipationService} from "../../services/entries/index.js";

const validateEventParticipationController = async (req, res, next) => {
  try {
    const { eventCode } = req.params;

    await updateParticipationService(eventCode);

    let resData = {
      status: "ok",
      message: "Te has inscrito con éxito.",
    };

    let newToken = {};
    
    if (req.newAccessToken && req.newAccessToken.length > 1){
      newToken = {newAccessToken: req.newAccessToken};
      resData = {...resData, ...newToken};
    };
    
    res.send(resData);

  } catch (error) {
    next(error);
  }
};

export default validateEventParticipationController;
