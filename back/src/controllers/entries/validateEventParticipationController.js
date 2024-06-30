import updateParticipationService from "../../services/entries/updateParticipationService.js";

const validateEventParticipationController = async (req, res, next) => {
  try {
    const { eventCode } = req.params;

    await updateParticipationService(eventCode);

    res.send({
      status: "ok",
      message: "Te has inscrito con éxito.",
    });
  } catch (error) {
    next(error);
  }
};

export default validateEventParticipationController;
