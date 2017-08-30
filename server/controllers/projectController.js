import db from './../models';

const projectController = {};

projectController.post = (req, res) => {
  const {
    name,
    text,
    userId ,
    ideaId } = req.body;

  // Validation

  const project = new db.Project({
    name,
    text,
    _creator: userId,
    _idea: ideaId
  });

  project.save().then((newProject) => {
    db.Idea.findByIdAndUpdate(
      ideaId,
      { $push: { '_projects': newProject._id } }
    ).then((existingIdea) => {
      res.status(200).json({
        success: true,
        data: newProject,
        existingIdea
      });
    }).catch((err) => {
      res.status(500).json({
        message: err.toString()
      });
    });
  }).catch((err) => {
    res.status(500).json({
      message: err.toString()
    });
  });
}

export default projectController;
