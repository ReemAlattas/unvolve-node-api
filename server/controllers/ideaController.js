import db from './../models';

const ideaController = {};

ideaController.post = (req, res) => {
  const {
    title,
    category,
    userId,
  } = req.body;

  // Validation

  const idea = new db.Idea({
    title,
    category,
    _creator: userId,
  });

  idea.save().then((newIdea) => {
    return res.status(200).json({
      success: true,
      data: newIdea
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err.toString()
    });
  });
};

ideaController.getAll = (req, res) => {
  db.Idea.find({}).populate({
    path: '_creator',
    select: 'username -_id'
  }).populate({
    path: '_comments',
    select: 'text createdAt _creator',
    match: { 'isDeleted': false}
  }).populate({
    path: '_pledges',
    select: 'amount createdAt _creator',
    match: { 'isDeleted': false}
  }).populate({
    path: '_projects',
    select: 'name text createdAt _creator',
    match: { 'isDeleted': false}
  }).then((ideas) => {
    return res.status(200).json({
      success: true,
      data: ideas
    });
  }).catch((err) => {
    return res.status(500).json({
      message: err.toString()
    });
  });
};

export default ideaController;
