import db from './../models';

const commentController = {};

commentController.post = (req, res) => {
  const {
    text,
    userId ,
    ideaId } = req.body;

  // Validation

  const comment = new db.Comment({
    text,
    _creator: userId,
    _idea: ideaId
  });

  comment.save().then((newComment) => {
    db.Idea.findByIdAndUpdate(
      ideaId,
      { $push: { '_comments': newComment._id } }
    ).then((existingIdea) => {
      res.status(200).json({
        success: true,
        data: newComment,
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

export default commentController;
