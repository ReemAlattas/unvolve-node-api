import db from './../models';

const pledgeController = {};

pledgeController.post = (req, res) => {
  const {
    amount,
    userId ,
    ideaId } = req.body;

  // Validation

  const pledge = new db.Pledge({
    amount,
    _creator: userId,
    _idea: ideaId
  });

  pledge.save().then((newPledge) => {
    db.Idea.findByIdAndUpdate(
      ideaId,
      { $push: { '_pledges': newPledge._id } }
    ).then((existingIdea) => {
      res.status(200).json({
        success: true,
        data: newPledge,
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

export default pledgeController;
