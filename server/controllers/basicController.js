const basicController = {};

basicController.get = (req, res) => {
  res.json({
    message: 'Welcome!'
  });
};

export default basicController;
