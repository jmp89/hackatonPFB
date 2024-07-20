import getTechnologiesService from "../../services/entries/getTechnologiesService.js";

const technologyListController = async (req, res) => {
  try {

    const technologies = await getTechnologiesService();

    res.json(technologies);

  } catch (error) {
    
    next(error);
  };
};

export default technologyListController;
